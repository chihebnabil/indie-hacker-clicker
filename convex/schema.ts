import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  gameStates: defineTable({
    userId: v.string(),
    username: v.string(),
    money: v.number(),
    totalEarned: v.number(),
    totalEarned2: v.number(),
    clickPower: v.number(),
    totalClicks: v.number(),
    buildings: v.any(), // Complex nested object with dynamic building keys
    upgrades: v.any(), // Complex nested object with many properties
    challenges: v.array(v.object({
      id: v.string(),
      name: v.string(),
      description: v.string(),
      icon: v.string(),
      goal: v.number(),
      reward: v.string(),
      rewardValue: v.number(),
      completed: v.boolean(),
      progress: v.number(),
      type: v.string(),
    })),
    achievements: v.array(v.object({
      id: v.string(),
      name: v.string(),
      description: v.string(),
      icon: v.string(),
      unlocked: v.boolean(),
      tier: v.string(),
    })),
    prestigeLevel: v.number(),
    prestigeTokens: v.number(),
    frenzyCount: v.number(),
    goldenCookieClicks: v.number(),
    bestCombo: v.number(),
    lastSaved: v.number(),
  }).index("by_userId", ["userId"]),
});
