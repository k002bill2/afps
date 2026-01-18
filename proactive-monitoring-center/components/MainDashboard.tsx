
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, PieChart, BarChart3, LineChart, Trophy, Table2 } from 'lucide-react';
import { METRICS, TOP_PERFORMERS, PERFORMANCE_DATA, TOP_INVESTMENTS, YEARLY_INVESTMENTS, INVESTMENT_AREAS, FUND_SUMMARY, GRADE_DATA } from '../constants';
import { Icon } from '../utils/icons';

// KPI Card Component
const KPICard: React.FC<{
  label: string;
  value: string | number;
  unit: string;
  change?: string;
  changePositive?: boolean;
  icon: string;
  statusColor: string;
}> = ({ label, value, unit, change, changePositive, icon, statusColor }) => (
  <div className="bg-white border border-slate-200 px-6 py-4 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest mb-1 letter-spacing-[0.5px]">{label}</p>
        <div className="flex items-baseline gap-1">
          <h3 className="text-3xl font-normal text-slate-800">{value}</h3>
          <span className={`text-[16px] font-bold ${statusColor}`}>{unit}</span>
        </div>
        {change && (
          <div className={`mt-1 flex items-center gap-0.5 text-[11px] font-bold ${changePositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {changePositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {change}
          </div>
        )}
      </div>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-slate-50`}>
        <Icon name={icon} size={20} className={statusColor} />
      </div>
    </div>
  </div>
);

// Mini Donut Chart
const MiniDonut: React.FC<{ percentage: number; color: string }> = ({ percentage, color }) => {
  const data = [
    { value: percentage, color },
    { value: 100 - percentage, color: '#e2e8f0' },
  ];

  return (
    <div className="relative w-24 h-24">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={36} dataKey="value" stroke="none">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-black text-slate-800">{percentage}%</span>
      </div>
    </div>
  );
};

const MainDashboard: React.FC = () => {
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-4 gap-2 shrink-0">
        {METRICS.map((metric, index) => (
          <KPICard key={index} {...metric} />
        ))}
      </div>

      {/* Main Grid - Fills remaining space */}
      <div className="flex-1 grid grid-cols-12 gap-2 min-h-0">
        {/* Left Column - Charts */}
        <div className="col-span-3 flex flex-col gap-2">
          {/* Fund Allocation */}
          <div className="bg-white border border-slate-200 px-3 py-4 rounded-xl">
            <h3 className="text-sm font-bold text-slate-800 my-1 mx-2 flex items-center gap-1">
              <PieChart className="text-emerald-500 mr-1" size={16} />
              펀드 배분 현황
            </h3>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <MiniDonut percentage={FUND_SUMMARY.specialPurpose.percentage} color="#3b82f6" />
                <p className="text-[10px] font-bold text-slate-500 mt-1">특수목적</p>
              </div>
              <div className="text-center">
                <MiniDonut percentage={FUND_SUMMARY.general.percentage} color="#8b5cf6" />
                <p className="text-[10px] font-bold text-slate-500 mt-1">일반</p>
              </div>
            </div>
          </div>

          {/* Investment Areas */}
          <div className="bg-white border border-slate-200 p-3 rounded-xl">
            <h3 className="text-sm font-bold text-slate-800 mb-2 mx-2 flex items-center gap-1">
              <PieChart className="text-blue-500" size={16} />
              투자분야 비율
            </h3>
            <div className="space-y-2 px-2 my-4">
              {INVESTMENT_AREAS.map((area, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[11px] text-slate-600">{area.name}</span>
                    <span className="text-[11px] font-bold text-slate-800">{area.percentage}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${area.percentage}%`, backgroundColor: area.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grade Trends - Simplified bar */}
          <div className="bg-white border border-slate-200 px-3 py-4 rounded-xl">
            <h3 className="text-sm font-bold text-slate-800 my-1 mx-2 flex items-center gap-1">
              <BarChart3 className="text-amber-500" size={16} />
              종합등급 변동
            </h3>
            <div className="space-y-1 px-2 my-4">
              {GRADE_DATA.slice(0, 4).map((item) => (
                <div key={item.year} className="flex items-center gap-1">
                  <span className="text-[12px] text-slate-400 w-8">{item.year}</span>
                  <div className="flex-1 h-2.5 bg-slate-100 rounded overflow-hidden flex">
                    <div className="bg-emerald-500" style={{ width: `${item.normal / 2.5}%` }}></div>
                    <div className="bg-amber-500" style={{ width: `${item.caution / 2.5}%` }}></div>
                    <div className="bg-red-500" style={{ width: `${item.warning / 2.5}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column - Tables */}
        <div className="col-span-9 flex flex-col gap-2">
          {/* Performance Grade Distribution */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-2.5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                <LineChart className="text-emerald-500" size={16} />
                연도별 운용 등급 추이
              </h3>
              <div className="flex gap-3">
                <span className="flex items-center gap-1 text-[11px] text-slate-500"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> 정상</span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 주의</span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500"><span className="w-2 h-2 rounded-full bg-red-500"></span> 경고</span>
              </div>
            </div>
            <div className="px-5 py-4 space-y-2">
              {PERFORMANCE_DATA.slice(0, 4).map((item) => (
                <div key={item.year} className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-slate-500 w-10">{item.year}</span>
                  <div className="flex-1 h-2 flex rounded overflow-hidden bg-slate-100">
                    <div className="bg-emerald-500" style={{ width: `${item.normal}%` }}></div>
                    <div className="bg-amber-500" style={{ width: `${item.caution}%` }}></div>
                    <div className="bg-red-500" style={{ width: `${item.warning}%` }}></div>
                  </div>
                  <div className="flex gap-3 text-[12px] font-bold w-28 justify-end">
                    <span className="text-emerald-600">{item.normal}%</span>
                    <span className="text-amber-600">{item.caution}%</span>
                    <span className="text-red-600">{item.warning}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Tables Side by Side */}
          <div className="grid grid-cols-2 gap-2">
            {/* Top Operators */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                  <Trophy className="text-blue-500" size={16} />
                  TOP 10 운용사
                </h3>
              </div>
              <div className="overflow-auto max-h-[220px] p-3">
                <table className="w-full text-[12px]">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      <th className="px-2 py-1.5 text-left font-bold text-slate-600">#</th>
                      <th className="px-2 py-1.5 text-left font-bold text-slate-600">운용사</th>
                      <th className="px-2 py-1.5 text-right font-bold text-slate-600">AUM</th>
                      <th className="px-2 py-1.5 text-right font-bold text-slate-600">변동</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {TOP_PERFORMERS.map((row) => (
                      <tr key={row.rank} className="hover:bg-blue-50/50">
                        <td className="px-2 py-1.5 font-bold text-blue-600">{row.rank}</td>
                        <td className="px-2 py-1.5 text-slate-700">{row.operator}</td>
                        <td className="px-2 py-1.5 text-right text-slate-600">{row.aum}</td>
                        <td className={`px-2 py-1.5 text-right font-bold ${row.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>{row.change}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Investments */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                  <TrendingUp className="text-purple-500" size={16} />
                  TOP 10 투자종목
                </h3>
              </div>
              <div className="overflow-auto max-h-[220px] p-3">
                <table className="w-full text-[12px]">
                  <thead className="bg-slate-50 sticky top-0">
                    <tr>
                      <th className="px-2 py-1.5 text-left font-bold text-slate-600">#</th>
                      <th className="px-2 py-1.5 text-left font-bold text-slate-600">자펀드</th>
                      <th className="px-2 py-1.5 text-left font-bold text-slate-600">투자분야</th>
                      <th className="px-2 py-1.5 text-right font-bold text-slate-600">금액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {TOP_INVESTMENTS.slice(0, 10).map((row) => (
                      <tr key={row.rank} className="hover:bg-purple-50/50">
                        <td className="px-2 py-1.5 font-bold text-purple-600">{String(row.rank).padStart(2, '0')}</td>
                        <td className="px-2 py-1.5 text-slate-700">{row.fundName}</td>
                        <td className="px-2 py-1.5 text-slate-500 truncate max-w-[60px]">{row.investArea}</td>
                        <td className="px-2 py-1.5 text-right text-slate-600">{row.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Yearly Investment Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex-1">
            <div className="p-2.5 border-b border-slate-100 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                <Table2 className="text-amber-500" size={16} />
                연도별 투자현황 <span className="font-normal text-xs text-slate-400">(단위 : 개, 억원)</span>
              </h3>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-[11px]">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-1.5 text-left font-bold text-slate-600">구분</th>
                    <th className="px-3 py-1.5 text-right font-bold text-slate-600">2020년</th>
                    <th className="px-3 py-1.5 text-right font-bold text-slate-600">2021년</th>
                    <th className="px-3 py-1.5 text-right font-bold text-slate-600">2022년</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {YEARLY_INVESTMENTS.slice(0, 5).map((row, index) => (
                    <tr key={index} className="hover:bg-amber-50/50">
                      <td className="px-3 py-1.5 text-slate-700">{row.category}</td>
                      <td className="px-3 py-1.5 text-right text-slate-600">{row.y2020.toLocaleString()}</td>
                      <td className="px-3 py-1.5 text-right text-slate-600">{row.y2021.toLocaleString()}</td>
                      <td className="px-3 py-1.5 text-right font-bold text-slate-800">{row.y2022.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
