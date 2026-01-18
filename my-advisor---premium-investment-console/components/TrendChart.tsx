
import React from 'react';

const TrendChart: React.FC = () => {
  const data = [
    { year: '2023', target: 75, actual: 15, market: 10 },
    { year: '2022', target: 60, actual: 30, market: 10 },
    { year: '2021', target: 85, actual: 10, market: 5 },
  ];

  return (
    <div className="space-y-6">
      {data.map((row) => (
        <div key={row.year} className="flex items-center gap-6 group">
          <span className="text-xs font-bold text-slate-400 w-12 text-right">{row.year}</span>
          <div className="flex-1 h-4 flex rounded-full overflow-hidden bg-slate-50 shadow-inner group-hover:h-5 transition-all">
            <div 
              style={{ width: `${row.target}%` }} 
              className="bg-emerald-300 transition-all duration-1000"
              title={`Target: ${row.target}%`}
            ></div>
            <div 
              style={{ width: `${row.actual}%` }} 
              className="bg-sky-300 transition-all duration-1000"
              title={`Actual: ${row.actual}%`}
            ></div>
            <div 
              style={{ width: `${row.market}%` }} 
              className="bg-amber-100 transition-all duration-1000"
              title={`Market: ${row.market}%`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendChart;
