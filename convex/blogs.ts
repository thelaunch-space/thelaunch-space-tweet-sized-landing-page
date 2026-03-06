import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";
import { logActivityIfNew } from "./lib/activityHelper";

export const ingest = internalMutation({
  args: {
    title: v.string(),
    slug: v.string(),
    url: v.optional(v.string()),
    prUrl: v.optional(v.string()),
    keyword: v.string(),
    status: v.string(),
    agentName: v.string(),
    wordCount: v.number(),
    publishedAt: v.optional(v.string()),
    createdAt: v.string(),
    briefId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Dedup by slug — if blog with same slug exists, update it instead
    const existing = await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        title: args.title,
        url: args.url,
        prUrl: args.prUrl,
        keyword: args.keyword,
        status: args.status,
        wordCount: args.wordCount,
        publishedAt: args.publishedAt,
        briefId: args.briefId,
      });
      return { id: existing._id, action: "updated" as const };
    }

    const id = await ctx.db.insert("blogs", args);

    await logActivityIfNew(ctx, {
      agentName: args.agentName,
      action: "blog_published",
      message: `Published '${args.title}' to thelaunch.space/blog`,
      dedupKey: `blog_published:${args.slug}`,
    });

    return { id, action: "inserted" as const };
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
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!blog) throw new Error(`Blog not found with slug: ${args.slug}`);
    await ctx.db.patch(blog._id, {
      enrichmentCount: args.enrichmentCount,
      lastEnrichmentDate: args.lastEnrichmentDate,
      enrichmentLog: args.enrichmentLog,
    });

    await logActivityIfNew(ctx, {
      agentName: blog.agentName,
      action: "blog_enriched",
      message: `Enriched '${args.slug}' (enrichment #${args.enrichmentCount})`,
      dedupKey: `blog_enriched:${args.slug}:${args.enrichmentCount}`,
    });

    return { success: true };
  },
});

export const updateStatus = internalMutation({
  args: {
    slug: v.string(),
    status: v.string(),
    publishedAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!blog) throw new Error(`Blog not found with slug: ${args.slug}`);
    const patch: Record<string, string> = { status: args.status };
    if (args.publishedAt) patch.publishedAt = args.publishedAt;
    await ctx.db.patch(blog._id, patch);
    return { success: true, slug: args.slug, status: args.status };
  },
});

export const remove = internalMutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const blog = await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!blog) throw new Error(`Blog not found with slug: ${args.slug}`);
    await ctx.db.delete(blog._id);
    return { success: true, slug: args.slug };
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
