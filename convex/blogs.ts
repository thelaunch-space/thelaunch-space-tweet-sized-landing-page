import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const ingest = internalMutation({
  args: {
    title: v.string(),
    slug: v.string(),
    url: v.optional(v.string()),
    keyword: v.string(),
    status: v.string(),
    agentName: v.string(),
    wordCount: v.number(),
    publishedAt: v.optional(v.string()),
    createdAt: v.string(),
    briefId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("blogs", args);
    return { id };
  },
});

export const updateEnrichment = internalMutation({
  args: {
    slug: v.string(),
    enrichmentCount: v.number(),
    lastEnrichmentDate: v.string(),
    enrichmentLog: v.string(),
  },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blogs")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
    if (!blog) throw new Error(`Blog not found with slug: ${args.slug}`);
    await ctx.db.patch(blog._id, {
      enrichmentCount: args.enrichmentCount,
      lastEnrichmentDate: args.lastEnrichmentDate,
      enrichmentLog: args.enrichmentLog,
    });
    return { success: true };
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    return await ctx.db
      .query("blogs")
      .order("desc")
      .take(limit);
  },
});
