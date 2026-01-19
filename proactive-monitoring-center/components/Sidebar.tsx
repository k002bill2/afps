
import React from 'react';
import { NAV_ITEMS, QUICK_MENUS, FAVORITE_MENUS, UPCOMING_TASKS } from '../constants';
import { Icon } from '../utils/icons';

const Sidebar: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-slate-700/50 shrink-0">
        <div className="flex items-center justify-center">
          <img src="logo_white.svg" alt="농식품모태펀드" className="h-8" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-2 border-b border-slate-700/50 shrink-0">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 px-1">퀵메뉴</p>
        <div className="grid grid-cols-3 gap-1">
          {QUICK_MENUS.map((menu) => (
            <button
              key={menu.id}
              className="flex flex-col items-center gap-0.5 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700 transition-all group"
            >
              <Icon name={menu.icon} size={16} className="text-slate-400 group-hover:text-emerald-400 transition-colors" />
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">
                {menu.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-2 min-h-0 overflow-y-auto">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 px-1">메뉴</p>
        <ul className="space-y-0.5">
          {NAV_ITEMS.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center justify-between px-2 py-2 rounded-lg transition-all ${
                  item.isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border-l-2 border-emerald-500'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon name={item.icon} size={16} className="" />
                  <span className="text-xs font-semibold">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-black rounded-full">
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Favorites */}
      <div className="p-2 border-t border-slate-700/50 shrink-0">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 px-1">즐겨찾기</p>
        <ul className="space-y-0.5">
          {FAVORITE_MENUS.slice(0, 3).map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center gap-2 px-2 py-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
              >
                <Icon name={item.icon} size={16} className="" />
                <span className="text-[11px] font-medium">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Upcoming Tasks - Compact */}
      <div className="p-2 border-t border-slate-700/50 shrink-0">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 px-1">예정 업무</p>
        <div className="space-y-1">
          {UPCOMING_TASKS.slice(0, 2).map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between px-2 py-2 bg-slate-800/50 rounded-lg"
            >
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  task.priority === 'high' ? 'bg-red-500' :
                  task.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-500'
                }`}></span>
                <span className="text-[11px] text-slate-300 font-medium truncate">{task.title}</span>
              </div>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded shrink-0 ml-1 ${
                task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                task.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700 text-slate-400'
              }`}>
                {task.dueDate}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* User Profile - Compact */}
      <div className="p-2 border-t border-slate-700/50 shrink-0">
        <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs shrink-0">
            김
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-white truncate">김관리 매니저</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] text-slate-400 font-medium">운용부서</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
