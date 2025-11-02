import type { GoldenCookie } from '../types/game';

interface GoldenCookieComponentProps {
  goldenCookie: GoldenCookie;
  onGoldenCookieClick: () => void;
}

export default function GoldenCookieComponent({ goldenCookie, onGoldenCookieClick }: GoldenCookieComponentProps) {
  const getColorClasses = () => {
    switch(goldenCookie.type) {
      case 'bonus':
        return 'from-yellow-400 to-amber-500 shadow-yellow-500/50';
      case 'frenzy':
        return 'from-red-500 to-orange-500 shadow-orange-500/50';
      case 'lucky':
        return 'from-emerald-400 to-green-500 shadow-green-500/50';
    }
  };

  return (
    <button
      onClick={onGoldenCookieClick}
      className="fixed golden-cookie z-40 cursor-pointer transition-all hover:scale-125 active:scale-95 group"
      style={{ left: goldenCookie.x, top: goldenCookie.y }}
    >
      <div className={`relative bg-gradient-to-br ${getColorClasses()} rounded-full p-3 shadow-2xl border-3 border-white/30`}>
        {/* Rotating ring */}
        <div className="absolute inset-0 rounded-full border-3 border-white/40 animate-spin-slow"></div>
        <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin-slower"></div>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping-slow"></div>
        
        {/* Icon */}
        <div className="text-5xl drop-shadow-2xl relative z-10 group-hover:rotate-12 transition-transform">
          {goldenCookie.type === 'bonus' ? '⭐' : goldenCookie.type === 'frenzy' ? '🔥' : '🍀'}
        </div>
        
        {/* Sparkle effects */}
        <div className="absolute -top-1 -right-1 text-lg animate-bounce">✨</div>
        <div className="absolute -bottom-1 -left-1 text-lg animate-bounce" style={{ animationDelay: '0.3s' }}>✨</div>
      </div>
    </button>
  );
}