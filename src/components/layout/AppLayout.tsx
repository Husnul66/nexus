import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ManualCompanyModal } from './ManualCompanyModal';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Database } from 'lucide-react';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { environment, setEnvironment } = useApp();
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 antialiased select-none">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content column */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        {/* Environment banner */}
        {environment === 'demo_fixture' ? (
          <div className="bg-amber-950/70 border-b border-amber-800/60 px-4 py-1.5 flex items-center justify-between text-xs text-amber-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong className="font-semibold text-amber-300">DEMO FIXTURE ENVIRONMENT:</strong> Showing synthetic architectural fixtures for UI validation. No real scraping or unverified facts presented as live.
              </span>
            </div>
            <button
              onClick={() => setEnvironment('live_empty')}
              className="text-[11px] font-medium underline hover:text-white transition-colors"
            >
              Switch to Live Empty State
            </button>
          </div>
        ) : (
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-1.5 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                <strong className="font-semibold text-emerald-400">LIVE MODE:</strong> Operating on local-first records. All unapproved outbound actions disabled.
              </span>
            </div>
            <button
              onClick={() => setEnvironment('demo_fixture')}
              className="text-[11px] font-medium underline text-brand-400 hover:text-brand-300 transition-colors"
            >
              Load Demo Fixtures
            </button>
          </div>
        )}

        {/* Global Header */}
        <Header onOpenManualModal={() => setIsManualModalOpen(true)} />

        {/* Dynamic page content container */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-950/60">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>

      {/* Manual Company Modal */}
      <ManualCompanyModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />
    </div>
  );
};
