import { DollarSign, TrendingUp, MousePointer2, User, Save } from 'lucide-react';
import { formatNumber } from '../utils/gameUtils';

interface HeaderProps {
  money: number;
  moneyPerSecond: number;
  clickPower: number;
  username: string;
  onUsernameClick: () => void;
  onSaveClick?: () => void;
}

export default function Header({ money, moneyPerSecond, clickPower, username, onUsernameClick, onSaveClick }: HeaderProps) {
  return (
    <div className="flex-none bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-slate-900/95 backdrop-blur-xl border-b border-white/20 shadow-2xl p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/50">
            <span className="text-xl">💻</span>
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
              Indie Hacker Clicker
            </h1>
            <a 
              href="https://chiheb.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] text-gray-400 font-medium hover:text-blue-400 transition-colors flex items-center gap-1 group"
            >
              <span>More Indie Projects</span>
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Username Button */}
          <button
            onClick={onUsernameClick}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-600/50 rounded-lg px-4 py-2 shadow-lg hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all group"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
              <div className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                {username}
              </div>
            </div>
          </button>
          
          {/* Save Button */}
          {onSaveClick && (
            <button
              onClick={onSaveClick}
              className="bg-gradient-to-br from-green-600/80 to-emerald-600/80 backdrop-blur-sm border border-green-500/50 rounded-lg px-4 py-2 shadow-lg hover:shadow-green-500/30 hover:border-green-400/50 transition-all group"
            >
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4 text-green-200 group-hover:text-white transition-colors" />
                <div className="text-sm font-bold text-green-100 group-hover:text-white transition-colors">
                  Save
                </div>
              </div>
            </button>
          )}
          
          <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-sm border border-emerald-500/30 rounded-lg px-4 py-2 shadow-lg hover:shadow-emerald-500/20 transition-all">
            <div className="flex items-center gap-1.5 mb-0.5">
              <DollarSign className="w-3 h-3 text-emerald-400" />
              <div className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wide">Balance</div>
            </div>
            <div className="text-lg font-black text-emerald-400">${formatNumber(money)}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-sm border border-blue-500/30 rounded-lg px-4 py-2 shadow-lg hover:shadow-blue-500/20 transition-all">
            <div className="flex items-center gap-1.5 mb-0.5">
              <TrendingUp className="w-3 h-3 text-blue-400" />
              <div className="text-[10px] text-blue-300 font-semibold uppercase tracking-wide">Per Second</div>
            </div>
            <div className="text-lg font-black text-blue-400">${formatNumber(moneyPerSecond)}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm border border-purple-500/30 rounded-lg px-4 py-2 shadow-lg hover:shadow-purple-500/20 transition-all">
            <div className="flex items-center gap-1.5 mb-0.5">
              <MousePointer2 className="w-3 h-3 text-purple-400" />
              <div className="text-[10px] text-purple-300 font-semibold uppercase tracking-wide">Per Click</div>
            </div>
            <div className="text-lg font-black text-purple-400">${formatNumber(clickPower)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}