import React from 'react';
import { Plus, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onOpenManualModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenManualModal }) => {
  const { activeTab, setActiveTab, environment, setEnvironment } = useApp();

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Executive Intelligence Dashboard';
      case 'discovery': return 'Target Business Discovery';
      case 'companies': return 'Qualified Companies Portfolio';
      case 'company-detail': return 'Company Intelligence Dossier';
      case 'opportunities': return 'Problem Hypotheses & Scoring';
      case 'pipeline': return 'Opportunity Qualification Pipeline';
      case 'roi-calculator': return 'Parametric ROI & Sensitivity Model';
      case 'settings': return 'System Settings & Guardrails';
      default: return 'Nexus Intelligence';
    }
  };

  return (
    <header className="h-16 px-6 bg-slate-900/70 border-b border-slate-800/80 backdrop-blur-md flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-sm font-semibold text-slate-100 tracking-tight flex items-center gap-2">
            {getBreadcrumbTitle()}
          </h1>
          <p className="text-[11px] text-slate-400">
            {environment === 'demo_fixture' 
              ? 'Evaluating synthetic SME opportunity signals (5–50 employees)'
              : 'Operating on validated local opportunity records'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Environment toggle switch */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => setEnvironment('demo_fixture')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              environment === 'demo_fixture'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Demo Sandbox
          </button>
          <button
            onClick={() => setEnvironment('live_empty')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              environment === 'live_empty'
                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Live Empty
          </button>
        </div>

        {/* Discovery shortcut */}
        <button
          onClick={() => setActiveTab('discovery')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span>New Search</span>
        </button>

        {/* Manual company seed button */}
        <button
          onClick={onOpenManualModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Manual Seed URL</span>
        </button>
      </div>
    </header>
  );
};
