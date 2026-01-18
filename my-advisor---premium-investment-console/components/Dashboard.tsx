
import React from 'react';
import { TrendingDown, Bell, ArrowRight, Lightbulb, PieChart } from 'lucide-react';
import AssetTable from './AssetTable';
import DonutChart from './DonutChart';
import TrendChart from './TrendChart';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Greetings & Alerts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-slate-900">안녕하세요, 김투자님! 👋</h2>
            <p className="text-slate-500 font-medium">오늘의 투자 전략은 <span className="text-emerald-600">'점진적 자산 배분 확대'</span>입니다.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Bell className="text-rose-400 w-5 h-5" />
                My Investment Alerts
              </h3>
              <button className="text-xs text-slate-400 font-bold hover:text-emerald-600 transition-colors uppercase tracking-wider">전체보기</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-rose-50/50 rounded-2xl border border-rose-100/50 group cursor-pointer hover:bg-rose-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500 mr-4">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">글로벌 테크 펀드</p>
                  <p className="text-[11px] text-slate-500 font-medium">수익률 5% 하락 알림</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 group cursor-pointer hover:bg-emerald-50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-500 mr-4">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">배당금 입금 알림</p>
                  <p className="text-[11px] text-slate-500 font-medium">12,500원 입금 예정</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Total Assets Summary */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl p-8 text-white h-full relative overflow-hidden shadow-lg shadow-emerald-200/50 flex flex-col justify-between">
            <div className="relative z-10">
              <p className="text-emerald-50 font-medium mb-2 opacity-90">총 운용 자산</p>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl lg:text-5xl font-bold">428,500,000</span>
                <span className="text-xl opacity-80 font-medium">원</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-colors">
                  <p className="text-[11px] text-emerald-50 mb-1 font-medium opacity-80">이번 달 수익</p>
                  <p className="text-xl font-bold">+2.4M</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:bg-white/15 transition-colors">
                  <p className="text-[11px] text-emerald-50 mb-1 font-medium opacity-80">전략 등급</p>
                  <p className="text-xl font-bold">Stable+</p>
                </div>
              </div>
            </div>
            {/* Decorative Blurs */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-teal-300/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Portfolio & Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">My Portfolio</h3>
              <p className="text-sm text-slate-400 mt-1 font-medium">현재 자산 구성 및 수익률 현황</p>
            </div>
            <button className="px-5 py-2.5 text-xs font-bold bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all border border-slate-100">상세보기</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5 flex justify-center">
              <DonutChart />
            </div>
            <div className="md:col-span-7 space-y-4 flex flex-col justify-center">
              {[
                { label: '국내 및 해외 주식', color: 'bg-emerald-400', value: '₩ 282.5M', percent: '66%' },
                { label: '채권 및 현금성 자산', color: 'bg-sky-300', value: '₩ 102.8M', percent: '24%' },
                { label: '기타 대안 투자', color: 'bg-amber-300', value: '₩ 43.2M', percent: '10%' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50/50 p-4 rounded-2xl flex items-center justify-between border border-slate-100/50 hover:border-slate-200 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                    <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value} ({item.percent})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recommended Actions</h3>
          <div className="space-y-4">
            <div className="group p-5 bg-sky-50 rounded-2xl border border-sky-100 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-sky-200/50 rounded-xl flex items-center justify-center text-sky-600">
                  <PieChart className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">포트폴리오 리밸런싱</span>
              </div>
              <p className="text-sm font-bold text-slate-800 leading-snug">채권 비중이 낮아졌습니다. 'A등급 우량 채권' 매수를 추천합니다.</p>
              <div className="mt-4 flex items-center text-xs font-bold text-sky-600 group-hover:gap-2 transition-all">
                지금 바로 보기 <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            <div className="group p-5 bg-emerald-50 rounded-2xl border border-emerald-100 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 bg-emerald-200/50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">새로운 기회</span>
              </div>
              <p className="text-sm font-bold text-slate-800 leading-snug">관심 종목인 '신재생 에너지 ETF'가 최적의 매수 타이밍에 진입했습니다.</p>
              <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 group-hover:gap-2 transition-all">
                리포트 확인 <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trend Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900">연간 수익성 트렌드</h3>
            <p className="text-sm text-slate-400 mt-1 font-medium">안정적인 성장을 위해 리스크 관리가 진행 중입니다.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></span> 
              <span className="text-xs text-slate-500 font-bold">목표 수익</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-sky-400 rounded-full"></span> 
              <span className="text-xs text-slate-500 font-bold">현재 실적</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span> 
              <span className="text-xs text-slate-500 font-bold">시장 평균</span>
            </div>
          </div>
        </div>
        <TrendChart />
        <div className="pt-8 mt-8 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">최고 누적 수익</p>
            <p className="text-3xl font-bold text-emerald-500">+18.4%</p>
          </div>
          <div className="text-center md:border-x md:border-slate-50">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">위험 대비 수익 (Sharpe)</p>
            <p className="text-3xl font-bold text-sky-500">1.82</p>
          </div>
          <div className="text-center">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">시장 대비 아웃퍼폼</p>
            <p className="text-3xl font-bold text-emerald-600">+4.2%</p>
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <AssetTable />
    </div>
  );
};

export default Dashboard;
