import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Called by VPS proxy via HTTP endpoint /push/agent-message
export const insertFromAgent = internalMutation({
  args: {
    conversationId: v.id("agentConversations"),
    content: v.string(),
    isError: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();

    // Insert the assistant message
    await ctx.db.insert("agentMessages", {
      conversationId: args.conversationId,
      role: "assistant",
      content: args.content,
      createdAt: now,
    });

    // Update conversation meta
    const conversation = await ctx.db.get(args.conversationId);
    if (conversation) {
      await ctx.db.patch(args.conversationId, {
        lastMessageAt: now,
        messageCount: (conversation.messageCount ?? 0) + 1,
      });
    }
  },
});

export const addMessage = mutation({
  args: {
    conversationId: v.id("agentConversations"),
    role: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("agentMessages", {
      conversationId: args.conversationId,
      role: args.role,
      content: args.content,
      createdAt: now,
    });
  },
});

export const listMessages = query({
  args: {
    conversationId: v.id("agentConversations"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("agentMessages")
      .withIndex("by_conversationId_createdAt", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .order("asc")
      .collect();
  },
});

export const getLastNMessages = query({
  args: {
    conversationId: v.id("agentConversations"),
    n: v.number(),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db
      .query("agentMessages")
      .withIndex("by_conversationId_createdAt", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .order("asc")
      .collect();
    return all.slice(-args.n);
  },
});
