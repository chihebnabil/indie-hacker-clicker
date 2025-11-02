import { Rocket, Sparkles, Trophy, Award, RotateCcw } from 'lucide-react';
import type { Buildings, Upgrades } from '../types/game';
import type { Challenge, Achievement } from '../types/challenges';
import BuildingCard from './BuildingCard';
import UpgradeCard from './UpgradeCard';
import ChallengeCard from './ChallengeCard';
import AchievementCard from './AchievementCard';
import PrestigePanel from './PrestigePanel';

interface StoreProps {
  selectedTab: 'buildings' | 'upgrades' | 'challenges' | 'achievements' | 'prestige';
  setSelectedTab: (tab: 'buildings' | 'upgrades' | 'challenges' | 'achievements' | 'prestige') => void;
  buildings: Buildings;
  upgrades: Upgrades;
  money: number;
  totalClicks: number;
  totalBuildings: number;
  availableUpgrades: number;
  onBuyBuilding: (key: string) => void;
  onBuyUpgrade: (key: string) => void;
  getBuildingProduction: (key: string, building: Buildings[string]) => number;
  challenges: Challenge[];
  achievements: Achievement[];
  totalEarned: number;
  prestigeLevel: number;
  prestigeTokens: number;
  prestigeMultiplier: number;
  onPrestige: () => void;
}

export default function Store({
  selectedTab,
  setSelectedTab,
  buildings,
  upgrades,
  money,
  totalClicks,
  totalBuildings,
  availableUpgrades,
  onBuyBuilding,
  onBuyUpgrade,
  getBuildingProduction,
  challenges,
  achievements,
  totalEarned,
  prestigeLevel,
  prestigeTokens,
  prestigeMultiplier,
  onPrestige
}: StoreProps) {
  const activeChallenges = challenges.filter(c => !c.completed).length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const canPrestige = totalEarned >= 1000000000;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-slate-900/30">
      {/* Tabs */}
      <div className="flex-none flex bg-slate-900/50 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <button
          onClick={() => setSelectedTab('buildings')}
          className={`relative flex-1 min-w-fit px-4 py-3 font-bold transition-all duration-300 ${
            selectedTab === 'buildings' 
              ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {selectedTab === 'buildings' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          )}
          <div className="relative z-10 flex items-center justify-center gap-1.5">
            <Rocket className="w-3.5 h-3.5" />
            <span className="text-xs">Buildings</span>
            <span className={`text-[10px] px-1 py-0.5 rounded-full ${selectedTab === 'buildings' ? 'bg-white/20' : 'bg-gray-700/50'}`}>
              {totalBuildings}
            </span>
          </div>
        </button>
        <button
          onClick={() => setSelectedTab('upgrades')}
          className={`relative flex-1 min-w-fit px-4 py-3 font-bold transition-all duration-300 ${
            selectedTab === 'upgrades' 
              ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {selectedTab === 'upgrades' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          )}
          <div className="relative z-10 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs">Upgrades</span>
            <span className={`text-[10px] px-1 py-0.5 rounded-full ${selectedTab === 'upgrades' ? 'bg-white/20' : 'bg-gray-700/50'}`}>
              {availableUpgrades}
            </span>
          </div>
        </button>
        <button
          onClick={() => setSelectedTab('challenges')}
          className={`relative flex-1 min-w-fit px-4 py-3 font-bold transition-all duration-300 ${
            selectedTab === 'challenges' 
              ? 'bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/30' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {selectedTab === 'challenges' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          )}
          <div className="relative z-10 flex items-center justify-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span className="text-xs">Challenges</span>
            <span className={`text-[10px] px-1 py-0.5 rounded-full ${selectedTab === 'challenges' ? 'bg-white/20' : 'bg-gray-700/50'}`}>
              {activeChallenges}
            </span>
          </div>
        </button>
        <button
          onClick={() => setSelectedTab('achievements')}
          className={`relative flex-1 min-w-fit px-4 py-3 font-bold transition-all duration-300 ${
            selectedTab === 'achievements' 
              ? 'bg-gradient-to-br from-yellow-600 to-amber-600 text-white shadow-lg shadow-yellow-500/30' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {selectedTab === 'achievements' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          )}
          <div className="relative z-10 flex items-center justify-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span className="text-xs">Achievements</span>
            <span className={`text-[10px] px-1 py-0.5 rounded-full ${selectedTab === 'achievements' ? 'bg-white/20' : 'bg-gray-700/50'}`}>
              {unlockedAchievements}
            </span>
          </div>
        </button>
        <button
          onClick={() => setSelectedTab('prestige')}
          className={`relative flex-1 min-w-fit px-4 py-3 font-bold transition-all duration-300 ${
            selectedTab === 'prestige' 
              ? 'bg-gradient-to-br from-pink-600 to-purple-700 text-white shadow-lg shadow-pink-500/30' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {selectedTab === 'prestige' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          )}
          <div className="relative z-10 flex items-center justify-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-xs">Prestige</span>
            {canPrestige && (
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            )}
          </div>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        {selectedTab === 'buildings' ? (
          <div className="grid grid-cols-2 gap-3 max-w-5xl mx-auto">
            {Object.entries(buildings).map(([key, building]) => {
              if (!building.unlocked) return null;

              const production = getBuildingProduction(key, building);

              return (
                <BuildingCard
                  key={key}
                  buildingKey={key}
                  building={building}
                  production={production}
                  money={money}
                  onBuyBuilding={onBuyBuilding}
                />
              );
            })}
          </div>
        ) : selectedTab === 'upgrades' ? (
          <div className="grid grid-cols-3 gap-3 max-w-6xl mx-auto">
            {Object.entries(upgrades).map(([key, upgrade]) => {
              if (upgrade.owned) return null;

              return (
                <UpgradeCard
                  key={key}
                  upgradeKey={key}
                  upgrade={upgrade}
                  money={money}
                  totalClicks={totalClicks}
                  buildings={buildings}
                  onBuyUpgrade={onBuyUpgrade}
                />
              );
            })}
          </div>
        ) : selectedTab === 'challenges' ? (
          <div className="grid grid-cols-2 gap-3 max-w-5xl mx-auto">
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : selectedTab === 'achievements' ? (
          <div className="grid grid-cols-4 gap-3 max-w-6xl mx-auto">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        ) : selectedTab === 'prestige' ? (
          <div className="max-w-2xl mx-auto w-full">
            <PrestigePanel
              totalEarned={totalEarned}
              prestigeLevel={prestigeLevel}
              prestigeTokens={prestigeTokens}
              prestigeMultiplier={prestigeMultiplier}
              canPrestige={canPrestige}
              onPrestige={onPrestige}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}