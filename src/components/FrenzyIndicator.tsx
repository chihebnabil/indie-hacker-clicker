import { Zap } from 'lucide-react';

interface FrenzyIndicatorProps {
  frenzyTimer: number;
}

export default function FrenzyIndicator({ frenzyTimer }: FrenzyIndicatorProps) {
  return (
    <div className="pointer-events-none animate-slideDown">
      <div className="relative bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white px-5 py-2.5 rounded-xl shadow-2xl shadow-orange-500/60 font-black text-lg border-2 border-yellow-300/50 flex items-center gap-2 animate-pulse">
        <Zap className="w-5 h-5 animate-bounce text-yellow-200" fill="currentColor" />
        <div className="flex items-center gap-1.5">
          <span className="text-yellow-100 text-sm">FRENZY</span>
          <span className="text-xl text-white">×7</span>
          <span className="text-yellow-100">-</span>
          <span className="text-white">{frenzyTimer}s</span>
        </div>
        <Zap className="w-5 h-5 animate-bounce text-yellow-200" fill="currentColor" style={{ animationDelay: '0.2s' }} />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute top-0 left-1/4 w-1.5 h-1.5 bg-yellow-200 rounded-full animate-ping"></div>
          <div className="absolute top-0 right-1/4 w-1.5 h-1.5 bg-orange-200 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute bottom-0 left-1/3 w-1.5 h-1.5 bg-red-200 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
    </div>
  );
}