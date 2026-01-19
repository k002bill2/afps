
import React, { useState } from 'react';
import {
  Activity, FileText, Settings,
  Search, Bell, Menu,
  TrendingUp, TrendingDown, AlertTriangle, Briefcase,
  PieChart, Wallet, Building2,
  Clock, Plus, BookOpen, Calculator, FileCheck, FolderOpen,
  ArrowUpDown
} from 'lucide-react';

// Types
interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
}

interface KPICardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  unit: string;
  change?: string;
  changePositive?: boolean;
  colorClass: string;
}

interface QuickMenuProps {
  icon: React.ElementType;
  label: string;
}

interface TaskProps {
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: string;
}

interface EarlyWarningProps {
  fundName: string;
  operator: string;
  status: string;
  type: 'new' | 'extend' | 'suspend' | 'release';
  timeAgo: string;
}

// Data
const NAV_ITEMS = [
  { label: '투자자산관리', icon: Briefcase, active: true },
  { label: '조기경보', icon: AlertTriangle, badge: 4 },
  { label: '운용사 보고', icon: FileText },
  { label: '회계', icon: Calculator },
  { label: '농식품보고', icon: Building2 },
  { label: '수탁보고', icon: Wallet },
  { label: '관리자', icon: Settings },
];

const QUICK_MENUS = [
  { id: 'invest', label: '투자등록', icon: Plus },
  { id: 'report', label: '보고서', icon: FileText },
  { id: 'warning', label: '경보', icon: AlertTriangle },
  { id: 'eval', label: '평가', icon: Activity },
  { id: 'account', label: '회계', icon: Calculator },
  { id: 'archive', label: '문서', icon: FolderOpen },
];

const METRICS = [
  { label: '모태펀드', value: '692.5', unit: '억원', change: '+22%', changePositive: true, icon: Briefcase, colorClass: 'text-blue-600' },
  { label: '자펀드', value: '2,727', unit: '개', change: '+6%', changePositive: true, icon: PieChart, colorClass: 'text-emerald-600' },
  { label: '운용현황', value: '558', unit: '개사', change: '+12%', changePositive: true, icon: Building2, colorClass: 'text-purple-600' },
  { label: '조기경보', value: '4', unit: '건', icon: AlertTriangle, colorClass: 'text-red-500' },
];

const UPCOMING_TASKS: TaskProps[] = [
  { title: '자펀드 분기보고서 제출', dueDate: 'D-3', priority: 'high', type: '보고' },
  { title: '운용사A 실사 일정', dueDate: 'D-7', priority: 'medium', type: '실사' },
  { title: '투자심의위원회', dueDate: 'D-14', priority: 'low', type: '회의' },
];

const EARLY_WARNINGS: EarlyWarningProps[] = [
  { fundName: '농식품새싹기술벤처일자펀드', operator: '농업정책창업금융원', status: '판매 중단', type: 'new', timeAgo: '2분 전' },
  { fundName: '바멘케이그린바이오', operator: '투멘케이번드투자', status: '연기', type: 'extend', timeAgo: '45분 전' },
  { fundName: '엔에이치나노스농식품투자조합', operator: '나노스투자프린시스', status: '주의환기', type: 'extend', timeAgo: '2시간 전' },
  { fundName: '바멘케이그린바이오 2호', operator: '투멘케이번드투자', status: '연기', type: 'suspend', timeAgo: '3시간 전' },
];

const TOP_OPERATORS = [
  { rank: 1, name: '운용사G', aum: 4135, change: 0.92, isPositive: true },
  { rank: 2, name: '운용사F', aum: 3830, change: -1.24, isPositive: false },
  { rank: 3, name: '운용사H', aum: 3660, change: 8.28, isPositive: true },
  { rank: 4, name: '운용사I', aum: 3385, change: 27.74, isPositive: true },
  { rank: 5, name: '운용사D', aum: 3252, change: -2.23, isPositive: false },
  { rank: 6, name: '운용사A', aum: 3180, change: 5.12, isPositive: true },
  { rank: 7, name: '운용사B', aum: 2945, change: -0.87, isPositive: false },
  { rank: 8, name: '운용사C', aum: 2820, change: 3.45, isPositive: true },
  { rank: 9, name: '운용사E', aum: 2710, change: 1.23, isPositive: true },
  { rank: 10, name: '운용사J', aum: 2590, change: -1.56, isPositive: false },
];

