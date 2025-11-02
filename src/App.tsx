import { useState, useEffect } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { getCurrentCost, formatNumber } from './utils/gameUtils';
import { initialChallenges, initialAchievements } from './data/challengesData';
import type { Challenge, Achievement } from './types/challenges';
import type { Buildings, Upgrades } from './types/game';
import Header from './components/Header';
import ClickerArea from './components/ClickerArea';
import Store from './components/Store';
import Notification from './components/Notification';
import FrenzyIndicator from './components/FrenzyIndicator';
import GoldenCookieComponent from './components/GoldenCookie';

export default function IndieHackerGame() {
  const {
    money,
    setMoney,
    moneyPerSecond,
    clickPower,
    setClickPower,
    totalClicks,
    setTotalClicks,
    setTotalEarned,
    buildings,
    setBuildings,
    upgrades,
    setUpgrades,
    goldenCookie,
    setGoldenCookie,
    notification,
    frenzyMode,
    setFrenzyMode,
    frenzyTimer,
    setFrenzyTimer,
    gameAreaRef,
    getBuildingProduction,
    showNotification
  } = useGameLogic();

  const [selectedTab, setSelectedTab] = useState<'buildings' | 'upgrades' | 'challenges' | 'achievements' | 'prestige'>('buildings');
  const [totalEarned2, setTotalEarned2] = useState(0);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [prestigeLevel, setPrestigeLevel] = useState(0);
  const [prestigeTokens, setPrestigeTokens] = useState(0);
  const [frenzyCount, setFrenzyCount] = useState(0);
  const [goldenCookieClicks, setGoldenCookieClicks] = useState(0);
  
  const prestigeMultiplier = 1 + (prestigeTokens * 0.1);
  
  // Override setTotalEarned to also update totalEarned2
  const updateTotalEarned = (updater: React.SetStateAction<number>) => {
    setTotalEarned(updater);
    if (typeof updater === 'function') {
      setTotalEarned2(prev => updater(prev));
    } else {
      setTotalEarned2(updater);
    }
  };
  
  const checkAchievement = (id: string) => {
    setAchievements(prev => prev.map(a => {
      if (a.id === id && !a.unlocked) {
        showNotification(`🏆 Achievement Unlocked: ${a.name}!`);
        return { ...a, unlocked: true };
      }
      return a;
    }));
  };
  
  const updateChallengeProgress = (type: Challenge['type'], value: number) => {
    setChallenges(prev => prev.map(c => {
      if (c.type === type && !c.completed) {
        const newProgress = Math.max(c.progress, value);
        if (newProgress >= c.goal && !c.completed) {
          showNotification(`✨ Challenge Completed: ${c.name}!`);
          // Apply reward
          if (c.reward === 'Click Power') {
            setClickPower(p => p + c.rewardValue);
          } else if (c.reward === 'Money Bonus') {
            setMoney(m => m + c.rewardValue);
          }
          return { ...c, progress: c.goal, completed: true };
        }
        return { ...c, progress: newProgress };
      }
      return c;
    }));
  };
  
  const handlePrestige = () => {
    if (totalEarned2 >= 1000000000) {
      const tokensToGain = Math.floor(totalEarned2 / 1000000000);
      setPrestigeLevel(l => l + 1);
      setPrestigeTokens(t => t + tokensToGain);
      
      // Reset game state but keep achievements
      setMoney(0);
      setTotalEarned(0);
      setTotalEarned2(0);
      setClickPower(1);
      setTotalClicks(0);
      
      // Reset buildings to initial state
      const resetBuildings: Buildings = {
        cursor: { ...buildings.cursor, count: 0 },
        grandma: { ...buildings.grandma, count: 0 },
        farm: { ...buildings.farm, count: 0 },
        mine: { ...buildings.mine, count: 0 },
        factory: { ...buildings.factory, count: 0 },
        bank: { ...buildings.bank, count: 0 },
        temple: { ...buildings.temple, count: 0 },
        wizardTower: { ...buildings.wizardTower, count: 0 },
        shipment: { ...buildings.shipment, count: 0 },
        alchemyLab: { ...buildings.alchemyLab, count: 0 },
        portal: { ...buildings.portal, count: 0 },
        timeMachine: { ...buildings.timeMachine, count: 0 },
      };
      setBuildings(resetBuildings);
      
      // Reset upgrades - mark all as not purchased
      const resetUpgrades: Upgrades = Object.keys(upgrades).reduce((acc, key) => {
        acc[key as keyof Upgrades] = { ...upgrades[key as keyof Upgrades], owned: false };
        return acc;
      }, {} as Upgrades);
      setUpgrades(resetUpgrades);
      
      setChallenges(initialChallenges);
      setFrenzyCount(0);
      setGoldenCookieClicks(0);
      
      showNotification(`🌟 Prestige ${prestigeLevel + 1}! +${tokensToGain} Token${tokensToGain > 1 ? 's' : ''}!`);
      setSelectedTab('buildings');
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const earnings = frenzyMode ? clickPower * 7 * prestigeMultiplier : clickPower * prestigeMultiplier;
    setMoney(m => m + earnings);
    updateTotalEarned(t => t + earnings);
    setTotalClicks(c => {
      const newClicks = c + 1;
      updateChallengeProgress('clicks', newClicks);
      if (newClicks === 1) checkAchievement('a1');
      if (newClicks >= 100) checkAchievement('a2');
      if (newClicks >= 1000) checkAchievement('a5');
      if (newClicks >= 10000) checkAchievement('a8');
      return newClicks;
    });

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const floater = document.createElement('div');
    floater.className = 'floating-number';
    floater.textContent = `+$${formatNumber(earnings)}`;
    floater.style.left = `${x}px`;
    floater.style.top = `${y}px`;
    e.currentTarget.appendChild(floater);

    setTimeout(() => floater.remove(), 1000);
  };

  const buyBuilding = (key: string) => {
    const building = buildings[key];
    const cost = getCurrentCost(building.baseCost, building.count);

    if (money >= cost) {
      setMoney(m => m - cost);
      setBuildings(prev => ({
        ...prev,
        [key]: { ...building, count: building.count + 1 }
      }));
    }
  };

  const buyUpgrade = (key: string) => {
    const upgrade = upgrades[key];
    if (!upgrade.owned && money >= upgrade.cost) {
      if (upgrade.type === 'building' && upgrade.building) {
        const building = buildings[upgrade.building];
        if (building.count < (upgrade.req || 0)) {
          showNotification(`Need ${upgrade.req} ${building.name}s!`);
          return;
        }
      } else if (upgrade.type === 'click' && totalClicks < (upgrade.req || 0)) {
        showNotification(`Need ${upgrade.req} clicks!`);
        return;
      }

      setMoney(m => m - upgrade.cost);
      setUpgrades(prev => ({
        ...prev,
        [key]: { ...upgrade, owned: true }
      }));

      if (upgrade.type === 'click' && upgrade.effect) {
        setClickPower(p => p * upgrade.effect!);
      }

      showNotification(`✨ ${upgrade.name}!`);
    }
  };

  const clickGoldenCookie = () => {
    if (!goldenCookie) return;

    setGoldenCookieClicks(c => c + 1);

    if (goldenCookie.type === 'bonus') {
      const bonus = Math.max(moneyPerSecond * 60 * 13, clickPower * 13);
      setMoney(m => m + bonus);
      updateTotalEarned(t => t + bonus);
      showNotification(`💰 +$${formatNumber(bonus)}`);
    } else if (goldenCookie.type === 'frenzy') {
      setFrenzyMode(true);
      setFrenzyTimer(77);
      setFrenzyCount(c => c + 1);
      showNotification('🔥 FRENZY x7!');
    } else if (goldenCookie.type === 'lucky') {
      const lucky = Math.max(moneyPerSecond * 900, money * 0.15);
      setMoney(m => m + lucky);
      updateTotalEarned(t => t + lucky);
      showNotification(`🍀 +$${formatNumber(lucky)}`);
    }
    setGoldenCookie(null);
  };

  const totalBuildings = Object.values(buildings).reduce((sum, b) => sum + b.count, 0);
  const ownedUpgrades = Object.values(upgrades).filter(u => u.owned).length;
  const availableUpgrades = Object.values(upgrades).filter(u => !u.owned).length;
  
  // Track money-based challenges and achievements
  useEffect(() => {
    updateChallengeProgress('money', totalEarned2);
    updateChallengeProgress('mps', moneyPerSecond);
    
    if (money >= 100) checkAchievement('a3');
    if (money >= 1000000) checkAchievement('a6');
    if (money >= 1000000000) checkAchievement('a9');
    if (totalEarned2 >= 1000000) checkAchievement('a12');
  }, [money, totalEarned2, moneyPerSecond]);
  
  // Track building-based challenges and achievements
  useEffect(() => {
    updateChallengeProgress('buildings', totalBuildings);
    
    if (totalBuildings >= 1) checkAchievement('a4');
    if (totalBuildings >= 50) checkAchievement('a7');
    if (totalBuildings >= 200) checkAchievement('a10');
    if (totalBuildings >= 500) checkAchievement('a13');
  }, [totalBuildings]);
  
  // Track upgrade-based challenges and achievements
  useEffect(() => {
    updateChallengeProgress('upgrades', ownedUpgrades);
    
    if (ownedUpgrades >= 5) checkAchievement('a11');
    if (ownedUpgrades >= 15) checkAchievement('a14');
  }, [ownedUpgrades]);
  
  // Track golden cookie clicks
  useEffect(() => {
    if (goldenCookieClicks >= 10) checkAchievement('a15');
  }, [goldenCookieClicks]);
  
  // Track frenzy mode activations
  useEffect(() => {
    if (frenzyCount >= 5) checkAchievement('a16');
  }, [frenzyCount]);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden relative" ref={gameAreaRef}>
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <style>{`
        .floating-number {
          position: absolute;
          font-size: 24px;
          font-weight: 900;
          color: #10b981;
          pointer-events: none;
          animation: float-up 1.2s ease-out forwards;
          text-shadow: 0 0 10px rgba(16, 185, 129, 0.5), 2px 2px 8px rgba(0,0,0,0.8);
          z-index: 100;
        }
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1.2);
            opacity: 0;
          }
        }
        .golden-cookie {
          animation: golden-pulse 0.8s ease-in-out infinite;
        }
        @keyframes golden-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(5deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.1); }
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 30s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        @keyframes spin-slower {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slower {
          animation: spin-slower 12s linear infinite;
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes slideDown {
          from {
            transform: translate(-50%, -100%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, 0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 0.5s ease-out forwards;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out infinite;
        }
      `}</style>

      {notification && <Notification message={notification} />}
      {frenzyMode && <FrenzyIndicator frenzyTimer={frenzyTimer} />}
      {goldenCookie && <GoldenCookieComponent goldenCookie={goldenCookie} onGoldenCookieClick={clickGoldenCookie} />}

      <div className="relative z-10">
        <Header money={money} moneyPerSecond={moneyPerSecond} clickPower={clickPower} />
      </div>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <ClickerArea
          frenzyMode={frenzyMode}
          onBigClick={handleClick}
          totalClicks={totalClicks}
          totalBuildings={totalBuildings}
          ownedUpgrades={ownedUpgrades}
        />

        <Store
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          buildings={buildings}
          upgrades={upgrades}
          money={money}
          totalClicks={totalClicks}
          totalBuildings={totalBuildings}
          availableUpgrades={availableUpgrades}
          onBuyBuilding={buyBuilding}
          onBuyUpgrade={buyUpgrade}
          getBuildingProduction={getBuildingProduction}
          challenges={challenges}
          achievements={achievements}
          totalEarned={totalEarned2}
          prestigeLevel={prestigeLevel}
          prestigeTokens={prestigeTokens}
          prestigeMultiplier={prestigeMultiplier}
          onPrestige={handlePrestige}
        />
      </div>
    </div>
  );
}
