import { internalMutation } from "./_generated/server";

// Migration to fix bestCombo values that are unrealistically high
export const fixBestComboValues = internalMutation({
  handler: async (ctx) => {
    // Get all game states
    const allGames = await ctx.db.query("gameStates").collect();
    
    let updatedCount = 0;
    let scannedCount = 0;
    
    for (const game of allGames) {
      scannedCount++;

      // If bestCombo is greater than 1000, clamp it
      if (game.bestCombo > 1000) {
        await ctx.db.patch(game._id, {
          bestCombo: 1000,
        });
        updatedCount++;
        console.log(`Fixed bestCombo for user ${game.username}: ${game.bestCombo} → 1000`);
      }
    }
    
    return {
      success: true,
      scannedCount,
      updatedCount,
      message: `Scanned ${scannedCount} records, updated ${updatedCount} records with bestCombo > 1000`,
    };
  },
});
