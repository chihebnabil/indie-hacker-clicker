import { TrendingUp } from 'lucide-react';
import type { Buildings } from '../types/game';
import { formatNumber, getCurrentCost } from '../utils/gameUtils';

interface BuildingCardProps {
  buildingKey: string;
  building: Buildings[string];
  production: number;
  money: number;
  onBuyBuilding: (key: string) => void;
}

export default function BuildingCard({ 
  buildingKey, 
  building, 
  production, 
  money, 
  onBuyBuilding 
}: BuildingCardProps) {
  const cost = getCurrentCost(building.baseCost, building.count);
  const canAfford = money >= cost;

  return (
    <button
      onClick={() => canAfford && onBuyBuilding(buildingKey)}
      disabled={!canAfford}
      className={`group relative overflow-hidden ${
        canAfford 
          ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 border-emerald-500/40 hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-[1.02]' 
          : 'bg-gradient-to-br from-slate-900/40 to-slate-950/40 opacity-50 border-slate-700/30'
      } backdrop-blur-sm border-2 rounded-xl p-3 text-left transition-all duration-300 h-full`}
    >
      {/* Shine effect on hover */}
      {canAfford && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      )}
      
      <div className="flex gap-3 h-full relative z-10">
        <div className="flex-shrink-0">
          <div className={`text-4xl p-2 rounded-lg ${canAfford ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 shadow-lg' : 'bg-slate-800/30'} transition-all group-hover:scale-110`}>
            {building.icon}
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="font-bold text-sm text-white">{building.name}</div>
            {building.count > 0 && (
              <div className="text-[10px] bg-blue-500/40 border border-blue-400/40 px-1.5 py-0.5 rounded-full font-bold text-blue-200">
                {building.count}
              </div>
            )}
          </div>
          <div className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
            <TrendingUp className="w-2.5 h-2.5" />
            <span>${formatNumber(building.baseProduction)}/s each</span>
          </div>
          {building.count > 0 && (
            <div className="text-xs text-emerald-400 font-bold mb-2 flex items-center gap-1">
              <span className="text-emerald-500">●</span>
              <span>Total: ${formatNumber(production)}/s</span>
            </div>
          )}
          <div className="mt-auto pt-2 border-t border-white/10">
            <div className={`text-sm font-black flex items-center gap-1.5 ${canAfford ? 'text-emerald-400' : 'text-gray-600'}`}>
              <span className="text-[10px]">Cost:</span>
              <span>${formatNumber(cost)}</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}