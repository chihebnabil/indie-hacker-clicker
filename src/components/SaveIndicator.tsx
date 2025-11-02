import { Cloud } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SaveIndicatorProps {
  isSaving: boolean;
}

export default function SaveIndicator({ isSaving }: SaveIndicatorProps) {
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (isSaving) {
      setShowSaved(false);
    } else {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSaving]);

  if (!isSaving && !showSaved) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ${
        isSaving 
          ? 'bg-blue-500/90 backdrop-blur-sm' 
          : 'bg-emerald-500/90 backdrop-blur-sm'
      }`}>
        {isSaving ? (
          <>
            <Cloud className="w-4 h-4 text-white animate-pulse" />
            <span className="text-sm font-bold text-white">Saving...</span>
          </>
        ) : (
          <>
            <Cloud className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">Saved!</span>
          </>
        )}
      </div>
    </div>
  );
}
