import { Bell } from 'lucide-react';

interface NotificationProps {
  message: string;
}

export default function Notification({ message }: NotificationProps) {
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-slideDown">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl shadow-2xl shadow-orange-500/50 font-bold border-2 border-orange-300/50 flex items-center gap-2 backdrop-blur-xl animate-bounce">
        <Bell className="w-4 h-4 animate-wiggle" />
        <span className="text-sm">{message}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer rounded-xl"></div>
      </div>
    </div>
  );
}