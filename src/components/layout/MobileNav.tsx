import React from 'react';
import { Home, Store, QrCode, ShieldCheck, FileCode2 } from 'lucide-react';
import { ActiveView } from '../../types';

interface MobileNavProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeView, setActiveView }) => {
  const tabs = [
    { id: 'landing' as ActiveView, label: 'Trang chủ', icon: Home },
    { id: 'b2b_portal' as ActiveView, label: 'B2B Sỉ', icon: Store },
    { id: 'b2c_app' as ActiveView, label: 'QR & Ví', icon: QrCode, isCenter: true },
    { id: 'admin_portal' as ActiveView, label: 'Admin', icon: ShieldCheck },
    { id: 'schema_docs' as ActiveView, label: 'Docs/SQL', icon: FileCode2 },
  ];

  return (
    <div id="mobile-bottom-navbar" className="xl:hidden fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl bg-white/80 border-t border-white/60 px-2 py-1.5 shadow-2xl">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeView === tab.id;

          if (tab.isCenter) {
            return (
              <button
                key={tab.id}
                id={`mobile-nav-btn-${tab.id}`}
                onClick={() => setActiveView(tab.id)}
                className="relative -top-3 flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all ${
                  isActive
                    ? 'bg-[#10B981] text-white ring-4 ring-emerald-500/20 scale-105 shadow-emerald-500/30'
                    : 'bg-[#065F46] text-white group-hover:scale-105'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-bold mt-0.5 ${isActive ? 'text-[#065F46]' : 'text-slate-600'}`}>
                  {tab.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              id={`mobile-nav-btn-${tab.id}`}
              onClick={() => setActiveView(tab.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition-all cursor-pointer ${
                isActive ? 'text-[#065F46] font-bold bg-white/60' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#10B981] stroke-[2.5]' : 'stroke-[1.75]'}`} />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
