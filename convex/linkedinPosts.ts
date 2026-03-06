import { internalMutation, internalQuery, query } from "./_generated/server";
import { v } from "convex/values";

// Upsert a LinkedIn post-brief or draft (called from HTTP push route)
export const upsert = internalMutation({
  args: {
    insightName: v.string(),
    sourceBlogSlug: v.string(),
    sourceBlogTitle: v.optional(v.string()),
    insightNumber: v.number(),
    // Phase 1 — post-brief fields
    insightText: v.optional(v.string()),
    rationale: v.optional(v.string()),
    hookOptions: v.optional(v.array(v.string())),
    ctaOptions: v.optional(v.array(v.string())),
    // Phase 2 — draft fields
    draftText: v.optional(v.string()),
    krishnaFeedback: v.optional(v.string()),
    postedDate: v.optional(v.string()),
    linkedinUrl: v.optional(v.string()),
    // Performance metrics
    impressions: v.optional(v.number()),
    comments: v.optional(v.number()),
    likes: v.optional(v.number()),
    goLiveDate: v.optional(v.string()),
    goLiveTime: v.optional(v.string()),
    status: v.string(),
    agentName: v.string(),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();

    // Dedup: look up by sourceBlogSlug, then filter by insightName
    const existing = await ctx.db
      .query("linkedinPosts")
      .withIndex("by_sourceBlogSlug", (q) => q.eq("sourceBlogSlug", args.sourceBlogSlug))
      .filter((q) => q.eq(q.field("insightName"), args.insightName))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        status: args.status,
        updatedAt: now,
        ...(args.sourceBlogTitle !== undefined && { sourceBlogTitle: args.sourceBlogTitle }),
        ...(args.insightText !== undefined && { insightText: args.insightText }),
        ...(args.rationale !== undefined && { rationale: args.rationale }),
        ...(args.hookOptions !== undefined && { hookOptions: args.hookOptions }),
        ...(args.ctaOptions !== undefined && { ctaOptions: args.ctaOptions }),
        ...(args.draftText !== undefined && { draftText: args.draftText }),
        ...(args.krishnaFeedback !== undefined && { krishnaFeedback: args.krishnaFeedback }),
        ...(args.postedDate !== undefined && { postedDate: args.postedDate }),
        ...(args.linkedinUrl !== undefined && { linkedinUrl: args.linkedinUrl }),
        ...(args.impressions !== undefined && { impressions: args.impressions }),
        ...(args.comments !== undefined && { comments: args.comments }),
        ...(args.likes !== undefined && { likes: args.likes }),
        ...(args.goLiveDate !== undefined && { goLiveDate: args.goLiveDate }),
        ...(args.goLiveTime !== undefined && { goLiveTime: args.goLiveTime }),
      });
      return { action: "updated", id: existing._id };
    } else {
      const id = await ctx.db.insert("linkedinPosts", { ...args, updatedAt: now });
      return { action: "inserted", id };
    }
  },
});

// Update the status of a LinkedIn post (called from HTTP update route)
export const updateStatus = internalMutation({
  args: {
    insightName: v.string(),
    sourceBlogSlug: v.string(),
    newStatus: v.string(),
    krishnaFeedback: v.optional(v.string()),
  },
  handler: async (ctx, { insightName, sourceBlogSlug, newStatus, krishnaFeedback }) => {
    const post = await ctx.db
      .query("linkedinPosts")
      .withIndex("by_sourceBlogSlug", (q) => q.eq("sourceBlogSlug", sourceBlogSlug))
      .filter((q) => q.eq(q.field("insightName"), insightName))
      .first();

    if (!post) {
      throw new Error(`LinkedIn post not found: ${insightName}`);
    }

    const patch: Record<string, unknown> = {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    if (krishnaFeedback !== undefined) {
      patch.krishnaFeedback = krishnaFeedback;
    }

    await ctx.db.patch(post._id, patch);
    return { success: true, id: post._id };
  },
});

// Internal query — returns all posts for agent dedup checks
export const queryAll = internalQuery({
  args: {},
  handler: async (ctx) => {
    const results = await ctx.db.query("linkedinPosts").collect();
    return results.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  },
});

// Public auth-gated query — returns all posts for the LinkedIn posts table
export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const results = await ctx.db.query("linkedinPosts").collect();
    return results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },
});
