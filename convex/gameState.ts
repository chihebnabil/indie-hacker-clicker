import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save game state
export const saveGame = mutation({
  args: {
    userId: v.string(),
    gameState: v.object({
      money: v.number(),
      totalEarned: v.number(),
      totalEarned2: v.number(),
      clickPower: v.number(),
      totalClicks: v.number(),
      buildings: v.any(),
      upgrades: v.any(),
      challenges: v.array(v.any()),
      achievements: v.array(v.any()),
      prestigeLevel: v.number(),
      prestigeTokens: v.number(),
      frenzyCount: v.number(),
      goldenCookieClicks: v.number(),
      bestCombo: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    // Check if user already has a save
    const existing = await ctx.db
      .query("gameStates")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      // Update existing save
      await ctx.db.patch(existing._id, {
        ...args.gameState,
        lastSaved: Date.now(),
      });
      return { success: true, updated: true };
    } else {
      // Create new save
      await ctx.db.insert("gameStates", {
        userId: args.userId,
        ...args.gameState,
        lastSaved: Date.now(),
      });
      return { success: true, updated: false };
    }
  },
});

// Load game state
export const loadGame = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const gameState = await ctx.db
      .query("gameStates")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    return gameState;
  },
});

// Delete game state (for testing)
export const deleteGame = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("gameStates")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { success: true };
    }
    return { success: false };
  },
});
