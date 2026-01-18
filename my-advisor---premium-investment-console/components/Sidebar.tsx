
import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Zap, 
  Bell, 
  FileText, 
  HeartHandshake 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navItems = [
    { name: '콘솔 홈', icon: LayoutDashboard, active: true },
    { name: '나의 포트폴리오', icon: Wallet, active: false },
    { name: 'AI 추천 투자', icon: Zap, active: false },
    { name: '투자 알림 현황', icon: Bell, active: false },
    { name: '거래 리포트', icon: FileText, active: false },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300
      lg:relative lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
          <HeartHandshake className="text-emerald-600 w-6 h-6" />
        </div>
        <h1 className="font-bold text-xl text-slate-800 tracking-tight">마이 어드바이저</h1>
      </div>

      <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl mb-6">
          <p className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1">
            <Zap className="w-3 h-3" /> 오늘의 인사이트
          </p>
          <p className="text-[13px] text-emerald-700 leading-relaxed font-medium">
            현재 포트폴리오의 리스크가 낮아졌습니다. 새로운 추천 종목을 확인해보세요.
          </p>
        </div>

        <div className="space-y-1">
          {navItems.map((item) => (
            <a 
              key={item.name}
              href="#" 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium group ${
                item.active 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className="text-sm">{item.name}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="p-6">
        <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 border border-slate-100">
          <img 
            alt="User profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
            src="https://picsum.photos/seed/user123/100/100"
          />
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">김투자 회원님</p>
            <p className="text-[11px] text-slate-500 font-medium">Premium Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
