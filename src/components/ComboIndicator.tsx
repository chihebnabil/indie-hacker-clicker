import { Flame } from 'lucide-react';

interface ComboIndicatorProps {
  comboCount: number;
  comboMultiplier: number;
}

export default function ComboIndicator({ comboCount, comboMultiplier }: ComboIndicatorProps) {
  if (comboCount < 10) return null;

  const getComboColor = () => {
    if (comboMultiplier >= 10) return 'from-red-500 to-orange-500';
    if (comboMultiplier >= 5) return 'from-orange-500 to-yellow-500';
    if (comboMultiplier >= 3) return 'from-yellow-500 to-amber-500';
    return 'from-blue-500 to-cyan-500';
  };

  const getComboText = () => {
    if (comboMultiplier >= 10) return 'MEGA COMBO!';
    if (comboMultiplier >= 5) return 'SUPER COMBO!';
    if (comboMultiplier >= 3) return 'GREAT COMBO!';
    return 'COMBO!';
  };

  const getFlameCount = () => {
    if (comboMultiplier >= 10) return 3;
    if (comboMultiplier >= 5) return 2;
    return 1;
  };

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className={`relative bg-gradient-to-r ${getComboColor()} rounded-2xl px-8 py-4 shadow-2xl animate-bounce`}>
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getComboColor()} rounded-2xl blur-xl opacity-50 animate-pulse`}></div>
        
        <div className="relative flex items-center gap-4">
          {/* Flames */}
          <div className="flex gap-1">
            {Array.from({ length: getFlameCount() }).map((_, i) => (
              <Flame 
                key={i} 
                className="w-8 h-8 text-white animate-pulse" 
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-black text-white drop-shadow-lg">
              {comboCount}
            </div>
            <div className="text-sm font-bold text-white/90 tracking-wider">
              {getComboText()}
            </div>
          </div>
          
          {/* Multiplier badge */}
          <div className="absolute -top-3 -right-3 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-4 border-yellow-400">
            <span className="text-2xl font-black bg-gradient-to-br from-orange-500 to-red-500 bg-clip-text text-transparent">
              ×{comboMultiplier}
            </span>
          </div>
        </div>
        
        {/* Sparkle particles */}
        {comboMultiplier >= 5 && (
          <>
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-orange-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </>
        )}
      </div>
    </div>
  );
}
