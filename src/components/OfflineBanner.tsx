import React from 'react';
import { useApp } from '../context/AppContext';
import { WifiOff, RefreshCw } from 'lucide-react';

export const OfflineBanner: React.FC = () => {
  const { isEffectiveOnline, setSimulatedOffline, t } = useApp();

  if (isEffectiveOnline) return null;

  return (
    <div className="bg-amber-600 text-white px-3.5 py-2 text-xs flex items-center justify-between shadow-xs sticky top-[73px] z-30">
      <div className="flex items-center gap-2 pr-2">
        <WifiOff className="w-4 h-4 shrink-0 text-amber-200 animate-pulse" />
        <p className="leading-snug text-white font-medium">
          <strong className="font-bold">{t.offline}: </strong>
          {t.offlineWarning}
        </p>
      </div>
      <button
        onClick={() => setSimulatedOffline(false)}
        className="shrink-0 bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1 border border-white/30 active:scale-95 transition-all"
      >
        <RefreshCw className="w-3 h-3" />
        <span>Reconnect</span>
      </button>
    </div>
  );
};
