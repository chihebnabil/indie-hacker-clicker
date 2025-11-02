import { RotateCcw, TrendingUp, Zap } from 'lucide-react';
import { formatNumber } from '../utils/gameUtils';

interface PrestigePanelProps {
  totalEarned: number;
  prestigeLevel: number;
  prestigeTokens: number;
  prestigeMultiplier: number;
  canPrestige: boolean;
  onPrestige: () => void;
}

export default function PrestigePanel({
  totalEarned,
  prestigeLevel,
  prestigeTokens,
  prestigeMultiplier,
  canPrestige,
  onPrestige
}: PrestigePanelProps) {
  const requirement = 1000000000; // $1B
  const progress = Math.min((totalEarned / requirement) * 100, 100);
  const tokensToGain = Math.floor(totalEarned / requirement);

  return (
    <div className="bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-purple-900/30 backdrop-blur-sm border-2 border-purple-500/30 rounded-xl p-4 w-full max-w-full overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
          <RotateCcw className="w-6 h-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
            Prestige System
          </h3>
          <p className="text-xs text-gray-400 truncate">Reset for permanent bonuses</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Current Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Level</div>
            <div className="text-xl font-black text-purple-400">{prestigeLevel}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Tokens</div>
            <div className="text-xl font-black text-pink-400">{prestigeTokens}</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-3 text-center">
            <div className="text-xs text-gray-400 mb-1">Bonus</div>
            <div className="text-xl font-black text-cyan-400">×{prestigeMultiplier.toFixed(1)}</div>
          </div>
        </div>

        {/* Progress to Next Prestige */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-gray-400">Progress to Prestige</span>
            <span className="text-white font-bold">{progress.toFixed(1)}%</span>
          </div>
          <div className="relative w-full h-3 bg-slate-900/50 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1 text-center">
            ${formatNumber(totalEarned)} / ${formatNumber(requirement)}
          </div>
        </div>

        {/* Prestige Benefits */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <span className="text-sm font-bold text-white">Prestige Benefits:</span>
          </div>
          <ul className="text-xs text-gray-300 space-y-1 ml-6">
            <li className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-emerald-400 flex-shrink-0" />
              <span className="break-words">+{tokensToGain} Prestige Token{tokensToGain !== 1 ? 's' : ''}</span>
            </li>
            <li className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-emerald-400 flex-shrink-0" />
              <span className="break-words">+10% per token (permanent)</span>
            </li>
            <li className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-emerald-400 flex-shrink-0" />
              <span className="break-words">Keep all achievements</span>
            </li>
          </ul>
        </div>

        {/* Prestige Button */}
        <button
          onClick={onPrestige}
          disabled={!canPrestige}
          className={`w-full py-3 rounded-lg font-black text-sm transition-all duration-300 ${
            canPrestige
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105'
              : 'bg-slate-800/50 text-gray-600 cursor-not-allowed opacity-50'
          }`}
        >
          {canPrestige ? (
            <span className="flex items-center justify-center gap-2">
              <RotateCcw className="w-5 h-5" />
              Prestige Now
            </span>
          ) : (
            `Need $${formatNumber(requirement - totalEarned)} more`
          )}
        </button>
      </div>
    </div>
  );
}