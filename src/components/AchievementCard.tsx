import { Award, Lock } from 'lucide-react';
import type { Achievement } from '../types/challenges';

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  const getTierColor = () => {
    if (!achievement.unlocked) return 'from-slate-900/40 to-slate-950/40 border-slate-700/30 opacity-50';
    
    switch (achievement.tier) {
      case 'bronze':
        return 'from-orange-900/40 to-orange-950/40 border-orange-700/50';
      case 'silver':
        return 'from-slate-600/40 to-slate-700/40 border-slate-500/50';
      case 'gold':
        return 'from-yellow-600/40 to-yellow-700/40 border-yellow-500/50';
      case 'platinum':
        return 'from-cyan-600/40 to-cyan-700/40 border-cyan-400/50';
    }
  };

  const getTierGlow = () => {
    if (!achievement.unlocked) return '';
    
    switch (achievement.tier) {
      case 'bronze':
        return 'shadow-orange-500/20';
      case 'silver':
        return 'shadow-slate-500/20';
      case 'gold':
        return 'shadow-yellow-500/30';
      case 'platinum':
        return 'shadow-cyan-500/30';
    }
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${getTierColor()} backdrop-blur-sm border-2 rounded-lg p-3 transition-all duration-300 ${achievement.unlocked ? `hover:scale-105 ${getTierGlow()} shadow-lg` : ''}`}>
      {achievement.unlocked ? (
        <div className="absolute top-2 right-2 z-10">
          <Award className="w-4 h-4 text-yellow-400" fill="currentColor" />
        </div>
      ) : (
        <div className="absolute top-2 right-2 z-10">
          <Lock className="w-4 h-4 text-gray-600" />
        </div>
      )}
      
      <div className="flex flex-col items-center text-center gap-2">
        <div className={`text-4xl p-2 rounded-lg ${achievement.unlocked ? 'bg-white/10' : 'bg-slate-900/50'} transition-all`}>
          {achievement.unlocked ? achievement.icon : '❓'}
        </div>
        
        <div className="flex-1">
          <div className={`font-bold text-sm mb-0.5 ${achievement.unlocked ? 'text-white' : 'text-gray-600'}`}>
            {achievement.unlocked ? achievement.name : '???'}
          </div>
          <div className={`text-[10px] leading-relaxed ${achievement.unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
            {achievement.unlocked ? achievement.description : 'Complete to unlock'}
          </div>
          
          {achievement.unlocked && (
            <div className="mt-2">
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide
                ${achievement.tier === 'bronze' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' : ''}
                ${achievement.tier === 'silver' ? 'bg-slate-500/20 text-slate-300 border border-slate-500/40' : ''}
                ${achievement.tier === 'gold' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' : ''}
                ${achievement.tier === 'platinum' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : ''}
              `}>
                {achievement.tier}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}