
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-background-border bg-background">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-brand-500/10 rounded-lg">
            <span className="material-symbols-outlined text-brand-500 text-xl font-bold">account_balance_wallet</span>
          </div>
          <h2 className="text-slate-800 text-lg font-bold tracking-tight">V3 Fund Dashboard</h2>
        </div>

        <button className="hidden lg:flex items-center gap-3 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/10">
          <span className="material-symbols-outlined text-[20px]">campaign</span>
          <span className="text-sm font-semibold">Notice: 3 New Investment Alerts from Management Firms</span>
        </button>
      </div>

      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-brand-500 text-sm font-semibold underline underline-offset-8 decoration-2">Dashboard</a>
          <a href="#" className="text-slate-500 text-sm font-medium hover:text-slate-800 transition-colors">Analytics</a>
          <a href="#" className="text-slate-500 text-sm font-medium hover:text-slate-800 transition-colors">Reports</a>
        </nav>

        <div className="flex items-center gap-2 border-l border-background-border pl-6">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-background-card text-slate-600 hover:bg-brand-500/10 hover:text-brand-500 transition-all border border-background-border">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-background-card text-slate-600 hover:bg-brand-500/10 hover:text-brand-500 transition-all border border-background-border">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="ml-2 w-10 h-10 rounded-full border-2 border-brand-500 overflow-hidden cursor-pointer shadow-lg shadow-brand-500/20">
            <img src="https://picsum.photos/100/100?random=1" alt="User" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
