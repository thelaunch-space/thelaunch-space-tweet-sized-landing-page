import { internalMutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { logActivityIfNew } from "./lib/activityHelper";

const questionValidator = v.object({
  // Core identification
  title: v.string(),
  subreddit: v.string(),
  url: v.string(),
  // Scanner analysis
  questionPain: v.string(),
  icpRelevance: v.string(),
  launchSpaceAngle: v.string(),
  contentPotential: v.string(),
  engagement: v.string(),
  notes: v.optional(v.string()),
  // Dates
  postDate: v.optional(v.string()),
  scannedAt: v.string(),
  // Status
  status: v.string(),
  briefCreated: v.optional(v.boolean()),
  // Agent metadata
  agentName: v.string(),
  batchId: v.optional(v.string()),
});

export const ingestBatch = internalMutation({
  args: {
    questions: v.array(questionValidator),
  },
  handler: async (ctx, args) => {
    let inserted = 0;
    let updated = 0;
    for (const q of args.questions) {
      const existing = await ctx.db
        .query("questions")
        .withIndex("by_url", (idx) => idx.eq("url", q.url))
        .first();
      if (existing) {
        await ctx.db.patch(existing._id, {
          scannedAt: q.scannedAt,
          engagement: q.engagement,
          icpRelevance: q.icpRelevance,
          contentPotential: q.contentPotential,
          notes: q.notes,
        });
        updated++;
      } else {
        await ctx.db.insert("questions", q);
        inserted++;
      }
    }

    // Log scan activity
    if (inserted > 0 || updated > 0) {
      const subreddits = [...new Set(args.questions.map((q) => q.subreddit))];
      const subredditList = subreddits.join(", ");
      const dateKey = new Date().toISOString().slice(0, 10);
      await logActivityIfNew(ctx, {
        agentName: args.questions[0].agentName,
        action: "scan_complete",
        message: `Scanned ${subredditList} and found ${inserted} new questions`,
        dedupKey: `scan_complete:${dateKey}:${subreddits.sort().join(",")}`,
        metadata: { subreddits, inserted, updated },
      });
    }

    return { inserted, updated };
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    return await ctx.db
      .query("questions")
      .withIndex("by_scannedAt")
      .order("desc")
      .take(limit);
  },
});

export const communityBreakdown = query({
  args: {},
  handler: async (ctx) => {
    const questions = await ctx.db.query("questions").take(5000);
    const grouped: Record<string, { count: number; latestScannedAt: string }> = {};
    for (const q of questions) {
      if (!grouped[q.subreddit]) {
        grouped[q.subreddit] = { count: 0, latestScannedAt: q.scannedAt };
      }
      grouped[q.subreddit].count++;
      if (q.scannedAt > grouped[q.subreddit].latestScannedAt) {
        grouped[q.subreddit].latestScannedAt = q.scannedAt;
      }
    }
    return Object.entries(grouped).map(([subreddit, data]) => ({
      subreddit,
      ...data,
    }));
  },
});

export const listFullDetails = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const limit = args.limit ?? 50;
    return await ctx.db
      .query("questions")
      .withIndex("by_scannedAt")
      .order("desc")
      .take(limit);
  },
});

export const listFullDetailsPaginated = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.db
      .query("questions")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});
