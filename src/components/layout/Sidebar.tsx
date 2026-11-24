import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  Building2, 
  Sparkles, 
  GitPullRequest, 
  Calculator, 
  Settings, 
  ShieldCheck,
  Database
} from 'lucide-react';
import { useApp, NavTab } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, companies, opportunities, environment } = useApp();

  const navItems: { id: NavTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'discovery', label: 'Business Discovery', icon: Compass },
    { id: 'companies', label: 'Companies', icon: Building2, badge: companies.length },
    { id: 'opportunities', label: 'Opportunities', icon: Sparkles, badge: opportunities.length },
    { id: 'pipeline', label: 'Pipeline', icon: GitPullRequest },
    { id: 'roi-calculator', label: 'ROI Calculator', icon: Calculator },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-925 border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-full select-none">
      <div>
        {/* Brand header */}
        <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-800/80">
          <div className="w-8 h-8 rounded-lg bg-brand-600/20 border border-brand-500/40 flex items-center justify-center text-brand-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-slate-100 text-base">NEXUS</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                v0.1
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">B2B Intelligence Suite</p>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-3 space-y-1">
          <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'companies' && activeTab === 'company-detail');

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600/15 text-brand-300 border border-brand-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-brand-500/20 text-brand-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Security & System Guardrails Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="p-2.5 rounded-lg border border-slate-800/80 bg-slate-900/50 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              Storage
            </span>
            <span className="font-mono text-emerald-400 text-[10px] font-medium">Local-First</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              Outreach
            </span>
            <span className="font-mono text-slate-300 text-[10px]">Zero Auto-Send</span>
          </div>
          <div className="pt-1 border-t border-slate-800/50 flex items-center justify-between text-[10px] text-slate-400">
            <span>Environment</span>
            <span className="font-medium text-slate-300 capitalize">{environment.replace('_', ' ')}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
