import { useState } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { getCurrentCost, formatNumber } from './utils/gameUtils';
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

  const [selectedTab, setSelectedTab] = useState<'buildings' | 'upgrades'>('buildings');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const earnings = frenzyMode ? clickPower * 7 : clickPower;
    setMoney(m => m + earnings);
    setTotalEarned(t => t + earnings);
    setTotalClicks(c => c + 1);

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

    if (goldenCookie.type === 'bonus') {
      const bonus = Math.max(moneyPerSecond * 60 * 13, clickPower * 13);
      setMoney(m => m + bonus);
      setTotalEarned(t => t + bonus);
      showNotification(`💰 +$${formatNumber(bonus)}`);
    } else if (goldenCookie.type === 'frenzy') {
      setFrenzyMode(true);
      setFrenzyTimer(77);
      showNotification('🔥 FRENZY x7!');
    } else if (goldenCookie.type === 'lucky') {
      const lucky = Math.max(moneyPerSecond * 900, money * 0.15);
      setMoney(m => m + lucky);
      setTotalEarned(t => t + lucky);
      showNotification(`🍀 +$${formatNumber(lucky)}`);
    }
    setGoldenCookie(null);
  };

  const totalBuildings = Object.values(buildings).reduce((sum, b) => sum + b.count, 0);
  const ownedUpgrades = Object.values(upgrades).filter(u => u.owned).length;
  const availableUpgrades = Object.values(upgrades).filter(u => !u.owned).length;

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
        />
      </div>
    </div>
  );
}
