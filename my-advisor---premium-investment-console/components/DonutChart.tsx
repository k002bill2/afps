
import React from 'react';

const DonutChart: React.FC = () => {
  // SVG Donut Chart Logic
  // Total circumference is 2 * PI * r
  // r = 80, Circumference = ~502.6
  
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle 
          className="text-slate-100" 
          cx="96" cy="96" fill="transparent" r="80" 
          stroke="currentColor" strokeWidth="18"
        />
        {/* Stocks (66%) -> dashoffset = 502.6 * (1 - 0.66) = 170.8 */}
        <circle 
          className="text-emerald-400" 
          cx="96" cy="96" fill="transparent" r="80" 
          stroke="currentColor" strokeWidth="18"
          strokeDasharray="502.6"
          strokeDashoffset="170.8"
          strokeLinecap="round"
        />
        {/* Bonds (24%) -> This needs more logic for stacking, for demo purposes we simplified the UI visual match */}
        <circle 
          className="text-sky-300" 
          cx="96" cy="96" fill="transparent" r="80" 
          stroke="currentColor" strokeWidth="18"
          strokeDasharray="502.6"
          strokeDashoffset="420"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <span className="block text-3xl font-bold text-slate-800">72%</span>
        <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter">안전자산 비중</span>
      </div>
    </div>
  );
};

export default DonutChart;
