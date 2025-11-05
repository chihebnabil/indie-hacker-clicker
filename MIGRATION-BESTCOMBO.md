# Database Migration: Fix bestCombo Values

## Problem
Some players have unrealistically high `bestCombo` values (e.g., 6008x) in the leaderboard, likely due to:
- Manual tampering with local storage
- Forged save data sent to the server
- Previous versions accepting any value without validation

## Solution
This migration scans all `gameStates` records and clamps any `bestCombo` value greater than 1000 down to 1000.

## Files
- `convex/migrations.ts` - Contains the migration function
- `scripts/run-migration.js` - Helper script to run the migration

## How to Run

### Option 1: Using the helper script
```bash
node scripts/run-migration.js
```

### Option 2: Using Convex CLI directly
```bash
# For production
npx convex run migrations:fixBestComboValues --prod

# For development
npx convex run migrations:fixBestComboValues
```

## What it does
1. Scans all records in the `gameStates` table
2. Identifies records where `bestCombo > 1000`
3. Patches those records to set `bestCombo = 1000`
4. Returns a summary of scanned and updated records

## Safety
- ✅ Read-only scan first (counts records)
- ✅ Only updates records that need fixing
- ✅ Non-destructive (just clamps values)
- ✅ Can be run multiple times safely (idempotent)

## Expected Output
```
✅ Migration completed successfully!

{
  success: true,
  scannedCount: 150,
  updatedCount: 3,
  message: "Scanned 150 records, updated 3 records with bestCombo > 1000"
}
```

## After Running
- Leaderboard will show corrected values (max 1000x combo)
- Future saves are protected by server-side validation
- Client-side also clamps loaded values to prevent display issues

## Prevention
The following safeguards are now in place:
- Server-side clamping in `convex/gameState.ts` (both insert and patch)
- Client-side clamping on load in `src/App.tsx`
- Anti-cheat validation for click patterns
- Earnings-per-click validation
