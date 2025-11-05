interface TimeEventBannerProps {
  event: {
    name: string;
    description: string;
    multiplier: number;
    emoji: string;
    color: string;
  };
}

export default function TimeEventBanner({ event }: TimeEventBannerProps) {
  return (
    <div className="pointer-events-none">
      <div className={`bg-gradient-to-r ${event.color} text-white px-6 py-3 rounded-xl shadow-2xl border-2 border-white/50 backdrop-blur-sm`}>
        {/* Solid background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-95 rounded-xl -z-10"></div>
        
        <div className="flex items-center gap-3 relative">
          <span className="text-3xl animate-bounce">{event.emoji}</span>
          <div>
            <div className="text-lg font-bold drop-shadow-lg">{event.name}</div>
            <div className="text-sm font-medium">
              {event.description} • {event.multiplier}x Money!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
