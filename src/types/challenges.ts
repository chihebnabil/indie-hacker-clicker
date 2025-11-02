export interface Challenge {
  id: string;
  name: string;
  description: string;
  icon: string;
  goal: number;
  reward: string;
  rewardValue: number;
  completed: boolean;
  progress: number;
  type: 'clicks' | 'money' | 'buildings' | 'upgrades' | 'mps';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  reward?: string;
}

export interface Prestige {
  level: number;
  tokens: number;
  totalResets: number;
  multiplier: number;
}
