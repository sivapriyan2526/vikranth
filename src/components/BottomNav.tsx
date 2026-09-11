import React from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';
import { 
  Home, 
  Layers, 
  FolderCheck, 
  SearchCheck, 
  HelpCircle 
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t, applications } = useApp();

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'services', label: t.navServices, icon: Layers },
    { id: 'applications', label: t.navApplications, icon: FolderCheck, badge: applications.length },
    { id: 'status', label: t.navStatus, icon: SearchCheck },
    { id: 'help', label: t.navHelp, icon: HelpCircle }
  ];

  return (
    <nav 
      aria-label="Bottom Navigation" 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 px-1 py-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-2 px-1 min-h-[52px] rounded-xl transition-all duration-150 active:scale-95 ${
                isActive 
                  ? 'text-blue-700 font-bold' 
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <div 
                  className={`p-1 rounded-lg transition-colors ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full min-w-[17px] h-[17px] flex items-center justify-center px-1 border-2 border-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] leading-tight mt-0.5 tracking-tight line-clamp-1 ${isActive ? 'font-bold text-blue-800' : 'text-slate-600 font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-5 h-0.5 bg-blue-700 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
