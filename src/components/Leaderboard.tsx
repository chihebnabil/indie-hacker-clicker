import { Trophy, Medal, Award, TrendingUp, ExternalLink } from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { formatNumber } from '../utils/gameUtils';

export default function Leaderboard() {
  const leaderboard = useQuery(api.gameState.getLeaderboard, { limit: 10 });

  if (!leaderboard) {
    return (
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border-2 border-yellow-500/30 rounded-xl p-6">
        <div className="text-center text-gray-400">Loading leaderboard...</div>
      </div>
    );
  }

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <Award className="w-5 h-5 text-gray-500" />;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500/20 to-amber-600/20 border-yellow-500/40';
    if (rank === 2) return 'from-gray-400/20 to-gray-500/20 border-gray-400/40';
    if (rank === 3) return 'from-amber-600/20 to-orange-600/20 border-amber-600/40';
    return 'from-slate-700/20 to-slate-800/20 border-slate-600/30';
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border-2 border-yellow-500/30 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
            Global Leaderboard
          </h3>
          <p className="text-xs text-gray-400">Top Indie Hackers</p>
        </div>
      </div>

      <div className="space-y-2">
        {leaderboard.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No players yet. Be the first! 🚀
          </div>
        ) : (
          leaderboard.map((player) => (
            <div
              key={player.rank}
              className={`bg-gradient-to-r ${getRankColor(player.rank)} backdrop-blur-sm border rounded-lg p-4 transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-4">
                {/* Rank Icon */}
                <div className="flex-shrink-0">
                  {getRankIcon(player.rank)}
                </div>

                {/* Rank Number */}
                <div className="flex-shrink-0 w-8 text-center">
                  <span className="text-xl font-black text-gray-300">
                    #{player.rank}
                  </span>
                </div>

                {/* Username & Project */}
                <div className="flex-1 min-w-0">
                  <div className="text-lg font-bold text-white truncate">
                    {player.username}
                  </div>
                  {player.projectName && player.projectUrl ? (
                    <a
                      href={player.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors group mb-1"
                    >
                      <span className="truncate">🚀 {player.projectName}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : null}
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      Level {player.prestigeLevel}
                    </span>
                    <span>•</span>
                    <span>{player.prestigeTokens} tokens</span>
                    <span>•</span>
                    <span>{player.bestCombo}x best combo</span>
                  </div>
                </div>

                {/* Total Earned */}
                <div className="flex-shrink-0 text-right">
                  <div className="text-lg font-black text-emerald-400">
                    ${formatNumber(player.totalEarned)}
                  </div>
                  <div className="text-xs text-gray-500">lifetime</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
