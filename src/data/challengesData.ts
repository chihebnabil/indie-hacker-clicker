import type { Challenge, Achievement } from '../types/challenges';

export const initialChallenges: Challenge[] = [
  // Click Challenges
  { id: 'c1', name: 'First Steps', description: 'Click 100 times', icon: '🖱️', goal: 100, reward: 'Click Power', rewardValue: 5, completed: false, progress: 0, type: 'clicks' },
  { id: 'c2', name: 'Click Master', description: 'Click 1,000 times', icon: '⚡', goal: 1000, reward: 'Click Power', rewardValue: 10, completed: false, progress: 0, type: 'clicks' },
  { id: 'c3', name: 'Speed Demon', description: 'Click 10,000 times', icon: '💨', goal: 10000, reward: 'Click Power', rewardValue: 25, completed: false, progress: 0, type: 'clicks' },
  
  // Money Challenges
  { id: 'c4', name: 'Startup Capital', description: 'Earn $1,000 total', icon: '💵', goal: 1000, reward: 'Money Bonus', rewardValue: 500, completed: false, progress: 0, type: 'money' },
  { id: 'c5', name: 'Self Funded', description: 'Earn $100,000 total', icon: '💰', goal: 100000, reward: 'Money Bonus', rewardValue: 10000, completed: false, progress: 0, type: 'money' },
  { id: 'c6', name: 'Angel Investor', description: 'Earn $10,000,000 total', icon: '👼', goal: 10000000, reward: 'Money Bonus', rewardValue: 1000000, completed: false, progress: 0, type: 'money' },
  { id: 'c7', name: 'Unicorn Status', description: 'Earn $1,000,000,000 total', icon: '🦄', goal: 1000000000, reward: 'Money Bonus', rewardValue: 100000000, completed: false, progress: 0, type: 'money' },
  
  // Building Challenges
  { id: 'c8', name: 'Small Team', description: 'Own 10 buildings', icon: '🏢', goal: 10, reward: 'Production Bonus', rewardValue: 10, completed: false, progress: 0, type: 'buildings' },
  { id: 'c9', name: 'Growing Company', description: 'Own 50 buildings', icon: '🏙️', goal: 50, reward: 'Production Bonus', rewardValue: 25, completed: false, progress: 0, type: 'buildings' },
  { id: 'c10', name: 'Empire Builder', description: 'Own 200 buildings', icon: '🌆', goal: 200, reward: 'Production Bonus', rewardValue: 50, completed: false, progress: 0, type: 'buildings' },
  
  // Upgrade Challenges
  { id: 'c11', name: 'Tech Adoption', description: 'Purchase 5 upgrades', icon: '🔧', goal: 5, reward: 'Global Multiplier', rewardValue: 1.1, completed: false, progress: 0, type: 'upgrades' },
  { id: 'c12', name: 'Innovation Leader', description: 'Purchase 15 upgrades', icon: '🚀', goal: 15, reward: 'Global Multiplier', rewardValue: 1.25, completed: false, progress: 0, type: 'upgrades' },
  { id: 'c13', name: 'Optimization Guru', description: 'Purchase all upgrades', icon: '⚙️', goal: 22, reward: 'Global Multiplier', rewardValue: 2, completed: false, progress: 0, type: 'upgrades' },
  
  // MPS Challenges
  { id: 'c14', name: 'Passive Income', description: 'Reach $100/s', icon: '📈', goal: 100, reward: 'Production Bonus', rewardValue: 10, completed: false, progress: 0, type: 'mps' },
  { id: 'c15', name: 'Automated Empire', description: 'Reach $10,000/s', icon: '🤖', goal: 10000, reward: 'Production Bonus', rewardValue: 25, completed: false, progress: 0, type: 'mps' },
  { id: 'c16', name: 'Money Printer', description: 'Reach $1,000,000/s', icon: '🖨️', goal: 1000000, reward: 'Production Bonus', rewardValue: 50, completed: false, progress: 0, type: 'mps' },
];

export const initialAchievements: Achievement[] = [
  // Bronze Tier
  { id: 'a1', name: 'Hello World', description: 'Make your first click', icon: '👋', unlocked: false, tier: 'bronze' },
  { id: 'a2', name: 'Combo Starter', description: 'Reach a 10x combo multiplier', icon: '🔥', unlocked: false, tier: 'bronze' },
  { id: 'a3', name: 'First Hire', description: 'Purchase your first building', icon: '🎯', unlocked: false, tier: 'bronze' },
  { id: 'a4', name: 'Lucky Find', description: 'Click a golden cookie', icon: '🍀', unlocked: false, tier: 'bronze' },
  
  // Silver Tier
  { id: 'a5', name: 'Century Club', description: 'Click 100 times in one session', icon: '💯', unlocked: false, tier: 'silver' },
  { id: 'a6', name: 'Combo Master', description: 'Reach a 50-hit combo', icon: '⚡', unlocked: false, tier: 'silver' },
  { id: 'a7', name: 'Tech Stack', description: 'Own 10 upgrades', icon: '📚', unlocked: false, tier: 'silver' },
  { id: 'a8', name: 'Frenzy Master', description: 'Activate frenzy mode 5 times', icon: '🔥', unlocked: false, tier: 'silver' },
  
  // Gold Tier
  { id: 'a9', name: 'Millionaire', description: 'Have $1,000,000 at once', icon: '💎', unlocked: false, tier: 'gold' },
  { id: 'a10', name: 'Combo Legend', description: 'Reach a 100-hit combo', icon: '💥', unlocked: false, tier: 'gold' },
  { id: 'a11', name: 'Fully Upgraded', description: 'Purchase all available upgrades', icon: '✨', unlocked: false, tier: 'gold' },
  { id: 'a12', name: 'Production Line', description: 'Own 100 total buildings', icon: '🏭', unlocked: false, tier: 'gold' },
  
  // Platinum Tier
  { id: 'a13', name: 'Billionaire', description: 'Have $1,000,000,000 at once', icon: '👑', unlocked: false, tier: 'platinum' },
  { id: 'a14', name: 'Click Legend', description: 'Click 100,000 times total', icon: '🌟', unlocked: false, tier: 'platinum' },
  { id: 'a15', name: 'Empire Tycoon', description: 'Own 500 total buildings', icon: '🏰', unlocked: false, tier: 'platinum' },
  { id: 'a16', name: 'Automation King', description: 'Reach $10,000,000/s', icon: '👨‍💼', unlocked: false, tier: 'platinum' },
];

export const prestigeRequirement = 1000000000; // $1B to prestige
export const prestigeTokensPerReset = 1;
export const prestigeMultiplierPerToken = 0.1; // 10% boost per token