
import React from 'react';
import { Asset } from '../types';

const AssetTable: React.FC = () => {
  const assets: Asset[] = [
    { id: 1, name: '삼성전자 우량주', value: 82400000, profit: 12.4, risk: 'LOW', ratio: 19.2 },
    { id: 2, name: 'S&P 500 ETF', value: 65120000, profit: 8.1, risk: 'MEDIUM', ratio: 15.2 },
    { id: 3, name: '미국 중기 국채', value: 54300000, profit: -1.2, risk: 'SAFE', ratio: 12.6 },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">주요 보유 자산 현황</h3>
          <p className="text-sm text-slate-400 mt-1 font-medium">포트폴리오 내 비중이 높은 자산 순위입니다.</p>
        </div>
        <div className="flex bg-slate-100/50 p-1 rounded-xl">
          <button className="px-5 py-2 text-xs font-bold bg-white text-emerald-600 rounded-lg shadow-sm">비중 상위</button>
          <button className="px-5 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-all">수익률 상위</button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-8 px-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-50">
              <th className="pb-4 px-4 text-left font-bold uppercase text-[10px] tracking-widest w-16">번호</th>
              <th className="pb-4 px-4 text-left font-bold uppercase text-[10px] tracking-widest">자산명</th>
              <th className="pb-4 px-4 text-right font-bold uppercase text-[10px] tracking-widest">평가금액</th>
              <th className="pb-4 px-4 text-right font-bold uppercase text-[10px] tracking-widest">수익률</th>
              <th className="pb-4 px-4 text-center font-bold uppercase text-[10px] tracking-widest">리스크 등급</th>
              <th className="pb-4 px-4 text-right font-bold uppercase text-[10px] tracking-widest">비중</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {assets.map((asset) => (
              <tr key={asset.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-6 px-4 font-bold text-slate-400">{asset.id}</td>
                <td className="py-6 px-4 font-bold text-slate-800">{asset.name}</td>
                <td className="py-6 px-4 text-right font-semibold text-slate-700">{asset.value.toLocaleString()}</td>
                <td className={`py-6 px-4 text-right font-bold ${asset.profit >= 0 ? 'text-emerald-500' : 'text-rose-400'}`}>
                  {asset.profit > 0 ? '+' : ''}{asset.profit}%
                </td>
                <td className="py-6 px-4 text-center">
                  <span className={`
                    px-3 py-1 text-[10px] font-bold rounded-full border
                    ${asset.risk === 'LOW' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : ''}
                    ${asset.risk === 'MEDIUM' ? 'bg-sky-50 text-sky-600 border-sky-100' : ''}
                    ${asset.risk === 'SAFE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : ''}
                    ${asset.risk === 'HIGH' ? 'bg-rose-50 text-rose-600 border-rose-100' : ''}
                  `}>
                    {asset.risk}
                  </span>
                </td>
                <td className="py-6 px-4 text-right font-bold text-slate-800">{asset.ratio}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetTable;
