import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";
import { logActivityIfNew } from "./lib/activityHelper";

// List all documents — metadata only (no content field) for lightweight loading
export const listMetadata = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const docs = await ctx.db
      .query("documents")
      .withIndex("by_createdAt")
      .order("desc")
      .take(200);

    return docs.map((d) => ({
      _id: d._id,
      _creationTime: d._creationTime,
      title: d.title,
      slug: d.slug,
      summary: d.summary,
      category: d.category,
      tags: d.tags,
      agentName: d.agentName,
      filePath: d.filePath,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    }));
  },
});

// Get full document including content — admin only
export const getDocument = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.db.get(args.documentId);
  },
});

// Upsert — dedup by slug, used by agents via HTTP endpoint
export const upsert = internalMutation({
  args: {
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    summary: v.optional(v.string()),
    category: v.string(),
    tags: v.optional(v.array(v.string())),
    agentName: v.string(),
    filePath: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("documents")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...args,
        updatedAt: args.updatedAt || new Date().toISOString(),
      });
      return { id: existing._id, action: "updated" as const };
    } else {
      const id = await ctx.db.insert("documents", args);

      await logActivityIfNew(ctx, {
        agentName: args.agentName,
        action: "document_created",
        message: `Created document: '${args.title}'`,
        dedupKey: `document_created:${args.slug}`,
      });

      return { id, action: "inserted" as const };
    }
  },
});
