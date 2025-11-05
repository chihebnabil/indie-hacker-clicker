import { Quote, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MotivationalQuoteProps {
  quote: string;
  onClose: () => void;
}

export default function MotivationalQuote({ quote, onClose }: MotivationalQuoteProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`max-w-sm transition-all duration-300 pointer-events-auto ${
      show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="bg-gradient-to-br from-blue-900/90 via-purple-900/90 to-pink-900/90 backdrop-blur-xl border-2 border-blue-500/50 rounded-xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Quote className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-bold text-blue-300 mb-1">Indie Hacker Wisdom</h3>
            <p className="text-sm text-white font-medium">{quote}</p>
          </div>
          <button
            onClick={() => {
              setShow(false);
              setTimeout(onClose, 300);
            }}
            className="w-6 h-6 flex-shrink-0 rounded hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
