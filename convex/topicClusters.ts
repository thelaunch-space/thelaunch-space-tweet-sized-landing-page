import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const ingest = internalMutation({
  args: {
    pillarName: v.string(),
    clusterTopic: v.string(),
    status: v.string(),
    blogUrl: v.optional(v.string()),
    targetKeyword: v.string(),
    intentType: v.string(),
    agentName: v.string(),
    createdAt: v.string(),
    updatedAt: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("topicClusters", args);
    return { id };
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    const clusters = await ctx.db
      .query("topicClusters")
      .order("desc")
      .take(limit);
    return clusters.map((c) => ({
      _id: c._id,
      _creationTime: c._creationTime,
      pillarName: c.pillarName,
      clusterTopic: c.clusterTopic,
      status: c.status,
      targetKeyword: c.targetKeyword,
      intentType: c.intentType,
    }));
  },
});

export const listByPillar = query({
  args: {},
  handler: async (ctx) => {
    const clusters = await ctx.db.query("topicClusters").collect();
    const grouped: Record<string, typeof clusters> = {};
    for (const c of clusters) {
      if (!grouped[c.pillarName]) {
        grouped[c.pillarName] = [];
      }
      grouped[c.pillarName].push(c);
    }
    return Object.entries(grouped).map(([pillarName, items]) => ({
      pillarName,
      clusters: items.map((c) => ({
        _id: c._id,
        _creationTime: c._creationTime,
        pillarName: c.pillarName,
        clusterTopic: c.clusterTopic,
        status: c.status,
        targetKeyword: c.targetKeyword,
        intentType: c.intentType,
      })),
    }));
  },
});

export const listFull = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const limit = args.limit ?? 50;
    return await ctx.db
      .query("topicClusters")
      .order("desc")
      .take(limit);
  },
});
