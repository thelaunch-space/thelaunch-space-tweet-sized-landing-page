import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    companyName: v.string(),
    websiteUrl: v.string(),
    email: v.string(),
    contentChallenge: v.optional(v.string()),
    whatsappNumber: v.optional(v.string()),
    whatsappCountryCode: v.optional(v.string()),
    whatsappConsent: v.boolean(),
    selectedDate: v.string(),
    selectedTimeIST: v.string(),
    isCustomTime: v.boolean(),
    googleEventId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("pitchBookings", {
      ...args,
      source: "pitch-page",
      createdAt: new Date().toISOString(),
      status: "new",
    });
    return id;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return await ctx.db
      .query("pitchBookings")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("pitchBookings"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    await ctx.db.patch(args.id, { status: args.status });
  },
});