const TOP_INVESTMENTS = [
  { rank: 1, fundName: '자펀드A', area: '농식품종합식품', amount: 5896 },
  { rank: 2, fundName: '자펀드B', area: '그린바이오', amount: 4780 },
  { rank: 3, fundName: '자펀드C', area: '농업축산식품', amount: 4777 },
  { rank: 4, fundName: '자펀드D', area: '아이크로', amount: 4665 },
  { rank: 5, fundName: '자펀드E', area: '농식품벤처자펀드', amount: 4431 },
  { rank: 6, fundName: '자펀드F', area: '스마트팜', amount: 4280 },
  { rank: 7, fundName: '자펀드G', area: '푸드테크', amount: 4125 },
  { rank: 8, fundName: '자펀드H', area: '농생명', amount: 3980 },
  { rank: 9, fundName: '자펀드I', area: '친환경농업', amount: 3845 },
  { rank: 10, fundName: '자펀드J', area: '식품가공', amount: 3720 },
];

const INVESTMENT_AREAS = [
  { name: '소재 및 생산설비', percentage: 61.3, color: 'bg-blue-500' },
  { name: '농림수산 식품유통업', percentage: 4.8, color: 'bg-emerald-500' },
  { name: '농어업', percentage: 23.1, color: 'bg-amber-500' },
  { name: '식품산업', percentage: 10.8, color: 'bg-purple-500' },
];

const FAVORITE_MENUS = [
  { label: '투자등록 신청', icon: Plus },
  { label: '조합 등록/변경 신청', icon: FileCheck },
  { label: '전문인력 확인서 출력', icon: Download },
];

const YEARLY_INVESTMENTS = [
  { category: '결성 예정액', y2020: 9827, y2021: 20828, y2022: 34457 },
  { category: '출자약정액', y2020: 2895, y2021: 8458, y2022: 4115 },
  { category: '자펀드 수', y2020: 64, y2021: 68, y2022: 70 },
];

const NICE_COMPANY_DATA = [
  { rank: 1, companyName: '투자기업A', asset: 150000, debt: 480, capital: 50000, revenue: 2382964, grade: 'AAA', investAmount: 40000 },
  { rank: 2, companyName: '투자기업B', asset: 150000, debt: 480, capital: 50000, revenue: 2382964, grade: 'AAA', investAmount: 40000 },
  { rank: 3, companyName: '투자기업C', asset: 150000, debt: 480, capital: 50000, revenue: 2382964, grade: 'AAA', investAmount: 40000 },
  { rank: 4, companyName: '투자기업D', asset: 150000, debt: 480, capital: 50000, revenue: 2382964, grade: 'AAA', investAmount: 40000 },
  { rank: 5, companyName: '투자기업E', asset: 150000, debt: 480, capital: 50000, revenue: 2382964, grade: 'AAA', investAmount: 40000 },
];

// Components
const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active = false, badge }) => (
  <button className={`flex items-center justify-between w-full px-2 py-1.5 rounded-lg transition-all duration-200 ${
    active
      ? 'bg-emerald-500/10 text-emerald-600 border-l-2 border-emerald-500'
      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
  }`}>
    <div className="flex items-center gap-2">
      <Icon size={16} strokeWidth={active ? 2.5 : 2} />
      <span className="text-xs font-semibold">{label}</span>
    </div>
    {badge && (
      <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">{badge}</span>
    )}
  </button>
);

const QuickMenuButton: React.FC<QuickMenuProps> = ({ icon: Icon, label }) => (
  <button className="flex flex-col items-center gap-1 p-2 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg transition-all group">
    <Icon size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
    <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-700">{label}</span>
  </button>
);

