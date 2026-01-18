
import React from 'react';
import {
  TOP_OPERATORS,
  TOP_INVESTMENTS,
  YEARLY_INVESTMENTS,
  GRADE_DATA,
  FAVORITE_MENUS,
  EARLY_WARNINGS,
  NICE_COMPANY_DATA
} from './constants';

const App: React.FC = () => {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* 사이드바 */}
      <aside className="w-56 bg-slate-800 text-white flex flex-col shrink-0">
        {/* 로고 */}
        <div className="p-3 border-b border-slate-700">
          <div className="flex items-center justify-center">
            <img src="/logo_white.svg" alt="농식품모태펀드" className="h-8" />
          </div>
        </div>

        {/* 검색 */}
        <div className="p-2">
          <div className="flex items-center gap-2 bg-slate-700 rounded px-2 py-1.5">
            <span className="material-symbols-outlined text-slate-400 text-base">search</span>
            <input type="text" placeholder="검색..." className="bg-transparent text-xs outline-none flex-1 placeholder-slate-400" />
          </div>
        </div>

        {/* 즐겨찾기 메뉴 */}
        <div className="px-2 py-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">등록/변경 신청</span>
            <span className="material-symbols-outlined text-slate-400 text-sm cursor-pointer hover:text-white">expand_more</span>
          </div>
          {FAVORITE_MENUS.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors ${
                item.isActive ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* 메인 네비게이션 */}
        <nav className="flex-1 px-2 py-1 overflow-y-auto text-xs">
          {['보고', '운용기관 정보', '항목사 공시', '출자예정관리', '조기경보시스템'].map((section, idx) => (
            <div key={section} className="mb-2">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase">{section}</span>
                <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
              </div>
              {idx === 0 && (
                <div className="space-y-0.5">
                  {['운용기관 정보', '조합정보', '재무정보', '투자자산'].map((item) => (
                    <a key={item} href="#" className="flex items-center gap-1 px-2 py-1.5 rounded text-slate-300 hover:bg-slate-700">
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 헤더 */}
        <header className="h-11 bg-white border-b border-slate-200 px-4 flex items-center justify-between shrink-0">
          <h1 className="text-sm font-bold text-slate-800">농식품모태펀드 투자자산관리시스템</h1>
          <div className="flex items-center gap-3">
            <button className="relative p-1 hover:bg-slate-100 rounded transition-colors">
              <span className="material-symbols-outlined text-slate-600 text-xl">notifications</span>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">4</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
          </div>
        </header>

        {/* 대시보드 컨텐츠 - 스크롤 가능 */}
        <main className="flex-1 p-3 overflow-auto">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-12 gap-2">

            {/* 메인 컬럼 - KPI & 등급변동 & 테이블 */}
            <div className="col-span-8 flex flex-col gap-2 h-full">
              {/* KPI 카드들 */}
              <div className="grid grid-cols-4 gap-2">
                {/* 모태펀드 */}
                <div className="bg-white rounded-lg p-3.5 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-blue-500 text-lg">account_balance</span>
                      <span className="text-s font-bold text-slate-700">모태펀드</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">+22%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div><p className="text-base font-bold text-slate-800">420</p><p className="text-[10px] text-slate-400">결성좌수</p></div>
                    <div><p className="text-base font-bold text-blue-600">692.5</p><p className="text-[10px] text-slate-400">인가약정가</p></div>
                    <div><p className="text-base font-bold text-slate-800">206</p><p className="text-[10px] text-slate-400">미출자약정</p></div>
                  </div>
                </div>

                {/* 자펀드 */}
                <div className="bg-white rounded-lg p-3.5 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-emerald-500 text-lg">savings</span>
                      <span className="text-s font-bold text-slate-700">자펀드</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">+6%</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div><p className="text-base font-bold text-slate-800">70</p><p className="text-[10px] text-slate-400">인가</p></div>
                    <div><p className="text-base font-bold text-emerald-600">11,380</p><p className="text-[10px] text-slate-400">출자(억/개)</p></div>
                    <div><p className="text-base font-bold text-slate-800">2,727</p><p className="text-[10px] text-slate-400">순자산</p></div>
                  </div>
                </div>

                {/* 운용현황 */}
                <div className="bg-white rounded-lg p-3.5 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-purple-500 text-lg">trending_up</span>
                      <span className="text-s font-bold text-slate-700">운용현황</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">+12%</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-center">
                    <div><p className="text-base font-bold text-slate-800">50</p><p className="text-[10px] text-slate-400">인가(억/개)</p></div>
                    <div><p className="text-base font-bold text-purple-600">558</p><p className="text-[10px] text-slate-400">순자산</p></div>
                  </div>
                </div>

                {/* 조기경보 */}
                <div className="bg-white rounded-lg p-3.5 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-red-500 text-lg">warning</span>
                      <span className="text-s font-bold text-slate-700">조기경보</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center">
                    <div><p className="text-base font-bold text-amber-500">4</p><p className="text-[10px] text-slate-400">신규</p></div>
                    <div><p className="text-base font-bold text-blue-500">2</p><p className="text-[10px] text-slate-400">변동(하락)</p></div>
                    <div><p className="text-base font-bold text-red-500">1</p><p className="text-[10px] text-slate-400">변동(상승)</p></div>
                    <div><p className="text-base font-bold text-emerald-500">1</p><p className="text-[10px] text-slate-400">해제</p></div>
                  </div>
                </div>
              </div>

              {/* 종합등급 변동 */}
              <div className="bg-white rounded-lg px-5 py-3 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-s font-bold text-slate-700">종합등급 변동</h3>
                  <div className="flex items-center gap-1">
                    <button className="p-0.5 hover:bg-slate-100 rounded"><span className="material-symbols-outlined text-slate-400 text-sm">chevron_left</span></button>
                    <span className="text-xs font-bold text-slate-600">2020년</span>
                    <button className="p-0.5 hover:bg-slate-100 rounded"><span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-5 h-5 rounded flex items-center justify-center">
                        <span className="material-symbols-outlined text-emerald-500 text-md">check_circle</span>
                      </span>
                      <span className="text-[14px] font-bold text-slate-600">자펀드 등급</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-center text-[11px]">
                      <div><p className="text-xl font-bold text-slate-800">60</p><p className="text-slate-400">정상</p></div>
                      <div><p className="text-xl font-bold text-amber-500">18</p><p className="text-slate-400">주의</p></div>
                      <div><p className="text-xl font-bold text-red-500">0</p><p className="text-slate-400">경고</p></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-5 h-5 rounded flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-500 text-md">verified</span>
                      </span>
                      <span className="text-[14px] font-bold text-slate-600">운용사 등급</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-center text-[11px]">
                      <div><p className="text-xl font-bold text-slate-800">50</p><p className="text-slate-400">정상</p></div>
                      <div><p className="text-xl font-bold text-amber-500">4</p><p className="text-slate-400">주의</p></div>
                      <div><p className="text-xl font-bold text-red-500">1</p><p className="text-slate-400">경고</p></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 10 투자종목 & Top 10 운용사 */}
              <div className="grid grid-cols-2 gap-2">
                {/* Top 10 투자종목 */}
                <div className="bg-white rounded-lg p-5 border border-slate-200 flex flex-col">
                  <div className="flex items-center justify-between mb-1 shrink-0">
                    <h3 className="text-sm font-bold text-slate-700">Top 10 투자종목 <span className="font-normal text-xs text-slate-400">(단위 : 억원)</span></h3>
                    <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded transition-colors">
                      <span className="material-symbols-outlined text-slate-400 text-lg">add</span>
                    </button>
                  </div>
                  <div className="overflow-auto max-h-[280px]">
                    <table className="w-full text-[12px]">
                      <thead className="bg-slate-50 sticky top-0">
                        <tr>
                          <th className="px-2 py-1.5 text-left font-bold text-slate-600">#</th>
                          <th className="px-2 py-1.5 text-left font-bold text-slate-600">자펀드명</th>
                          <th className="px-2 py-1.5 text-left font-bold text-slate-600">투자영역</th>
                          <th className="px-2 py-1.5 text-right font-bold text-slate-600">투자금액</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {TOP_INVESTMENTS.slice(0, 10).map((inv) => (
                          <tr key={inv.rank} className="hover:bg-slate-50">
                            <td className="px-2 py-1.5 text-slate-600">{inv.rank}</td>
                            <td className="px-2 py-1.5 text-slate-800">{inv.fundName}</td>
                            <td className="px-2 py-1.5 text-slate-600 truncate max-w-[60px]">{inv.investArea}</td>
                            <td className="px-2 py-1.5 text-right text-slate-800">{inv.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Top 10 운용사 */}
                <div className="bg-white rounded-lg p-5 border border-slate-200 flex flex-col">
                  <div className="flex items-center justify-between mb-1 shrink-0">
                    <h3 className="text-sm font-bold text-slate-700">Top 10 운용사 <span className="font-normal text-xs text-slate-400">(단위 : 억원)</span></h3>
                    <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded transition-colors">
                      <span className="material-symbols-outlined text-slate-400 text-lg">add</span>
                    </button>
                  </div>
                  <div className="overflow-auto max-h-[280px]">
                    <table className="w-full text-[12px]">
                      <thead className="bg-slate-50 sticky top-0">
                        <tr>
                          <th className="px-2 py-1.5 text-left font-bold text-slate-600">#</th>
                          <th className="px-2 py-1.5 text-left font-bold text-slate-600">종목명</th>
                          <th className="px-2 py-1.5 text-right font-bold text-slate-600">취득금액</th>
                          <th className="px-2 py-1.5 text-right font-bold text-slate-600">등락률</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {TOP_OPERATORS.slice(0, 10).map((op) => (
                          <tr key={op.rank} className="hover:bg-slate-50">
                            <td className="px-2 py-1.5 text-slate-600">{op.rank}</td>
                            <td className="px-2 py-1.5 text-slate-800">{op.name}</td>
                            <td className="px-2 py-1.5 text-right text-slate-800">{op.investAmount.toLocaleString()}</td>
                            <td className={`px-2 py-1.5 text-right font-bold ${op.isPositive ? 'text-red-500' : 'text-blue-500'}`}>
                              {op.isPositive ? '▲' : '▼'} {Math.abs(op.change)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 컬럼 - 바차트 & Top 10 투자종목 */}
            <div className="col-span-4 flex flex-col gap-2 h-full">
              {/* 자펀드/운용사 바차트 */}
              <div className="bg-white rounded-lg px-7 py-5 border border-slate-200">
                <div className="flex items-center gap-3 mb-2 text-[12px]">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded"></span> 정상</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded"></span> 주의</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded"></span> 경고</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[15px] font-bold text-slate-600 my-2">자펀드</p>
                    <div className="space-y-3">
                      {GRADE_DATA.map((data) => (
                        <div key={data.year} className="flex items-center gap-1">
                          <span className="text-[11px] text-slate-400 w-8">{data.year}</span>
                          <div className="flex-1 h-3 bg-slate-100 rounded overflow-hidden flex">
                            <div className="bg-emerald-500 h-full" style={{ width: `${data.normal / 2.5}%` }}></div>
                            <div className="bg-amber-500 h-full" style={{ width: `${data.caution / 2.5}%` }}></div>
                            <div className="bg-red-500 h-full" style={{ width: `${data.warning / 2.5}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-slate-600 my-2">운용사</p>
                    <div className="space-y-3">
                      {GRADE_DATA.map((data) => (
                        <div key={data.year} className="flex items-center gap-1">
                          <span className="text-[11px] text-slate-400 w-8">{data.year}</span>
                          <div className="flex-1 h-3 bg-slate-100 rounded overflow-hidden flex">
                            <div className="bg-emerald-500 h-full" style={{ width: `${data.normal / 2.5}%` }}></div>
                            <div className="bg-amber-500 h-full" style={{ width: `${data.caution / 2.5}%` }}></div>
                            <div className="bg-red-500 h-full" style={{ width: `${data.warning / 2.5}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 연도별 투자현황 */}
              <div className="bg-white rounded-lg p-5 border border-slate-200 flex-1 flex flex-col overflow-hidden">
                <h3 className="text-md font-bold text-slate-700 mb-1 shrink-0">연도별 투자현황 <span className="font-normal text-xs text-slate-400">(단위 : 개, 억원)</span></h3>
                <div className="flex-1 overflow-auto min-h-0">
                  <table className="w-full text-[12px]">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr>
                        <th className="px-2 py-1.5 text-left font-bold text-slate-600">구분</th>
                        <th className="px-2 py-1.5 text-right font-bold text-slate-600">2020</th>
                        <th className="px-2 py-1.5 text-right font-bold text-slate-600">2021</th>
                        <th className="px-2 py-1.5 text-right font-bold text-slate-600">2022</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {YEARLY_INVESTMENTS.map((row) => (
                        <tr key={row.category} className="hover:bg-slate-50">
                          <td className="px-2 py-1.5 text-slate-600">{row.category}</td>
                          <td className="px-2 py-1.5 text-right text-slate-800">{row.y2020.toLocaleString()}</td>
                          <td className="px-2 py-1.5 text-right text-slate-800">{row.y2021.toLocaleString()}</td>
                          <td className="px-2 py-1.5 text-right text-slate-800">{row.y2022.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
            </div>

            {/* 하단 테이블 - 조기경보 & NICE평가정보 */}
            <div className="grid grid-cols-2 gap-2">
              {/* 조기경보 */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-700">조기경보</h3>
                  <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded">
                    <span className="material-symbols-outlined text-slate-400 text-lg">add</span>
                  </button>
                </div>
                <table className="w-full text-[12px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-2 py-2 text-left font-bold text-slate-600">구분</th>
                      <th className="px-2 py-2 text-left font-bold text-slate-600">2020년</th>
                      <th className="px-2 py-2 text-left font-bold text-slate-600">2021년</th>
                      <th className="px-2 py-2 text-left font-bold text-slate-600">2022년</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {EARLY_WARNINGS.map((warning) => (
                      <tr key={warning.id} className="hover:bg-slate-50">
                        <td className="px-2 py-2">
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                            warning.type === 'new' ? 'bg-red-100 text-red-600' :
                            warning.type === 'extend' ? 'bg-amber-100 text-amber-600' :
                            warning.type === 'suspend' ? 'bg-orange-100 text-orange-600' :
                            'bg-emerald-100 text-emerald-600'
                          }`}>
                            {warning.type === 'new' ? '신규' : warning.type === 'extend' ? '주의' : warning.type === 'suspend' ? '경고' : '해제'}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-slate-800 truncate max-w-[120px]">{warning.fundName}</td>
                        <td className="px-2 py-2 text-slate-600 truncate max-w-[100px]">{warning.operator}</td>
                        <td className="px-2 py-2">
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded ${
                            warning.status === '판매 중단' ? 'bg-red-100 text-red-600' :
                            warning.status === '연기' ? 'bg-amber-100 text-amber-600' :
                            'bg-orange-100 text-orange-600'
                          }`}>
                            {warning.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* NICE평가정보 */}
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-700">NICE평가정보('22)</h3>
                    <span className="text-xs text-slate-400">(단위 : 억원)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="px-3 py-1 text-[11px] font-bold bg-blue-500 text-white rounded hover:bg-blue-600">투자기업 상위</button>
                    <button className="px-3 py-1 text-[11px] font-bold bg-slate-100 text-slate-600 rounded hover:bg-slate-200">투자기업 하위</button>
                    <button className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded ml-1">
                      <span className="material-symbols-outlined text-slate-400 text-lg">add</span>
                    </button>
                  </div>
                </div>
                <table className="w-full text-[12px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-2 py-2 text-left font-bold text-slate-600">번호</th>
                      <th className="px-2 py-2 text-left font-bold text-slate-600">투자기업</th>
                      <th className="px-2 py-2 text-right font-bold text-slate-600">자산</th>
                      <th className="px-2 py-2 text-right font-bold text-slate-600">부채</th>
                      <th className="px-2 py-2 text-right font-bold text-slate-600">자본</th>
                      <th className="px-2 py-2 text-right font-bold text-slate-600">매출</th>
                      <th className="px-2 py-2 text-center font-bold text-slate-600">등급</th>
                      <th className="px-2 py-2 text-right font-bold text-slate-600">투자금액</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {NICE_COMPANY_DATA.map((company) => (
                      <tr key={company.rank} className="hover:bg-slate-50">
                        <td className="px-2 py-2 text-slate-600">{company.rank}</td>
                        <td className="px-2 py-2 text-slate-800">{company.companyName}</td>
                        <td className="px-2 py-2 text-right text-slate-800">{company.asset.toLocaleString()}</td>
                        <td className="px-2 py-2 text-right text-slate-800">{company.debt.toLocaleString()}</td>
                        <td className="px-2 py-2 text-right text-slate-800">{company.capital.toLocaleString()}</td>
                        <td className="px-2 py-2 text-right text-slate-800">{company.revenue.toLocaleString()}</td>
                        <td className="px-2 py-2 text-center text-slate-800">{company.grade}</td>
                        <td className="px-2 py-2 text-right text-slate-800">{company.investAmount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
