
import React from 'react';
import { NAV_ITEMS } from '../constants';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-background-border flex flex-col bg-background p-4 shrink-0 h-full">
      <div className="flex items-center gap-3 mb-6 px-2">
        <span className="material-symbols-outlined text-brand-500 text-sm">star</span>
        <h3 className="text-slate-600 font-bold uppercase text-[11px] tracking-widest">Pinned Favorites</h3>
      </div>

      <nav className="flex flex-col gap-1.5 flex-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
              item.isActive
                ? 'bg-brand-500/10 text-brand-500'
                : 'text-slate-500 hover:bg-background-card hover:text-slate-800'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="text-[13px] font-semibold">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto p-5 rounded-2xl border border-background-border bg-background-card shadow-sm">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fund Health</p>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold text-slate-800">$1.2B</span>
          <span className="text-xs font-bold text-emerald-600 flex items-center mb-1 gap-1">
            <span className="material-symbols-outlined text-sm">trending_up</span> 2%
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
