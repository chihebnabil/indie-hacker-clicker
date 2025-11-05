import { useState, useEffect, useRef } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { useAutoSave } from './hooks/useAutoSave';
import { useSEO } from './hooks/useSEO';
import { useStructuredData } from './hooks/useStructuredData';
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
import ComboIndicator from './components/ComboIndicator';
import UsernameModal from './components/UsernameModal';
import InvestorPitchModal from './components/InvestorPitchModal';
import MotivationalQuote from './components/MotivationalQuote';
import TimeEventBanner from './components/TimeEventBanner';
import { 
  indieHackerQuotes, 
  investorPitches, 
  timeBasedEvents, 
  funMilestones,
  konamiCode,
  celebrationMessages 
} from './data/easterEggs';

export default function IndieHackerGame() {
  // Prestige state (must be declared before useGameLogic to calculate multiplier)
  const [prestigeLevel, setPrestigeLevel] = useState(0);
  const [prestigeTokens, setPrestigeTokens] = useState(0);
  const prestigeMultiplier = 1 + (prestigeTokens * 0.1);

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
  } = useGameLogic({ prestigeMultiplier });

  const [selectedTab, setSelectedTab] = useState<'buildings' | 'upgrades' | 'challenges' | 'achievements' | 'prestige' | 'leaderboard'>('buildings');
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [totalEarned2, setTotalEarned2] = useState(0);
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);

  // Handle username and project info save
  const handleUsernameSave = (newUsername: string, newProjectName?: string, newProjectUrl?: string) => {
    updateUsername(newUsername, newProjectName, newProjectUrl);
    setShowUsernameModal(false);
  };

  // Handle manual save
  const handleManualSave = async () => {
    const success = await manualSave();
    if (success) {
      showNotification('💾 Game saved successfully!');
    } else {
      showNotification('❌ Failed to save game');
    }
  };
  const [frenzyCount, setFrenzyCount] = useState(0);
  const [goldenCookieClicks, setGoldenCookieClicks] = useState(0);
  
  // Combo system state
  const [comboCount, setComboCount] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);

  // Easter egg states
  const [showInvestorPitch, setShowInvestorPitch] = useState(false);
  const [currentPitch, setCurrentPitch] = useState<typeof investorPitches[0] | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [activeTimeEvent, setActiveTimeEvent] = useState<any>(null);
  const [eventMultiplier, setEventMultiplier] = useState(1);
  const [konamiActivated, setKonamiActivated] = useState(false);
  const [milestonesSeen, setMilestonesSeen] = useState<Set<number>>(new Set());
  
  // Auto-save game state
  const { loadedGame, username, projectName, projectUrl, updateUsername, manualSave, isLoading } = useAutoSave({
    money,
    totalEarned: 0, // We'll get from useGameLogic
    totalEarned2,
    clickPower,
    totalClicks,
    buildings,
    upgrades,
    challenges,
    achievements,
    prestigeLevel,
    prestigeTokens,
    frenzyCount,
    goldenCookieClicks,
    bestCombo,
  });

  // SEO - Dynamic title based on game progress
  useSEO({
    title: prestigeLevel > 0 
      ? `💰 $${formatNumber(money)} | Prestige ${prestigeLevel} | Indie Hacker Clicker`
      : `💰 $${formatNumber(money)} | Indie Hacker Clicker`,
    description: `Join ${username || 'thousands of players'} in building your indie empire! Currently earning $${formatNumber(moneyPerSecond)}/sec. Prestige Level: ${prestigeLevel}. Best Combo: ${bestCombo}x`,
  });

  // Structured Data for SEO
  useStructuredData();
  
  // Load saved game on mount
  useEffect(() => {
    if (loadedGame && !isLoading) {
      setMoney(loadedGame.money);
      setTotalEarned2(loadedGame.totalEarned2);
      setClickPower(loadedGame.clickPower);
      setTotalClicks(loadedGame.totalClicks);
      setBuildings(loadedGame.buildings);
      setUpgrades(loadedGame.upgrades);
      setChallenges(loadedGame.challenges as Challenge[]);
      setAchievements(loadedGame.achievements as Achievement[]);
      setPrestigeLevel(loadedGame.prestigeLevel);
      setPrestigeTokens(loadedGame.prestigeTokens);
      setFrenzyCount(loadedGame.frenzyCount);
      setGoldenCookieClicks(loadedGame.goldenCookieClicks);
      setBestCombo(loadedGame.bestCombo);
      showNotification('💾 Game loaded!');
    }
  }, [loadedGame, isLoading]);
  
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
    // Use the higher value between totalEarned2 and current money for prestige calculation
    const prestigeValue = Math.max(totalEarned2, money);
    if (prestigeValue >= 1000000000) {
      const tokensToGain = Math.floor(prestigeValue / 1000000000);
      setPrestigeLevel(l => l + 1);
      setPrestigeTokens(t => t + tokensToGain);
      
      // Reset game state but keep achievements
      setMoney(0);
      setTotalEarned(0);
      setTotalEarned2(0);
      setClickPower(1);
      setTotalClicks(0);
      
      // Reset combo system
      setComboCount(1);
      setComboMultiplier(1);
      setLastClickTime(Date.now());
      
      // Reset buildings to initial state - reset count to 0 while keeping other properties
      const resetBuildings: Buildings = Object.keys(buildings).reduce((acc, key) => {
        acc[key] = { ...buildings[key], count: 0 };
        return acc;
      }, {} as Buildings);
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
      setFrenzyMode(false);
      setFrenzyTimer(0);
      
      showNotification(`🌟 Prestige ${prestigeLevel + 1}! +${tokensToGain} Token${tokensToGain > 1 ? 's' : ''}!`);
      setSelectedTab('buildings');
    }
  };

  // Easter egg: Random motivational quotes
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      if (Math.random() < 0.15) { // 15% chance every interval
        const randomQuote = indieHackerQuotes[Math.floor(Math.random() * indieHackerQuotes.length)];
        setCurrentQuote(randomQuote);
        setShowQuote(true);
      }
    }, 60000); // Check every minute
    return () => clearInterval(quoteInterval);
  }, []);

  // Easter egg: Random investor pitches
  useEffect(() => {
    const pitchInterval = setInterval(() => {
      if (Math.random() < 0.1 && !showInvestorPitch && money > 10000) { // 10% chance if you have $10k+
        const randomPitch = investorPitches[Math.floor(Math.random() * investorPitches.length)];
        setCurrentPitch(randomPitch);
        setShowInvestorPitch(true);
      }
    }, 120000); // Check every 2 minutes
    return () => clearInterval(pitchInterval);
  }, [money, showInvestorPitch]);

  // Easter egg: Time-based events
  useEffect(() => {
    const checkTimeEvents = () => {
      let activeEvent = null;
      let multiplier = 1;

      for (const event of Object.values(timeBasedEvents)) {
        if (event.check()) {
          activeEvent = event;
          multiplier = event.multiplier;
          break;
        }
      }

      setActiveTimeEvent(activeEvent);
      setEventMultiplier(multiplier);
    };

    checkTimeEvents();
    const interval = setInterval(checkTimeEvents, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Easter egg: Milestone celebrations
  useEffect(() => {
    for (const milestone of funMilestones) {
      if (money >= milestone.amount && !milestonesSeen.has(milestone.amount)) {
        setMilestonesSeen(prev => new Set([...prev, milestone.amount]));
        const celebration = celebrationMessages[Math.floor(Math.random() * celebrationMessages.length)];
        showNotification(`${milestone.emoji} ${milestone.message} ${celebration}`);
      }
    }
  }, [money, milestonesSeen]);

  // Easter egg: Konami code
  useEffect(() => {
    let konamiProgress: string[] = [];
    
    const handleKeyDown = (e: KeyboardEvent) => {
      konamiProgress = [...konamiProgress, e.key].slice(-10);
      if (konamiProgress.join(',') === konamiCode.join(',') && !konamiActivated) {
        setKonamiActivated(true);
        setClickPower(p => p * 10);
        setMoney(m => m * 2);
        checkAchievement('a17'); // Old School Gamer
        showNotification('🎮 KONAMI CODE ACTIVATED! 10x Click Power + 2x Money! 🚀');
        setTimeout(() => setKonamiActivated(false), 30000); // Lasts 30 seconds
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiActivated]);

  // Easter egg: Check for time-based achievements
  useEffect(() => {
    if (activeTimeEvent) {
      if (activeTimeEvent.name.includes('Late Night')) {
        checkAchievement('a18'); // Night Owl
      }
      if (activeTimeEvent.name.includes('Weekend')) {
        checkAchievement('a19'); // Weekend Warrior
      }
    }
  }, [activeTimeEvent]);

  // Anti-cheat: Track click patterns
  const clickTimestamps = useRef<number[]>([]);
  const [isAutoClickerDetected, setIsAutoClickerDetected] = useState(false);
  const [clicksDisabledUntil, setClicksDisabledUntil] = useState(0);

  // Clear auto-clicker flag after timeout
  useEffect(() => {
    if (isAutoClickerDetected && clicksDisabledUntil > 0) {
      const timeout = setTimeout(() => {
        setIsAutoClickerDetected(false);
        showNotification('✅ Clicks re-enabled. Play fair!');
      }, clicksDisabledUntil - Date.now());
      return () => clearTimeout(timeout);
    }
  }, [isAutoClickerDetected, clicksDisabledUntil]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const now = Date.now();
    
    // Check if clicks are disabled due to auto-clicker detection
    if (now < clicksDisabledUntil) {
      showNotification('⚠️ Auto-clicker detected! Clicks disabled temporarily.');
      return;
    }
    
    const timeSinceLastClick = now - lastClickTime;
    
    // Anti-cheat: Track click patterns
    clickTimestamps.current.push(now);
    // Keep only last 20 clicks
    if (clickTimestamps.current.length > 20) {
      clickTimestamps.current.shift();
    }
    
    // Detect auto-clicker patterns
    if (clickTimestamps.current.length >= 10) {
      const recentClicks = clickTimestamps.current.slice(-10);
      const intervals = [];
      for (let i = 1; i < recentClicks.length; i++) {
        intervals.push(recentClicks[i] - recentClicks[i - 1]);
      }
      
      // Check for suspiciously consistent intervals (±5ms variance)
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const variance = intervals.reduce((sum, interval) => sum + Math.abs(interval - avgInterval), 0) / intervals.length;
      
      // If clicks are too consistent (variance < 5ms) and fast (< 100ms avg), it's likely an auto-clicker
      if (variance < 5 && avgInterval < 100) {
        setIsAutoClickerDetected(true);
        setClicksDisabledUntil(now + 10000); // Disable for 10 seconds
        showNotification('🚫 AUTO-CLICKER DETECTED! Clicks disabled for 10 seconds!');
        clickTimestamps.current = [];
        return;
      }
      
      // Also check for impossibly fast clicking (< 30ms between clicks sustained)
      if (avgInterval < 30) {
        setIsAutoClickerDetected(true);
        setClicksDisabledUntil(now + 10000);
        showNotification('🚫 Impossibly fast clicking detected! Take a break!');
        clickTimestamps.current = [];
        return;
      }
    }
    
    // Determine current combo multiplier before state updates
    let currentComboMultiplier = 1;
    let currentComboCount = comboCount;
    
    // Update combo based on click timing
    if (timeSinceLastClick < 2000 && timeSinceLastClick > 0) {
      // Build combo
      currentComboCount = comboCount + 1;
      
      // Update combo multiplier based on combo count
      if (currentComboCount >= 100) currentComboMultiplier = 10;
      else if (currentComboCount >= 50) currentComboMultiplier = 5;
      else if (currentComboCount >= 25) currentComboMultiplier = 3;
      else if (currentComboCount >= 10) currentComboMultiplier = 2;
      else currentComboMultiplier = 1;
      
      setComboCount(currentComboCount);
      setComboMultiplier(currentComboMultiplier);
      
      // Track best combo
      if (currentComboCount > bestCombo) {
        setBestCombo(currentComboCount);
        if (currentComboCount === 10) checkAchievement('a2');
        if (currentComboCount === 50) {
          showNotification('🔥 50 Hit Combo!');
          checkAchievement('a6');
        }
        if (currentComboCount === 100) {
          showNotification('🔥🔥 100 Hit MEGA COMBO!');
          checkAchievement('a10');
        }
      }
    } else {
      // Reset combo
      currentComboCount = 1;
      currentComboMultiplier = 1;
      setComboCount(1);
      setComboMultiplier(1);
    }
    
    setLastClickTime(now);
    
    // Calculate earnings with combo multiplier and event multiplier - use the calculated value, not state
    const baseClickPower = isFinite(clickPower) && clickPower > 0 ? clickPower : 1;
    const basePrestigeMultiplier = isFinite(prestigeMultiplier) && prestigeMultiplier > 0 ? prestigeMultiplier : 1;
    const baseEarnings = frenzyMode ? baseClickPower * 7 * basePrestigeMultiplier : baseClickPower * basePrestigeMultiplier;
    const earnings = baseEarnings * currentComboMultiplier * eventMultiplier;
    
    setMoney(m => m + earnings);
    updateTotalEarned(t => t + earnings);
    setTotalClicks(c => {
      const newClicks = c + 1;
      updateChallengeProgress('clicks', newClicks);
      if (newClicks === 1) checkAchievement('a1');
      if (newClicks >= 100) checkAchievement('a5');
      if (newClicks >= 10000) checkAchievement('a14');
      return newClicks;
    });

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const floater = document.createElement('div');
    floater.className = 'floating-number';
    floater.textContent = currentComboMultiplier > 1 ? `+$${formatNumber(earnings)} (×${currentComboMultiplier})` : `+$${formatNumber(earnings)}`;
    floater.style.left = `${x}px`;
    floater.style.top = `${y}px`;
    if (currentComboMultiplier >= 10) {
      floater.style.color = '#ef4444';
      floater.style.fontSize = '36px';
      floater.style.textShadow = '0 0 20px rgba(239, 68, 68, 0.8)';
    } else if (currentComboMultiplier >= 5) {
      floater.style.color = '#f59e0b';
      floater.style.fontSize = '32px';
      floater.style.textShadow = '0 0 15px rgba(245, 158, 11, 0.8)';
    } else if (currentComboMultiplier >= 3) {
      floater.style.color = '#fbbf24';
      floater.style.fontSize = '28px';
    }
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
  
  // Reset combo after 2 seconds of no clicking
  useEffect(() => {
    if (comboCount === 0) return;
    
    const timer = setTimeout(() => {
      const now = Date.now();
      if (now - lastClickTime >= 2000) {
        setComboCount(0);
        setComboMultiplier(1);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [lastClickTime, comboCount]);
  
  // Track money-based challenges and achievements
  useEffect(() => {
    updateChallengeProgress('money', totalEarned2);
    updateChallengeProgress('mps', moneyPerSecond);
    
    if (money >= 1000000) checkAchievement('a9');
    if (money >= 1000000000) checkAchievement('a13');
    if (moneyPerSecond >= 10000000) checkAchievement('a16');
  }, [money, totalEarned2, moneyPerSecond]);
  
  // Track building-based challenges and achievements
  useEffect(() => {
    updateChallengeProgress('buildings', totalBuildings);
    
    if (totalBuildings >= 1) checkAchievement('a3');
    if (totalBuildings >= 100) checkAchievement('a12');
    if (totalBuildings >= 500) checkAchievement('a15');
  }, [totalBuildings]);
  
  // Track upgrade-based challenges and achievements
  useEffect(() => {
    updateChallengeProgress('upgrades', ownedUpgrades);
    
    if (ownedUpgrades >= 10) checkAchievement('a7');
    if (ownedUpgrades >= 22) checkAchievement('a11');
  }, [ownedUpgrades]);
  
  // Track golden cookie clicks
  useEffect(() => {
    if (goldenCookieClicks >= 1) checkAchievement('a4');
  }, [goldenCookieClicks]);
  
  // Track frenzy mode activations
  useEffect(() => {
    if (frenzyCount >= 5) checkAchievement('a8');
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

      {/* Notification System - Stacked vertically */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* Top Left - Combo Indicator only */}
        <div className="absolute top-[88px] left-4 flex flex-col items-start gap-2">
          <ComboIndicator comboCount={comboCount} comboMultiplier={comboMultiplier} />
        </div>
        
        {/* Top Right - All notifications stacked */}
        <div className="absolute top-[88px] right-4 flex flex-col items-end gap-2 max-w-sm">
          {frenzyMode && <FrenzyIndicator frenzyTimer={frenzyTimer} />}
          {activeTimeEvent && <TimeEventBanner event={activeTimeEvent} onClose={() => setActiveTimeEvent(null)} />}
          {isAutoClickerDetected && Date.now() < clicksDisabledUntil && (
            <div className="bg-gradient-to-r from-red-600 to-orange-600 border-2 border-red-400 rounded-lg p-4 shadow-2xl shadow-red-500/50 animate-pulse">
              <div className="flex items-center gap-2 text-white">
                <span className="text-2xl">🚫</span>
                <div>
                  <div className="font-black text-sm">AUTO-CLICKER DETECTED</div>
                  <div className="text-xs opacity-90">
                    Clicks disabled for {Math.ceil((clicksDisabledUntil - Date.now()) / 1000)}s
                  </div>
                </div>
              </div>
            </div>
          )}
          {notification && <Notification message={notification} />}
          {showQuote && <MotivationalQuote quote={currentQuote} onClose={() => setShowQuote(false)} />}
        </div>
      </div>
      
      {/* Full Screen Overlays */}
      {goldenCookie && <GoldenCookieComponent goldenCookie={goldenCookie} onGoldenCookieClick={clickGoldenCookie} />}
      {showInvestorPitch && currentPitch && (
        <InvestorPitchModal
          pitch={currentPitch}
          onChoice={(bonus, message) => {
            setMoney(m => m * bonus);
            showNotification(message);
            setShowInvestorPitch(false);
          }}
          onClose={() => setShowInvestorPitch(false)}
        />
      )}
      {konamiActivated && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
          <div className="text-8xl animate-ping">🚀</div>
        </div>
      )}

      <div className="relative z-10">
        <Header 
          money={money} 
          moneyPerSecond={moneyPerSecond} 
          clickPower={clickPower}
          username={username}
          onUsernameClick={() => setShowUsernameModal(true)}
          onSaveClick={handleManualSave}
        />
      </div>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <ClickerArea
          frenzyMode={frenzyMode}
          onBigClick={handleClick}
          totalClicks={totalClicks}
          totalBuildings={totalBuildings}
          ownedUpgrades={ownedUpgrades}
          comboMultiplier={comboMultiplier}
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
          totalEarned={Math.max(totalEarned2, money)}
          prestigeLevel={prestigeLevel}
          prestigeTokens={prestigeTokens}
          prestigeMultiplier={prestigeMultiplier}
          canPrestige={totalEarned2 >= 1000000000 || money >= 1000000000}
          onPrestige={handlePrestige}
        />
      </div>

      {showUsernameModal && (
        <UsernameModal
          currentUsername={username}
          currentProjectName={projectName}
          currentProjectUrl={projectUrl}
          onSave={handleUsernameSave}
          onClose={() => setShowUsernameModal(false)}
        />
      )}
    </div>
  );
}
