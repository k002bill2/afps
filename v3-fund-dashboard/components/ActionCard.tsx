
import React from 'react';
import { ActionCardData } from '../types';

const ActionCard: React.FC<ActionCardData> = ({
  title,
  description,
  icon,
  iconColor,
  badge,
  buttonText,
  buttonIcon
}) => {
  return (
    <div className="group flex flex-col justify-between p-6 rounded-2xl border border-background-border bg-background-card hover:shadow-lg hover:border-brand-500/50 transition-all relative overflow-hidden">
      {badge && (
        <div className={`absolute top-4 right-4 ${badge.color} text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg`}>
          {badge.text}
        </div>
      )}

      <div>
        <div className={`w-12 h-12 rounded-xl ${iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>
        <h4 className="text-xl font-bold mb-2 text-slate-800">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
          {description}
        </p>
      </div>

      <button className="w-full py-3.5 bg-brand-500 text-white font-bold text-sm rounded-xl hover:bg-brand-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40">
        <span>{buttonText}</span>
        <span className="material-symbols-outlined text-[18px] font-bold">{buttonIcon}</span>
      </button>
    </div>
  );
};

export default ActionCard;
