export interface Building {
  count: number;
  baseCost: number;
  baseProduction: number;
  name: string;
  icon: string;
  unlocked: boolean;
}

export interface Buildings {
  [key: string]: Building;
}

export interface Upgrade {
  owned: boolean;
  cost: number;
  name: string;
  icon: string;
  desc: string;
  type: 'click' | 'building' | 'global';
  req?: number;
  effect?: number;
  building?: string;
  multiplier?: number;
}

export interface Upgrades {
  [key: string]: Upgrade;
}

export interface GoldenCookie {
  x: number;
  y: number;
  type: 'bonus' | 'frenzy' | 'lucky';
}

export interface GameState {
  money: number;
  moneyPerSecond: number;
  clickPower: number;
  totalClicks: number;
  totalEarned: number;
  buildings: Buildings;
  upgrades: Upgrades;
  goldenCookie: GoldenCookie | null;
  notification: string | null;
  frenzyMode: boolean;
  frenzyTimer: number;
  frenzyCount: number;
  goldenCookieClicks: number;
}