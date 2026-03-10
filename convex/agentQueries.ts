// Internal queries used by HTTP GET routes — returns data for agent read endpoints
import { internalQuery } from "./_generated/server";
import { v } from "convex/values";

export const getBriefsByStatus = internalQuery({
  args: { status: v.string() },
  handler: async (ctx, { status }) => {
    const results = await ctx.db
      .query("briefs")
      .withIndex("by_status", (q) => q.eq("status", status))
      .collect();
    return results.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },
});

export const getAllTopicClusters = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("topicClusters")
      .withIndex("by_createdAt")
      .order("asc")
      .collect();
  },
});

export const getAllToolOpportunities = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("toolOpportunities")
      .withIndex("by_createdAt")
      .order("asc")
      .collect();
  },
});

export const getAllLinkedinPosts = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("linkedinPosts")
      .withIndex("by_createdAt")
      .order("asc")
      .collect();
  },
});

export const getAllClients = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("clients")
      .withIndex("by_status", (q) => q.eq("status", "active"))
      .collect();
  },
});

export const getAllProjects = internalQuery({
  args: { clientSlug: v.optional(v.string()) },
  handler: async (ctx, { clientSlug }) => {
    if (clientSlug) {
      return await ctx.db
        .query("projects")
        .withIndex("by_clientSlug", (q) => q.eq("clientSlug", clientSlug))
        .collect();
    }
    return await ctx.db.query("projects").collect();
  },
});

// ---------------------------------------------------------------------------
// SSOT migration queries — agent read endpoints replacing Google Sheets reads
// ---------------------------------------------------------------------------

export const getAllBlogs = internalQuery({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, { status }) => {
    let results;
    if (status) {
      results = await ctx.db
        .query("blogs")
        .withIndex("by_status", (q) => q.eq("status", status))
        .collect();
      return results.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else {
      return await ctx.db
        .query("blogs")
        .withIndex("by_createdAt")
        .order("asc")
        .collect();
    }
  },
});

export const getNextBlogForEnrichment = internalQuery({
  args: {},
  handler: async (ctx) => {
    const published = await ctx.db
      .query("blogs")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .collect();

    if (published.length === 0) return null;

    // Sort: never-enriched first, then oldest lastEnrichmentDate
    published.sort((a, b) => {
      const aDate = a.lastEnrichmentDate ?? "";
      const bDate = b.lastEnrichmentDate ?? "";
      if (!aDate && bDate) return -1;
      if (aDate && !bDate) return 1;
      return aDate.localeCompare(bDate);
    });

    return published[0];
  },
});

export const getQuestionsSummary = internalQuery({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("questions").collect();
    const byStatus: Record<string, number> = {};
    for (const q of all) {
      byStatus[q.status] = (byStatus[q.status] ?? 0) + 1;
    }
    return { total: all.length, byStatus };
  },
});

export const getBriefsSummary = internalQuery({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("briefs").collect();
    const byStatus: Record<string, number> = {};
    for (const b of all) {
      byStatus[b.status] = (byStatus[b.status] ?? 0) + 1;
    }
    return { total: all.length, byStatus };
  },
});

export const getLinkedinPostsByStatus = internalQuery({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, { status }) => {
    let results;
    if (status) {
      results = await ctx.db
        .query("linkedinPosts")
        .withIndex("by_status", (q) => q.eq("status", status))
        .collect();
    } else {
      results = await ctx.db.query("linkedinPosts").collect();
    }
    return results.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },
});

export const getRecentQuestions = internalQuery({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const cap = limit ?? 50;
    return await ctx.db
      .query("questions")
      .withIndex("by_scannedAt")
      .order("desc")
      .take(cap);
  },
});

export const getAllBriefs = internalQuery({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("briefs")
      .withIndex("by_createdAt")
      .order("asc")
      .collect();
  },
});

export const getTasksByFilters = internalQuery({
  args: {
    status: v.optional(v.string()),
    clientSlug: v.optional(v.string()),
    projectSlug: v.optional(v.string()),
  },
  handler: async (ctx, { status, clientSlug, projectSlug }) => {
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

    if (projectSlug) results = results.filter((t) => t.projectSlug === projectSlug);
    if (status && clientSlug) results = results.filter((t) => t.status === status);

    return results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
});
