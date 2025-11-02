import { Code, Mouse, Building2, Sparkles } from 'lucide-react';
import { formatNumber } from '../utils/gameUtils';

interface ClickerAreaProps {
  frenzyMode: boolean;
  onBigClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  totalClicks: number;
  totalBuildings: number;
  ownedUpgrades: number;
  comboMultiplier: number;
}

export default function ClickerArea({ 
  frenzyMode, 
  onBigClick, 
  totalClicks, 
  totalBuildings, 
  ownedUpgrades,
  comboMultiplier
}: ClickerAreaProps) {
  const getComboGradient = () => {
    if (comboMultiplier >= 10) return 'from-red-500 via-orange-500 to-yellow-500';
    if (comboMultiplier >= 5) return 'from-orange-500 via-yellow-500 to-amber-500';
    if (comboMultiplier >= 3) return 'from-yellow-500 via-amber-500 to-orange-400';
    if (comboMultiplier >= 2) return 'from-blue-400 via-cyan-500 to-blue-500';
    return 'from-blue-500 via-purple-600 to-pink-600';
  };
  
  const getComboShadow = () => {
    if (comboMultiplier >= 10) return 'shadow-red-500/50';
    if (comboMultiplier >= 5) return 'shadow-orange-500/50';
    if (comboMultiplier >= 3) return 'shadow-yellow-500/50';
    if (comboMultiplier >= 2) return 'shadow-cyan-500/50';
    return 'shadow-purple-500/50';
  };
  return (
    <div className="w-1/3 flex flex-col items-center justify-center p-6 border-r border-white/10 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <button
          onClick={onBigClick}
          className={`relative group bg-gradient-to-br ${frenzyMode ? 'from-red-500 via-orange-500 to-yellow-500 animate-pulse shadow-orange-500/50' : getComboGradient()} ${frenzyMode ? 'shadow-2xl shadow-orange-500/50' : `shadow-2xl ${getComboShadow()}`} hover:scale-110 active:scale-90 rounded-full p-16 transition-all duration-200 overflow-hidden ${comboMultiplier >= 5 ? 'animate-pulse' : ''}`}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          
          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-spin-slow"></div>
          <div className="absolute inset-4 rounded-full border-2 border-white/10 animate-spin-slower"></div>
          
          <Code className="w-24 h-24 text-white drop-shadow-2xl relative z-10 group-hover:rotate-12 transition-transform" />
          
          {/* Pulse rings */}
          <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping-slow"></div>
        </button>
        
        <div className="mt-6 text-center space-y-2">
          <div className="text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
            SHIP CODE
          </div>
          <div className="text-xs text-gray-400 font-medium">Click to Build Your Empire</div>
          
          <div className="grid grid-cols-3 gap-2 text-sm mt-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3 hover:border-blue-400/40 transition-all shadow-lg hover:shadow-blue-500/20">
              <Mouse className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <div className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide mb-0.5">Clicks</div>
              <div className="font-black text-sm text-blue-300">{formatNumber(totalClicks)}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 hover:border-purple-400/40 transition-all shadow-lg hover:shadow-purple-500/20">
              <Building2 className="w-4 h-4 text-purple-400 mx-auto mb-1" />
              <div className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide mb-0.5">Buildings</div>
              <div className="font-black text-sm text-purple-300">{totalBuildings}</div>
            </div>
            <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 backdrop-blur-sm border border-pink-500/20 rounded-lg p-3 hover:border-pink-400/40 transition-all shadow-lg hover:shadow-pink-500/20">
              <Sparkles className="w-4 h-4 text-pink-400 mx-auto mb-1" />
              <div className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide mb-0.5">Upgrades</div>
              <div className="font-black text-sm text-pink-300">{ownedUpgrades}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}