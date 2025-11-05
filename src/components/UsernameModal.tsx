import { User, X, Rocket } from 'lucide-react';
import { useState } from 'react';

interface UsernameModalProps {
  currentUsername: string;
  currentProjectName?: string;
  currentProjectUrl?: string;
  onSave: (newUsername: string, projectName?: string, projectUrl?: string) => void;
  onClose: () => void;
}

export default function UsernameModal({ currentUsername, currentProjectName, currentProjectUrl, onSave, onClose }: UsernameModalProps) {
  const [username, setUsername] = useState(currentUsername);
  const [projectName, setProjectName] = useState(currentProjectName || '');
  const [projectUrl, setProjectUrl] = useState(currentProjectUrl || '');

  const handleSave = () => {
    if (username.trim()) {
      onSave(
        username.trim(), 
        projectName.trim() || undefined, 
        projectUrl.trim() || undefined
      );
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-blue-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-black text-white">Change Username</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Inputs */}
        <div className="mb-6 space-y-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Enter your username"
              autoFocus
              maxLength={20}
            />
            <p className="text-xs text-gray-500 mt-1">
              This will appear on the leaderboard (max 20 characters)
            </p>
          </div>

          {/* Project Info Section */}
          <div className="border-t border-slate-700 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Rocket className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-purple-400">Promote Your Project (Optional)</h3>
            </div>
            
            <div className="space-y-3">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="e.g. My Awesome SaaS"
                  maxLength={30}
                />
              </div>

              {/* Project URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Project URL
                </label>
                <input
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="https://your-project.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  🚀 Promote your indie project on the leaderboard!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!username.trim()}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/30"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
