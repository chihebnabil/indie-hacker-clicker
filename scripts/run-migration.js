#!/usr/bin/env node

/**
 * Migration script to fix bestCombo values in the database
 * Run this with: node scripts/run-migration.js
 */

const { execSync } = require('child_process');

console.log('🚀 Starting bestCombo migration...\n');

try {
  // Run the migration using Convex CLI
  const result = execSync('npx convex run migrations:fixBestComboValues --prod', {
    encoding: 'utf-8',
    stdio: 'pipe',
  });
  
  console.log('✅ Migration completed successfully!\n');
  console.log(result);
} catch (error) {
  console.error('❌ Migration failed:', error.message);
  if (error.stdout) console.log(error.stdout);
  if (error.stderr) console.error(error.stderr);
  process.exit(1);
}
