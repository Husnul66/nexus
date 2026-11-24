import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-slate-900/90 border border-slate-800/80 rounded-xl shadow-lg shadow-black/20 overflow-hidden ${
        hoverable ? 'hover:border-slate-700/80 hover:bg-slate-900 transition-all cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode; badge?: React.ReactNode }> = ({
  title,
  subtitle,
  action,
  badge
}) => {
  return (
    <div className="px-5 py-4 border-b border-slate-800/70 flex items-center justify-between">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2.5">
          <h3 className="text-sm font-semibold text-slate-100 tracking-tight">{title}</h3>
          {badge}
        </div>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};
