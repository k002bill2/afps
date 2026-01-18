
import React from 'react';
import { Metric } from '../types';

const MetricCard: React.FC<Metric> = ({ label, value, statusColor }) => {
  return (
    <div className="flex flex-col justify-center gap-1 rounded-2xl p-4 border border-background-border bg-background-card hover:shadow-md transition-all">
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.15em]">{label}</p>
      <p className={`text-2xl font-bold ${statusColor || 'text-slate-800'}`}>{value}</p>
    </div>
  );
};

export default MetricCard;
