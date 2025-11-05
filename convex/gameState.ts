import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Save game state
export const saveGame = mutation({
  args: {
    userId: v.string(),
    username: v.string(),
    projectName: v.optional(v.string()),
    projectUrl: v.optional(v.string()),
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
        username: args.username,
        projectName: args.projectName,
        projectUrl: args.projectUrl,
        ...args.gameState,
        lastSaved: Date.now(),
      });
      return { success: true, updated: true };
    } else {
      // Create new save
      await ctx.db.insert("gameStates", {
        userId: args.userId,
        username: args.username,
        projectName: args.projectName,
        projectUrl: args.projectUrl,
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

// Get leaderboard - top players by total earned, level, and tokens
export const getLeaderboard = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 100;
    const allGames = await ctx.db.query("gameStates").collect();
    
    // Calculate score for each player considering multiple factors
    // Score = totalEarned2 + (prestigeLevel * 1M) + (prestigeTokens * 100K)
    // This ensures level and tokens are significant but earnings still matter
    const withScores = allGames.map(game => ({
      ...game,
      score: (game.totalEarned2 || 0) + 
             (game.prestigeLevel * 1000000) + 
             (game.prestigeTokens * 100000)
    }));
    
    // Sort by score descending and limit to top 100
    const sorted = withScores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
    
    return sorted.map((game, index) => ({
      rank: index + 1,
      username: game.username,
      projectName: game.projectName,
      projectUrl: game.projectUrl,
      totalEarned: game.totalEarned2,
      prestigeLevel: game.prestigeLevel,
      prestigeTokens: game.prestigeTokens,
      bestCombo: game.bestCombo,
      totalClicks: game.totalClicks,
      score: game.score, // Include score for reference
    }));
  },
});
