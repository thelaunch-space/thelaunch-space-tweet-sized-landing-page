import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";

// Upsert — dedup by clientSlug + projectSlug + title, used by Shakti via HTTP endpoint
export const upsert = internalMutation({
  args: {
    clientSlug: v.string(),
    projectSlug: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    taskType: v.string(),
    status: v.string(),
    priority: v.optional(v.number()),
    estimatedHours: v.optional(v.number()),
    actualHours: v.optional(v.number()),
    deadline: v.optional(v.string()),
    paceNotes: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("tasks")
      .withIndex("by_clientSlug", (q) => q.eq("clientSlug", args.clientSlug))
      .filter((q) =>
        q.and(
          q.eq(q.field("projectSlug"), args.projectSlug),
          q.eq(q.field("title"), args.title)
        )
      )
      .first();

    const now = new Date().toISOString();

    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: now });
      return { id: existing._id, action: "updated" as const };
    } else {
      const id = await ctx.db.insert("tasks", { ...args, updatedAt: now });
      return { id, action: "created" as const };
    }
  },
});

// Update status (and optional tracking fields) on a task by ID
export const updateStatus = internalMutation({
  args: {
    id: v.string(),
    status: v.string(),
    actualHours: v.optional(v.number()),
    paceNotes: v.optional(v.string()),
  },
  handler: async (ctx, { id, status, actualHours, paceNotes }) => {
    const now = new Date().toISOString();
    await ctx.db.patch(id as Id<"tasks">, {
      status,
      updatedAt: now,
      ...(actualHours !== undefined && { actualHours }),
      ...(paceNotes !== undefined && { paceNotes }),
    });
  },
});

// Internal mutation — for Shakti to update task details via HTTP endpoint
export const internalUpdate = internalMutation({
  args: {
    id: v.string(),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    paceNotes: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...patches }) => {
    const defined = Object.fromEntries(
      Object.entries(patches).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id as Id<"tasks">, { ...defined, updatedAt: new Date().toISOString() });
  },
});

// Internal mutation — for Shakti to delete a task via HTTP endpoint
export const internalRemove = internalMutation({
  args: { id: v.string() },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id as Id<"tasks">);
  },
});

// Public mutation — for Krishna to edit task details in the Kanban modal
export const update = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    paceNotes: v.optional(v.string()),
  },
  handler: async (ctx, { id, ...patches }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const defined = Object.fromEntries(
      Object.entries(patches).filter(([, v]) => v !== undefined)
    );
    await ctx.db.patch(id, { ...defined, updatedAt: new Date().toISOString() });
  },
});

// Delete a task by ID (public — for admin panel cleanup)
export const remove = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    await ctx.db.delete(id);
  },
});

// Public mutation — for Krishna's manual task creation in Kanban
export const create = mutation({
  args: {
    clientSlug: v.string(),
    projectSlug: v.string(),
    title: v.string(),
    description: v.optional(v.string()),
    taskType: v.string(),
    status: v.optional(v.string()),
    priority: v.optional(v.number()),
    estimatedHours: v.optional(v.number()),
    deadline: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const now = new Date().toISOString();
    const id = await ctx.db.insert("tasks", {
      ...args,
      status: args.status ?? "todo",
      createdBy: "Krishna",
      createdAt: now,
      updatedAt: now,
    });
    return { id };
  },
});

// Public query — done tasks for Task History view in WorkspacePanel
export const listDone = query({
  args: {
    clientSlug: v.optional(v.string()),
    projectSlug: v.optional(v.string()),
  },
  handler: async (ctx, { clientSlug, projectSlug }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    let results = await ctx.db
      .query("tasks")
      .withIndex("by_status", (q) => q.eq("status", "done"))
      .collect();
    if (clientSlug) results = results.filter((t) => t.clientSlug === clientSlug);
    if (projectSlug) results = results.filter((t) => t.projectSlug === projectSlug);
    return results.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },
});

// Returns tasks with optional filtering by status, clientSlug, projectSlug
export const getByFilters = internalQuery({
  args: {
    status: v.optional(v.string()),
    clientSlug: v.optional(v.string()),
    projectSlug: v.optional(v.string()),
  },
  handler: async (ctx, { status, clientSlug, projectSlug }) => {
    // Use most selective available index; filter remaining fields in memory
    let results;

    if (clientSlug) {
      results = await ctx.db
        .query("tasks")
        .withIndex("by_clientSlug", (q) => q.eq("clientSlug", clientSlug))
        .collect();
    } else if (status) {
      results = await ctx.db
        .query("tasks")
        .withIndex("by_status", (q) => q.eq("status", status))
        .collect();
    } else {
      results = await ctx.db.query("tasks").collect();
    }

    // Apply remaining in-memory filters
    if (projectSlug) results = results.filter((t) => t.projectSlug === projectSlug);
    if (status && clientSlug) results = results.filter((t) => t.status === status);

    return results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
});
