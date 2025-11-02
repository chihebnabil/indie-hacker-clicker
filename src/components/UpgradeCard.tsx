import { AlertTriangle, Check } from 'lucide-react';
import type { Upgrade, Buildings } from '../types/game';
import { formatNumber } from '../utils/gameUtils';

interface UpgradeCardProps {
  upgradeKey: string;
  upgrade: Upgrade;
  money: number;
  totalClicks: number;
  buildings: Buildings;
  onBuyUpgrade: (key: string) => void;
}

export default function UpgradeCard({ 
  upgradeKey, 
  upgrade, 
  money, 
  totalClicks, 
  buildings, 
  onBuyUpgrade 
}: UpgradeCardProps) {
  const canAfford = money >= upgrade.cost;
  let meetsReq = true;
  let reqText = '';

  if (upgrade.type === 'building' && upgrade.building) {
    const building = buildings[upgrade.building];
    meetsReq = building.count >= (upgrade.req || 0);
    reqText = `Need ${upgrade.req} ${building.name}s`;
  } else if (upgrade.type === 'click') {
    meetsReq = totalClicks >= (upgrade.req || 0);
    reqText = `Need ${upgrade.req} clicks`;
  }

  const isAvailable = canAfford && meetsReq;

  return (
    <button
      onClick={() => onBuyUpgrade(upgradeKey)}
      disabled={!isAvailable}
      className={`group relative overflow-hidden ${
        isAvailable
          ? 'bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-purple-600/30 border-purple-400/50 hover:border-pink-400/70 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30' 
          : 'bg-gradient-to-br from-slate-900/30 to-slate-950/30 opacity-40 border-slate-700/30'
      } backdrop-blur-sm border-2 rounded-lg p-3 text-left transition-all duration-300`}
    >
      {/* Animated gradient background */}
      {isAvailable && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-pink-600/20 to-purple-600/0 animate-shimmer"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </>
      )}
      
      <div className="flex gap-2.5 relative z-10">
        <div className="flex-shrink-0">
          <div className={`text-3xl p-1.5 rounded-lg ${isAvailable ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-lg group-hover:scale-110' : 'bg-slate-800/20'} transition-all`}>
            {upgrade.icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm mb-0.5 text-white flex items-center gap-1.5">
            {upgrade.name}
            {isAvailable && <Check className="w-3 h-3 text-emerald-400" />}
          </div>
          <div className="text-[10px] text-gray-300 mb-2 leading-relaxed">{upgrade.desc}</div>
          
          {!meetsReq && (
            <div className="flex items-center gap-1 text-[10px] text-amber-400 mb-1.5 bg-amber-500/10 border border-amber-500/30 rounded px-1.5 py-0.5">
              <AlertTriangle className="w-2.5 h-2.5" />
              <span>{reqText}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 pt-1.5 border-t border-white/10">
            <div className={`text-sm font-black ${isAvailable ? 'text-emerald-400' : 'text-gray-600'}`}>
              ${formatNumber(upgrade.cost)}
            </div>
            {isAvailable && (
              <div className="ml-auto">
                <span className="text-[9px] bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-1.5 py-0.5 rounded-full font-bold">
                  Available
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}