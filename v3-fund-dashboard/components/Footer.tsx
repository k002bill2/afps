
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="h-9 border-t border-background-border bg-background-darker px-6 flex items-center justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-[0.2em] shrink-0">
      <div className="flex gap-6">
        <span className="flex items-center gap-2">
          SYSTEM STATUS: <span className="text-emerald-600 font-bold">OPERATIONAL</span>
        </span>
        <span className="opacity-70">LAST SYNC: 12:45:01 GMT</span>
      </div>
      <div className="opacity-70">
        WORKFLOW V3.0.4-STABLE
      </div>
    </footer>
  );
};

export default Footer;
