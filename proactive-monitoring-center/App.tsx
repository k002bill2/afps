
import React from 'react';
import { Activity, Search, Bell } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';
import AlertPanel from './components/AlertPanel';

const App: React.FC = () => {
  return (
    <div className="flex h-screen w-full bg-slate-100 text-slate-800 overflow-hidden">
      {/* Sidebar - Fixed Width */}
      <div className="hidden lg:block w-56 h-full shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="h-10 px-4 border-b border-slate-200 flex items-center justify-between bg-white shadow-sm z-20 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-emerald-500" size={18} />
              농식품모태펀드 투자자산관리시스템
            </h1>
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[9px] font-bold text-emerald-700">시스템 정상</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg border border-slate-200 w-48">
              <Search className="text-slate-400" size={14} />
              <input type="text" placeholder="검색..." className="bg-transparent text-xs outline-none flex-1 text-slate-700 placeholder:text-slate-400" />
            </div>
            <div className="relative p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
              <Bell className="text-slate-500" size={18} />
              <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-red-500 text-[8px] flex items-center justify-center font-bold text-white rounded-full">4</span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold text-xs">김</div>
          </div>
        </header>

        {/* Main Content - No Scroll */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Dashboard Area */}
          <div className="flex-1 p-3 overflow-hidden">
            <MainDashboard />
          </div>

          {/* Right Side Alert Panel */}
          <div className="hidden xl:block w-72 h-full border-l border-slate-200 shrink-0">
            <AlertPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
