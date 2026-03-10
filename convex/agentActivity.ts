import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const ingest = internalMutation({
  args: {
    agentName: v.string(),
    action: v.string(),
    status: v.string(),
    message: v.string(),
    timestamp: v.string(),
    metadata: v.optional(v.any()),
    dedupKey: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // If agent provides a dedupKey, check for duplicates before inserting
    if (args.dedupKey) {
      const existing = await ctx.db
        .query("agentActivity")
        .withIndex("by_dedupKey", (q) => q.eq("dedupKey", args.dedupKey))
        .first();
      if (existing) {
        return { id: existing._id, deduplicated: true };
      }
    }

    const id = await ctx.db.insert("agentActivity", args);
    return { id, deduplicated: false };
  },
});

export const agentStatuses = query({
  args: {},
  handler: async (ctx) => {
    const agents = ["Parthasarathi", "Vibhishana", "Vyasa", "Vidura"];
    const statuses = [];
    for (const agentName of agents) {
      const latest = await ctx.db
        .query("agentActivity")
        .withIndex("by_agentName_timestamp", (q) => q.eq("agentName", agentName))
        .order("desc")
        .first();
      statuses.push({
        agentName,
        lastAction: latest?.action ?? null,
        lastStatus: latest?.status ?? "offline",
        lastMessage: latest?.message ?? null,
        lastTimestamp: latest?.timestamp ?? null,
      });
    }
    return statuses;
  },
});

export const recentFeed = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 30;
    return await ctx.db
      .query("agentActivity")
      .withIndex("by_timestamp")
      .order("desc")
      .take(limit);
  },
});

export const weeklyStats = query({
  args: {},
  handler: async (ctx) => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const questions = await ctx.db
      .query("questions")
      .withIndex("by_scannedAt", (q) => q.gte("scannedAt", sevenDaysAgo))
      .collect();
    const briefs = await ctx.db
      .query("briefs")
      .withIndex("by_createdAt", (q) => q.gte("createdAt", sevenDaysAgo))
      .collect();
    const blogs = await ctx.db
      .query("blogs")
      .withIndex("by_createdAt", (q) => q.gte("createdAt", sevenDaysAgo))
      .collect();
    const clusters = await ctx.db
      .query("topicClusters")
      .withIndex("by_createdAt", (q) => q.gte("createdAt", sevenDaysAgo))
      .collect();
    const tools = await ctx.db
      .query("toolOpportunities")
      .withIndex("by_createdAt", (q) => q.gte("createdAt", sevenDaysAgo))
      .collect();
    return {
      questions: questions.length,
      briefs: briefs.length,
      // Only count blogs that are actually live on the site
      blogs: blogs.filter((b) => b.status === "published").length,
      clusters: clusters.length,
      tools: tools.length,
    };
  },
});

// Full scan intentional — no Convex aggregation primitive for counts
export const allTimeStats = query({
  args: {},
  handler: async (ctx) => {
    const questions = await ctx.db.query("questions").collect();
    const briefs = await ctx.db.query("briefs").collect();
    const blogs = await ctx.db.query("blogs").collect();
    const clusters = await ctx.db.query("topicClusters").collect();
    const tools = await ctx.db.query("toolOpportunities").collect();
    return {
      questions: questions.length,
      briefs: briefs.length,
      // Only count blogs that are actually live on the site
      blogs: blogs.filter((b) => b.status === "published").length,
      clusters: clusters.length,
      tools: tools.length,
    };
  },
});

export const agentTodayActivity = query({
  args: { agentName: v.string() },
  handler: async (ctx, args) => {
    const todayStart = new Date().toISOString().slice(0, 10) + "T00:00:00.000Z";
    return await ctx.db
      .query("agentActivity")
      .withIndex("by_agentName_timestamp", (q) =>
        q.eq("agentName", args.agentName).gte("timestamp", todayStart)
      )
      .order("desc")
      .collect();
  },
});

export const agentWeeklySummary = query({
  args: { agentName: v.string() },
  handler: async (ctx, args) => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const weekActivities = await ctx.db
      .query("agentActivity")
      .withIndex("by_agentName_timestamp", (q) =>
        q.eq("agentName", args.agentName).gte("timestamp", sevenDaysAgo)
      )
      .order("desc")
      .collect();
    const byAction: Record<string, number> = {};
    for (const a of weekActivities) {
      byAction[a.action] = (byAction[a.action] ?? 0) + 1;
    }
    return { total: weekActivities.length, byAction };
  },
});

export const fullLog = query({
  args: { limit: v.optional(v.number()), agentName: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const limit = args.limit ?? 100;
    if (args.agentName) {
      return await ctx.db
        .query("agentActivity")
        .withIndex("by_agentName_timestamp", (q) => q.eq("agentName", args.agentName!))
        .order("desc")
        .take(limit);
    }
    return await ctx.db
      .query("agentActivity")
      .order("desc")
      .take(limit);
  },
});
