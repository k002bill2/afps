
import React from 'react';
import { Search, Bell, Settings, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100">
      <div className="flex items-center flex-1 max-w-2xl">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 mr-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-slate-100/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-emerald-200 transition-all placeholder:text-slate-400 outline-none" 
            placeholder="투자 상품, 리포트, 가이드를 검색하세요..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4 lg:ml-8">
        <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full transition-all relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-400 rounded-full border-2 border-white"></span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 rounded-full transition-all">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
