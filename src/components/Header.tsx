import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wifi, 
  WifiOff, 
  Zap, 
  Globe, 
  Type, 
  ShieldCheck, 
  PhoneCall, 
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    dataSaver, 
    setDataSaver, 
    simulatedOffline, 
    setSimulatedOffline, 
    isEffectiveOnline,
    fontSize,
    setFontSize,
    setActiveTab,
    t 
  } = useApp();

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro-bar for Government branding & Accessibility */}
      <div className="bg-slate-900 text-white px-3 py-1 text-xs flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium tracking-wide">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{t.officialPortal}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Font size switcher */}
          <div className="flex items-center bg-slate-800 rounded px-1 py-0.5 text-[11px] gap-1">
            <Type className="w-3 h-3 text-slate-400" />
            <button 
              onClick={() => setFontSize('normal')}
              className={`px-1 rounded ${fontSize === 'normal' ? 'bg-blue-600 font-bold text-white' : 'text-slate-300'}`}
              title="Normal Text"
            >
              A
            </button>
            <button 
              onClick={() => setFontSize('large')}
              className={`px-1 rounded ${fontSize === 'large' ? 'bg-blue-600 font-bold text-white' : 'text-slate-300'}`}
              title="Large Text"
            >
              A+
            </button>
            <button 
              onClick={() => setFontSize('xlarge')}
              className={`px-1 rounded ${fontSize === 'xlarge' ? 'bg-blue-600 font-bold text-white' : 'text-slate-300'}`}
              title="Extra Large Text"
            >
              A++
            </button>
          </div>

          {/* Emergency helpline link */}
          <button 
            onClick={() => setActiveTab('help')}
            className="flex items-center gap-1 text-amber-300 hover:text-amber-200 font-semibold transition-colors"
          >
            <PhoneCall className="w-3 h-3" />
            <span>1100</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-2.5 flex items-center justify-between gap-2 max-w-4xl mx-auto">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-102 transition-transform">
            <ShieldCheck className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight leading-none">GovMobile</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-800 font-semibold uppercase">TN</span>
            </div>
            <p className="text-xs text-slate-700 leading-tight truncate max-w-[190px] sm:max-w-none">
              {language === 'ta' ? 'அரசு சேவைகள், எளிமையாக்கப்பட்டுள்ளன' : 'Government services, made simple.'}
            </p>
          </div>
        </div>

        {/* Quick controls: Language + Data Saver + Status */}
        <div className="flex items-center gap-2">
          {/* Language toggle pill */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 border border-slate-300/80 text-slate-800 active:scale-95 transition-all shadow-2xs"
            aria-label="Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-blue-700" />
            <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>

          {/* Data Saver Mode Pill */}
          <button
            onClick={() => setDataSaver(!dataSaver)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium border transition-all active:scale-95 ${
              dataSaver 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs' 
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title={dataSaver ? "Data Saver Enabled" : "Enable Data Saver"}
          >
            <Zap className={`w-3.5 h-3.5 ${dataSaver ? 'text-emerald-700 fill-emerald-600' : 'text-slate-400'}`} />
            <span className="hidden xs:inline">{dataSaver ? (language === 'ta' ? 'டேட்டா சேவர்' : 'Data Saver') : 'Saver'}</span>
          </button>

          {/* Network status indicator / toggle button */}
          <button
            onClick={() => setSimulatedOffline(!simulatedOffline)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isEffectiveOnline
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse'
            }`}
            title={isEffectiveOnline ? "Network is Online (Tap to test offline)" : "Offline Mode Active (Tap to go online)"}
          >
            {isEffectiveOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">{t.online}</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-800" />
                <span>{language === 'ta' ? 'ஆஃப்லைன்' : 'Offline'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings info drawer modal if opened */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl p-5 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">App Preferences</h3>
              <button onClick={() => setShowSettingsModal(false)} className="p-1 rounded hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
