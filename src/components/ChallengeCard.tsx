import { Trophy, Award } from 'lucide-react';
import type { Challenge } from '../types/challenges';
import { formatNumber } from '../utils/gameUtils';

interface ChallengeCardProps {
  challenge: Challenge;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progressPercentage = Math.min((challenge.progress / challenge.goal) * 100, 100);
  const isCompleted = challenge.completed;

  const getTierColor = () => {
    if (isCompleted) return 'from-yellow-500/30 to-amber-500/30 border-yellow-400/50';
    return 'from-slate-800/50 to-slate-900/50 border-slate-700/30';
  };

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${getTierColor()} backdrop-blur-sm border-2 rounded-lg p-3 transition-all duration-300`}>
      {isCompleted && (
        <div className="absolute top-2 right-2 z-10">
          <Trophy className="w-5 h-5 text-yellow-400" fill="currentColor" />
        </div>
      )}
      
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className={`text-3xl p-2 rounded-lg ${isCompleted ? 'bg-yellow-500/20' : 'bg-slate-800/50'} transition-all`}>
            {challenge.icon}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="font-bold text-sm text-white mb-0.5">{challenge.name}</div>
          <div className="text-[10px] text-gray-300 mb-2">{challenge.description}</div>
          
          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-slate-900/50 rounded-full overflow-hidden mb-2">
            <div 
              className={`absolute inset-y-0 left-0 ${isCompleted ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-gradient-to-r from-blue-500 to-purple-600'} transition-all duration-500 rounded-full`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-[10px]">
            <span className={`font-bold ${isCompleted ? 'text-yellow-400' : 'text-gray-400'}`}>
              {formatNumber(challenge.progress)} / {formatNumber(challenge.goal)}
            </span>
            {isCompleted ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Award className="w-3 h-3" />
                Completed!
              </span>
            ) : (
              <span className="text-blue-400 font-bold">
                Reward: {challenge.reward}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}