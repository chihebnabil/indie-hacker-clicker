import { X, Briefcase } from 'lucide-react';
import { useState } from 'react';

interface InvestorPitchProps {
  pitch: {
    title: string;
    message: string;
    outcomes: Array<{
      text: string;
      emoji: string;
      bonus: number;
      message: string;
    }>;
  };
  onChoice: (bonus: number, message: string) => void;
  onClose: () => void;
}

export default function InvestorPitchModal({ pitch, onChoice, onClose }: InvestorPitchProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleChoice = (index: number) => {
    setSelected(index);
    setShowResult(true);
    const outcome = pitch.outcomes[index];
    
    setTimeout(() => {
      onChoice(outcome.bonus, outcome.message);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 border-2 border-purple-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg animate-bounce">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{pitch.title}</h2>
              <p className="text-xs text-gray-400">Random Event!</p>
            </div>
          </div>
          {!showResult && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Message */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 mb-4">
          <p className="text-gray-300 text-sm italic">"{pitch.message}"</p>
        </div>

        {/* Choices */}
        {!showResult ? (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 mb-2">What do you do?</p>
            {pitch.outcomes.map((outcome, index) => (
              <button
                key={index}
                onClick={() => handleChoice(index)}
                className="w-full bg-gradient-to-r from-slate-800 to-slate-700 hover:from-purple-600 hover:to-pink-600 border border-slate-600 hover:border-purple-500 rounded-lg p-4 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl group-hover:scale-125 transition-transform">
                    {outcome.emoji}
                  </span>
                  <span className="text-white font-bold">{outcome.text}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-lg p-6 text-center animate-pulse">
            <p className="text-2xl mb-2">
              {pitch.outcomes[selected!].emoji}
            </p>
            <p className="text-white font-bold mb-2">
              {pitch.outcomes[selected!].message}
            </p>
            <p className="text-emerald-400 text-sm font-black">
              {pitch.outcomes[selected!].bonus}x Multiplier!
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