const KPICard: React.FC<KPICardProps> = ({ icon: Icon, label, value, unit, change, changePositive, colorClass }) => (
  <div className="bg-white border border-slate-200 px-8 py-3 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all group cursor-pointer">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-4xl font-normal text-slate-800">{value}</h3>
          <span className={`text-md font-bold ${colorClass}`}>{unit}</span>
        </div>
        {change && (
          <div className={`mt-1 flex items-center gap-0.5 text-[12px] font-bold ${changePositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {changePositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
          </div>
        )}
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-slate-50 group-hover:bg-emerald-50 transition-colors`}>
        <Icon size={28} className={colorClass} />
      </div>
    </div>
  </div>
);

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-56'} flex-shrink-0 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 h-full`}>
        {/* Logo */}
        <div className="p-2 flex items-center justify-center border-b border-slate-200 shrink-0">
          <img src="logo.svg" alt="농식품모태펀드" className="h-8" />
        </div>

        {/* Quick Menu */}
        {!collapsed && (
          <div className="p-2 border-b border-slate-200 shrink-0">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1">퀵메뉴</p>
            <div className="grid grid-cols-3 gap-1">
              {QUICK_MENUS.map((menu) => (
                <QuickMenuButton key={menu.id} icon={menu.icon} label={menu.label} />
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-2 flex flex-col gap-0.5 overflow-y-auto min-h-0">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">
            {collapsed ? '•' : '메뉴'}
          </p>
          {NAV_ITEMS.map((item, idx) => (
            <NavItem key={idx} icon={item.icon} label={item.label} active={item.active} badge={item.badge} />
          ))}
        </nav>

        {/* Favorites */}
        {!collapsed && (
          <div className="p-2 border-t border-slate-200 shrink-0">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">즐겨찾기</p>
            <div className="space-y-0.5">
              {FAVORITE_MENUS.map((item, idx) => (
                <button key={idx} className="flex items-center gap-2 px-2 py-1 w-full text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                  <item.icon size={14} />
                  <span className="text-[12px] font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Header */}
        <header className="h-12 flex-shrink-0 border-b border-slate-200 px-4 flex items-center justify-between bg-white shadow-sm">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1 hover:bg-slate-100 rounded-lg">
              <Menu size={18} className="text-slate-600" />
            </button>
            <h1 className="text-sm font-black text-slate-800 tracking-tight flex items-center gap-2">
              농식품모태펀드 투자관리시스템
            </h1>
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-700">시스템 정상</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input
                type="text"
                placeholder="검색..."
                className="bg-slate-50 border border-slate-200 text-xs rounded-lg pl-7 pr-3 py-1.5 w-40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder:text-slate-400"
              />
            </div>
            <button className="relative p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell size={18} className="text-slate-500" />
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 text-[9px] flex items-center justify-center font-bold text-white rounded-full">4</span>
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                김
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content - No Scroll */}
        <div className="flex-1 p-3 overflow-scroll">
          <div className="h-full flex flex-col gap-2">
            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-2 shrink-0">
              {METRICS.map((metric, idx) => (
                <KPICard key={idx} {...metric} />
              ))}
            </div>

            {/* Main Grid */}
            <div className="flex-1 grid grid-cols-12 gap-2 min-h-0">
              {/* Left Column - Cards */}
              <div className="col-span-3 flex flex-col gap-2">
                {/* Fund Allocation Card */}
                <div className="bg-white border border-slate-200 rounded-xl px-6 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-md font-bold text-slate-800 flex items-center gap-1">
                      <PieChart size={18} className="text-blue-500" />
                      펀드 배분
                    </h3>
                  </div>
                  <div className="flex items-center justify-center mb-2">
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.91549430918954" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.91549430918954" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="82.4 17.6" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-base font-black text-slate-800">82.4%</span>
                        <span className="text-[9px] text-slate-400">특수목적</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-slate-500">특수 82.4%</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                      <span className="text-slate-500">일반 17.6%</span>
                    </span>
                  </div>
                </div>

                {/* Investment Areas Card */}
                <div className="bg-white border border-slate-200 rounded-xl px-6 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text- font-bold text-slate-800 flex items-center gap-1">
                      <Activity size={18} className="text-emerald-500" />
                      투자분야
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {INVESTMENT_AREAS.map((area, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="text-[12px] text-slate-600">{area.name}</span>
                          <span className="text-[12px] font-bold text-slate-800">{area.percentage}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${area.color} rounded-full`} style={{ width: `${area.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Tasks Card */}
                <div className="bg-white border border-slate-200 rounded-xl px-6 py-4 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                      <Clock size={18} className="text-amber-500" />
                      예정 업무
                    </h3>
                  </div>
                  <div className="space-y-1">
                    {UPCOMING_TASKS.map((task, idx) => (
                      <div key={idx} className="flex items-center justify-between p-1.5 bg-slate-50 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${
                            task.priority === 'high' ? 'bg-red-500' :
                            task.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-400'
                          }`}></span>
                          <span className="text-[12px] text-slate-700 font-medium">{task.title}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          task.priority === 'high' ? 'bg-red-100 text-red-600' :
                          task.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
                        }`}>{task.dueDate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Column - Tables */}
              <div className="col-span-6 flex flex-col gap-2">
                {/* Tables Row */}
                <div className="grid grid-cols-2 gap-2 min-h-0 flex-[1]">
                  {/* Top Operators */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                    <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                        <Building2 size={18} className="text-blue-500 mr-2" />
                        TOP 10 운용사
                      </h3>
                    </div>
                    <div className="flex-1 divide-y divide-slate-100 overflow-auto">
                      {TOP_OPERATORS.map((op) => (
                        <div key={op.rank} className="flex items-center justify-between px-2 py-1.5 hover:bg-blue-50 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 ml-4 mr-1 rounded-md bg-blue-100 text-blue-600 text-[10px] font-black flex items-center justify-center">
                              {String(op.rank).padStart(2, '0')}
                            </span>
                            <span className="text-xs font-semibold text-slate-700">{op.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs mr-4 font-bold text-slate-4 font-bold text-slate-800">{op.aum.toLocaleString()}</p>
                            <p className={`text-[10px] mr-4 font-bold ${op.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                              {op.isPositive ? '+' : ''}{op.change}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Investments */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                    <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                        <TrendingUp size={18} className="text-purple-500 mr-2" />
                        TOP 10 투자종목
                      </h3>
                    </div>
                    <div className="flex-1 divide-y divide-slate-100 overflow-auto">
                      {TOP_INVESTMENTS.map((inv) => (
                        <div key={inv.rank} className="flex items-center justify-between px-2 py-1.5 hover:bg-purple-50 transition-colors cursor-pointer">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 ml-4 mr-1 rounded-md bg-purple-100 text-purple-600 text-[10px] font-black flex items-center justify-center">
                              {String(inv.rank).padStart(2, '0')}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-slate-700">{inv.fundName}</p>
                              <p className="text-[10px] text-slate-400">{inv.area}</p>
                            </div>
                          </div>
                          <span className="text-xs mr-4 font-bold text-slate-800">{inv.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Tables Row */}
                <div className="grid grid-cols-2 gap-2 flex-[1] min-h-0">
                  {/* Yearly Investment Table */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                    <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 shrink-0">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                        <Calculator size={18} className="text-amber-500" />
                        연도별 투자현황 <span className="font-normal text-[10px] text-slate-400 ml-1">(단위 : 개, 억원)</span>
                      </h3>
                    </div>
                    <div className="overflow-auto flex-1">
                      <table className="w-full text-[12px]">
                        <thead className="bg-slate-50 sticky top-0">
                          <tr>
                            <th className="px-3 py-1.5 text-left font-bold text-slate-600">구분</th>
                            <th className="px-3 py-1.5 text-right font-bold text-slate-600">2020년</th>
                            <th className="px-3 py-1.5 text-right font-bold text-slate-600">2021년</th>
                            <th className="px-3 py-1.5 text-right font-bold text-slate-600">2022년</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {YEARLY_INVESTMENTS.map((row, index) => (
                            <tr key={index} className="hover:bg-amber-50/50">
                              <td className="px-3 py-1.5 text-slate-700 font-medium">{row.category}</td>
                              <td className="px-3 py-1.5 text-right text-slate-600">{row.y2020.toLocaleString()}</td>
                              <td className="px-3 py-1.5 text-right text-slate-600">{row.y2021.toLocaleString()}</td>
                              <td className="px-3 py-1.5 text-right font-bold text-slate-800">{row.y2022.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* NICE 평가정보 Table */}
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
                    <div className="px-4 py-2 border-b border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                      <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                        NICE평가정보('22) 
                      </h3>
                      <div className="flex items-center gap-1">
                        <button className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="정렬">
                          <ArrowUpDown size={14} />
                        </button>
                        <button className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="overflow-auto flex-1 p-2 space-y-1">
                      <span className="font-normal text-[10px] text-slate-400 ml-1">(단위 : 억원)</span>
                      {NICE_COMPANY_DATA.map((row) => (
                        <div key={row.rank} className="border border-slate-100 rounded-lg p-2 hover:bg-blue-50/50 transition-colors">
                          {/* Row 1: 번호, 투자기업, 등급, 투자금액 */}
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-blue-100 text-blue-600 text-[10px] font-bold flex items-center justify-center">{row.rank}</span>
                              <span className="text-[12px] font-semibold text-slate-800">{row.companyName}</span>
                              <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">{row.grade}</span>
                            </div>
                            <span className="text-[13px] pr-2 font-bold text-slate-800">{row.investAmount.toLocaleString()}</span>
                          </div>
                          {/* Row 2: 자산, 부채, 자본, 매출 */}
                          <div className="flex items-center gap-3 text-[10px] text-slate-500 pl-7">
                            <span>자산 <b className="text-slate-700">{row.asset.toLocaleString()}</b></span>
                            <span>부채 <b className="text-slate-700">{row.debt.toLocaleString()}</b></span>
                            <span>자본 <b className="text-slate-700">{row.capital.toLocaleString()}</b></span>
                            <span>매출 <b className="text-slate-700">{row.revenue.toLocaleString()}</b></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Early Warnings */}
              <div className="col-span-3 flex flex-col">
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden h-full flex flex-col">
                  <div className="p-2 border-b border-slate-100 bg-red-50 flex items-center justify-between shrink-0">
                    <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                      <AlertTriangle size={14} className="text-red-500" />
                      조기경보 현황
                    </h3>
                    <span className="px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center gap-0.5">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      LIVE
                    </span>
                  </div>

                  <div className="flex-1 p-2 space-y-2 overflow-y-auto min-h-0">
                    {EARLY_WARNINGS.map((warning, idx) => (
                      <div key={idx} className={`p-2 rounded-lg border transition-all cursor-pointer hover:shadow-md ${
                        warning.type === 'new' ? 'bg-red-50 border-red-200' :
                        warning.type === 'extend' ? 'bg-amber-50 border-amber-200' :
                        'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-[10px] font-black uppercase ${
                            warning.type === 'new' ? 'text-red-600' :
                            warning.type === 'extend' ? 'text-amber-600' : 'text-slate-500'
                          }`}>
                            {warning.type === 'new' ? '신규' : warning.type === 'extend' ? '연장' : warning.type === 'suspend' ? '중단' : '해제'}
                          </span>
                          <span className="text-[10px] text-slate-400">{warning.timeAgo}</span>
                        </div>
                        <h4 className="text-[12px] font-bold text-slate-800 mb-0.5 leading-tight">{warning.fundName}</h4>
                        <p className="text-[10px] text-slate-500 mb-1">{warning.operator}</p>
                        <span className={`inline-block px-1.5 py-0.5 text-[10px] font-bold rounded ${
                          warning.status === '판매 중단' ? 'bg-red-100 text-red-600' :
                          warning.status === '연기' ? 'bg-amber-100 text-amber-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {warning.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-2 border-t border-slate-200 bg-slate-50 shrink-0">
                    <button className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[12px] font-bold transition-all flex items-center justify-center gap-1">
                      <BookOpen size={14} />
                      전체 경보 로그
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="h-8 px-4 border-t border-slate-200 bg-white flex items-center justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-wider shrink-0">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              상태: <span className="text-emerald-600 font-bold">정상</span>
            </span>
            <span className="opacity-70">최종 동기화: {new Date().toLocaleTimeString('ko-KR')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="opacity-70">농식품모태펀드 카드그리드 v3.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
