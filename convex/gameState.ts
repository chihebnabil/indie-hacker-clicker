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
    // Sanitize and validate user inputs
    const sanitizedUsername = args.username.trim().slice(0, 50); // Limit length
    const sanitizedProjectName = args.projectName?.trim().slice(0, 100);
    const sanitizedProjectUrl = args.projectUrl?.trim().slice(0, 500);
    
    // Validate URL format if provided
    if (sanitizedProjectUrl && sanitizedProjectUrl.length > 0) {
      try {
        const url = new URL(sanitizedProjectUrl);
        // Only allow http/https protocols
        if (!['http:', 'https:'].includes(url.protocol)) {
          throw new Error('Invalid URL protocol');
        }
      } catch {
        throw new Error('Invalid project URL format');
      }
    }
    
    // Validate numeric values are within reasonable ranges
    if (args.gameState.money < 0 || args.gameState.money > Number.MAX_SAFE_INTEGER) {
      throw new Error('Invalid money value');
    }
    if (args.gameState.prestigeLevel < 0 || args.gameState.prestigeLevel > 10000) {
      throw new Error('Invalid prestige level');
    }
    if (args.gameState.prestigeTokens < 0 || args.gameState.prestigeTokens > 1000000) {
      throw new Error('Invalid prestige tokens');
    }
    
    // Check if user already has a save
    const existing = await ctx.db
      .query("gameStates")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();
    
    // Anti-cheat: Validate click count vs total earned ratio
    // A reasonable player can't have more than $100 per click on average at early stages
    if (args.gameState.totalClicks > 0) {
      const earningsPerClick = args.gameState.totalEarned2 / args.gameState.totalClicks;
      // Allow up to 10,000 per click (accounts for upgrades, combos, and prestige)
      const maxEarningsPerClick = 10000 * Math.max(1, args.gameState.prestigeLevel);
      if (earningsPerClick > maxEarningsPerClick) {
        throw new Error('Suspicious earnings pattern detected');
      }
    }
    
    // Anti-cheat: Validate click rate isn't impossibly high
    if (existing && args.gameState.totalClicks > (existing.totalClicks || 0)) {
      const timeDiff = (Date.now() - existing.lastSaved) / 1000 / 3600; // hours
      const clickDiff = args.gameState.totalClicks - (existing.totalClicks || 0);
      
      if (timeDiff > 0) {
        const clickRate = clickDiff / timeDiff;
        
        // If clicking faster than 50,000 clicks/hour sustained, likely auto-clicker
        if (clickRate > 50000) {
          throw new Error('Impossible click rate detected');
        }
      }
    }

    if (existing) {
      // Update existing save
      await ctx.db.patch(existing._id, {
        username: sanitizedUsername,
        projectName: sanitizedProjectName,
        projectUrl: sanitizedProjectUrl,
        ...args.gameState,
        lastSaved: Date.now(),
      });
      return { success: true, updated: true };
    } else {
      // Create new save
      await ctx.db.insert("gameStates", {
        userId: args.userId,
        username: sanitizedUsername,
        projectName: sanitizedProjectName,
        projectUrl: sanitizedProjectUrl,
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
    // Sanitize limit to prevent excessive data retrieval
    const limit = Math.min(Math.max(args.limit || 100, 1), 100);
    const allGames = await ctx.db.query("gameStates").collect();
    
    // Calculate score for each player considering multiple factors
    // Weighted scoring: Prestige Level > Tokens > Total Earned
    // This ensures progression (prestige) is most important
    const withScores = allGames.map(game => ({
      ...game,
      score: ((game.prestigeLevel || 0) * 10000000) +  // 10M per level (highest priority)
             ((game.prestigeTokens || 0) * 100000) +    // 100K per token (medium priority)
             ((game.totalEarned2 || 0) * 0.01)          // 1% of earnings (lowest priority, prevents overflow)
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
