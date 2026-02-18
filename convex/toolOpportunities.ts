import { internalMutation, query } from "./_generated/server";
import { v } from "convex/values";

export const ingest = internalMutation({
  args: {
    sourceQuestion: v.string(),
    whyTool: v.string(),
    toolName: v.string(),
    toolSolution: v.string(),
    targetKeyword: v.string(),
    complexity: v.string(),
    status: v.string(),
    krishnaNotes: v.optional(v.string()),
    agentName: v.string(),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("toolOpportunities", args);
    return { id };
  },
});

export const listRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;
    const tools = await ctx.db
      .query("toolOpportunities")
      .order("desc")
      .take(limit);
    return tools.map((t) => ({
      _id: t._id,
      _creationTime: t._creationTime,
      toolName: t.toolName,
      targetKeyword: t.targetKeyword,
      status: t.status,
      complexity: t.complexity,
      sourceQuestion: t.sourceQuestion,
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
      .query("toolOpportunities")
      .order("desc")
      .take(limit);
  },
});
