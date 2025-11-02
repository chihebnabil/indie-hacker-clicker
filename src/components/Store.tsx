import { Rocket, Sparkles } from 'lucide-react';
import type { Buildings, Upgrades } from '../types/game';
import BuildingCard from './BuildingCard';
import UpgradeCard from './UpgradeCard';

interface StoreProps {
  selectedTab: 'buildings' | 'upgrades';
  setSelectedTab: (tab: 'buildings' | 'upgrades') => void;
  buildings: Buildings;
  upgrades: Upgrades;
  money: number;
  totalClicks: number;
  totalBuildings: number;
  availableUpgrades: number;
  onBuyBuilding: (key: string) => void;
  onBuyUpgrade: (key: string) => void;
  getBuildingProduction: (key: string, building: Buildings[string]) => number;
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
  getBuildingProduction
}: StoreProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-900/30 via-slate-800/20 to-slate-900/30">
      {/* Tabs */}
      <div className="flex-none flex bg-slate-900/50 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <button
          onClick={() => setSelectedTab('buildings')}
          className={`relative flex-1 px-6 py-3 font-bold transition-all duration-300 ${
            selectedTab === 'buildings' 
              ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {selectedTab === 'buildings' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          )}
          <div className="relative z-10 flex items-center justify-center gap-2">
            <Rocket className="w-4 h-4" />
            <span className="text-sm">Buildings</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedTab === 'buildings' ? 'bg-white/20' : 'bg-gray-700/50'}`}>
              {totalBuildings}
            </span>
          </div>
        </button>
        <button
          onClick={() => setSelectedTab('upgrades')}
          className={`relative flex-1 px-6 py-3 font-bold transition-all duration-300 ${
            selectedTab === 'upgrades' 
              ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {selectedTab === 'upgrades' && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          )}
          <div className="relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Upgrades</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedTab === 'upgrades' ? 'bg-white/20' : 'bg-gray-700/50'}`}>
              {availableUpgrades}
            </span>
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
        ) : (
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
        )}
      </div>
    </div>
  );
}