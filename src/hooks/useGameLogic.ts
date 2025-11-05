import { useState, useEffect, useRef } from 'react';
import type { Buildings, Upgrades, GoldenCookie } from '../types/game';
import { initialBuildings, initialUpgrades, unlockThresholds } from '../data/gameData';

interface UseGameLogicParams {
  prestigeMultiplier?: number;
}

interface UseGameLogicReturn {
  money: number;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
  moneyPerSecond: number;
  clickPower: number;
  setClickPower: React.Dispatch<React.SetStateAction<number>>;
  totalClicks: number;
  setTotalClicks: React.Dispatch<React.SetStateAction<number>>;
  totalEarned: number;
  setTotalEarned: React.Dispatch<React.SetStateAction<number>>;
  buildings: Buildings;
  setBuildings: React.Dispatch<React.SetStateAction<Buildings>>;
  upgrades: Upgrades;
  setUpgrades: React.Dispatch<React.SetStateAction<Upgrades>>;
  goldenCookie: GoldenCookie | null;
  setGoldenCookie: React.Dispatch<React.SetStateAction<GoldenCookie | null>>;
  notification: string | null;
  setNotification: React.Dispatch<React.SetStateAction<string | null>>;
  frenzyMode: boolean;
  setFrenzyMode: React.Dispatch<React.SetStateAction<boolean>>;
  frenzyTimer: number;
  setFrenzyTimer: React.Dispatch<React.SetStateAction<number>>;
  gameAreaRef: React.RefObject<HTMLDivElement | null>;
  getBuildingProduction: (key: string, building: Buildings[string]) => number;
  calculateMPS: () => number;
  showNotification: (message: string) => void;
}

export function useGameLogic({ prestigeMultiplier = 1 }: UseGameLogicParams = {}): UseGameLogicReturn {
  const [money, setMoney] = useState(0);
  const [moneyPerSecond, setMoneyPerSecond] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [buildings, setBuildings] = useState<Buildings>(initialBuildings);
  const [upgrades, setUpgrades] = useState<Upgrades>(initialUpgrades);
  const [goldenCookie, setGoldenCookie] = useState<GoldenCookie | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [frenzyMode, setFrenzyMode] = useState(false);
  const [frenzyTimer, setFrenzyTimer] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const getBuildingProduction = (key: string, building: Buildings[string]) => {
    let production = building.baseProduction * building.count;

    // Ensure production is a valid number
    if (!isFinite(production)) production = 0;

    Object.values(upgrades).forEach(upgrade => {
      if (upgrade.owned && upgrade.type === 'building' && upgrade.building === key) {
        production *= upgrade.multiplier || 1;
      }
    });

    Object.values(upgrades).forEach(upgrade => {
      if (upgrade.owned && upgrade.type === 'global') {
        production *= upgrade.multiplier || 1;
      }
    });

    if (frenzyMode) production *= 7;
    
    // Apply prestige multiplier
    if (prestigeMultiplier && isFinite(prestigeMultiplier)) {
      production *= prestigeMultiplier;
    }
    
    // Ensure final production is a valid number
    return isFinite(production) ? production : 0;
  };

  const calculateMPS = () => {
    let total = 0;
    Object.entries(buildings).forEach(([key, building]) => {
      total += getBuildingProduction(key, building);
    });
    return total;
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  // Building unlock effect
  useEffect(() => {
    setBuildings(prev => {
      const updated = { ...prev };
      Object.keys(unlockThresholds).forEach(key => {
        if (totalEarned >= unlockThresholds[key as keyof typeof unlockThresholds] && !updated[key].unlocked) {
          updated[key] = { ...updated[key], unlocked: true };
          showNotification(`🎉 Unlocked: ${updated[key].name}!`);
        }
      });
      return updated;
    });
  }, [totalEarned]);

  // Money per second effect
  useEffect(() => {
    const interval = setInterval(() => {
      const mps = calculateMPS();
      setMoneyPerSecond(mps);
      setMoney(m => m + mps / 10);
      setTotalEarned(t => t + mps / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [buildings, upgrades, frenzyMode]);

  // Golden cookie spawning
  useEffect(() => {
    const spawnGoldenCookie = () => {
      if (Math.random() < 0.05 && gameAreaRef.current && !goldenCookie) {
        const rect = gameAreaRef.current.getBoundingClientRect();
        const x = Math.random() * (rect.width - 100);
        const y = Math.random() * (rect.height - 100);

        const types: Array<'bonus' | 'frenzy' | 'lucky'> = ['bonus', 'frenzy', 'lucky'];
        const type = types[Math.floor(Math.random() * types.length)];

        setGoldenCookie({ x, y, type });
        setTimeout(() => setGoldenCookie(null), 13000);
      }
    };

    const interval = setInterval(spawnGoldenCookie, 5000);
    return () => clearInterval(interval);
  }, [goldenCookie]);

  // Frenzy timer effect
  useEffect(() => {
    if (frenzyMode && frenzyTimer > 0) {
      const timer = setTimeout(() => setFrenzyTimer(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (frenzyTimer === 0 && frenzyMode) {
      setFrenzyMode(false);
      showNotification('Frenzy ended');
    }
  }, [frenzyMode, frenzyTimer]);

  return {
    money,
    setMoney,
    moneyPerSecond,
    clickPower,
    setClickPower,
    totalClicks,
    setTotalClicks,
    totalEarned,
    setTotalEarned,
    buildings,
    setBuildings,
    upgrades,
    setUpgrades,
    goldenCookie,
    setGoldenCookie,
    notification,
    setNotification,
    frenzyMode,
    setFrenzyMode,
    frenzyTimer,
    setFrenzyTimer,
    gameAreaRef,
    getBuildingProduction,
    calculateMPS,
    showNotification
  };
}