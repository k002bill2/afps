
import React from 'react';
import { AlertTriangle, ArrowRight, List, Settings } from 'lucide-react';
import { ALERTS } from '../constants';
import { AlertLevel } from '../types';

const AlertPanel: React.FC = () => {
  const criticalCount = ALERTS.filter(a => a.level === AlertLevel.CRITICAL).length;
  const warningCount = ALERTS.filter(a => a.level === AlertLevel.WARNING).length;

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-slate-200 bg-white shrink-0">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-black text-slate-800 flex items-center gap-1.5 tracking-tight">
            <AlertTriangle className="text-red-500" size={18} />
            조기경보 현황
          </h3>
          <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-black rounded-full uppercase tracking-wide animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            LIVE
          </span>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-center">
            <p className="text-xl font-black text-red-600">{criticalCount}</p>
            <p className="text-[10px] font-bold text-red-500 uppercase">긴급</p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-center">
            <p className="text-xl font-black text-amber-600">{warningCount}</p>
            <p className="text-[10px] font-bold text-amber-500 uppercase">주의</p>
          </div>
          <div className="bg-slate-100 border border-slate-200 rounded-lg p-2 text-center">
            <p className="text-xl font-black text-slate-600">{ALERTS.length}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase">전체</p>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-0">
        {ALERTS.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg border transition-all cursor-pointer group hover:shadow-md
              ${alert.level === AlertLevel.CRITICAL ? 'bg-red-50 border-red-200 hover:border-red-400' :
                alert.level === AlertLevel.WARNING ? 'bg-amber-50 border-amber-200 hover:border-amber-400' :
                'bg-white border-slate-200 hover:border-slate-400'}`}
          >
            {/* Alert Header */}
            <div className="flex justify-between items-start mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  alert.level === AlertLevel.CRITICAL ? 'bg-red-500 animate-pulse' :
                  alert.level === AlertLevel.WARNING ? 'bg-amber-500' :
                  'bg-slate-400'
                }`}></span>
                <span className={`text-[10px] font-black uppercase tracking-tight ${
                  alert.level === AlertLevel.CRITICAL ? 'text-red-600' :
                  alert.level === AlertLevel.WARNING ? 'text-amber-600' :
                  'text-slate-500'
                }`}>{alert.level}</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">{alert.timeAgo}</span>
            </div>

            {/* Alert Content */}
            <h4 className="text-xs font-bold text-slate-800 mb-0.5 group-hover:text-blue-600 transition-colors leading-tight">
              {alert.title}
            </h4>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed mb-1.5">
              {alert.operator}
            </p>
            <p className={`text-[11px] font-semibold mb-2 ${
              alert.level === AlertLevel.CRITICAL ? 'text-red-600' : 'text-slate-600'
            }`}>
              {alert.subtitle}
            </p>

            {/* Alert Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
              {alert.statusLabel && (
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                  alert.level === AlertLevel.CRITICAL ? 'bg-red-500 text-white' :
                  alert.level === AlertLevel.WARNING ? 'bg-amber-100 text-amber-700 border border-amber-300' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {alert.statusLabel}
                </span>
              )}
              {alert.actionText && (
                <button className="flex items-center gap-0.5 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors group/btn">
                  {alert.actionText}
                  <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="p-2 border-t border-slate-200 bg-white space-y-1.5 shrink-0">
        <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20">
          <List size={16} />
          전체 경보 로그 확인
        </button>
        <button className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5">
          <Settings size={16} />
          경보 설정 관리
        </button>
      </div>
    </div>
  );
};

export default AlertPanel;
