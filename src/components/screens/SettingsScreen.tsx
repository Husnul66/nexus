import React from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Database, 
  Lock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../common/Card';

export const SettingsScreen: React.FC = () => {
  const { 
    environment, 
    setEnvironment, 
    settings, 
    updateSettings, 
    dataProviders 
  } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-400" />
            System Settings & Security Guardrails
          </h2>
          <p className="text-xs text-slate-400">
            Configure local-first storage, discovery adapter boundaries, and human approval enforcement.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: Data Environment & Storage */}
        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Execution Environment"
              subtitle="Switch between synthetic UI fixtures and clean local data"
            />
            <CardContent className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="text-slate-300 font-medium block">
                  Active Data Mode:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setEnvironment('demo_fixture')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      environment === 'demo_fixture'
                        ? 'border-brand-500 bg-brand-950/30 text-slate-100'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-200">Demo Fixture Sandbox</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Populates synthetic architectural test leads for UI testing.
                    </div>
                  </button>

                  <button
                    onClick={() => setEnvironment('live_empty')}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      environment === 'live_empty'
                        ? 'border-emerald-500 bg-emerald-950/30 text-slate-100'
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-200">Live Empty State</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Clean local workspace ready for your own manual or API seeds.
                    </div>
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-slate-200 font-medium block">Local-First Storage</span>
                    <span className="text-[11px] text-slate-400">
                      All research dossiers and notes remain strictly on local disk.
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Active (Local)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discovery Scope Defaults */}
          <Card>
            <CardHeader
              title="Discovery Boundaries (FR-01)"
              subtitle="Default filtering bounds to prevent unconstrained crawling"
            />
            <CardContent className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-medium block mb-1">
                  Default Target Employee Range:
                </label>
                <input
                  type="text"
                  value={settings.defaultEmployeeRange}
                  onChange={(e) => updateSettings({ defaultEmployeeRange: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-100 focus:outline-none focus:border-brand-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Mandated standard: 5–50 employees.
                </span>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Automatic Candidate Deduplication</span>
                  <input
                    type="checkbox"
                    checked={settings.autoDeduplicationCheck}
                    onChange={(e) => updateSettings({ autoDeduplicationCheck: e.target.checked })}
                    className="accent-brand-500 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Strict Audit Logging of Approvals</span>
                  <input
                    type="checkbox"
                    checked={settings.strictAuditLogging}
                    onChange={(e) => updateSettings({ strictAuditLogging: e.target.checked })}
                    className="accent-brand-500 rounded"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Security, Ethics & Provider Governance */}
        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Security & Governance Guardrails"
              subtitle="Mandated boundaries specified in AGENTS.md & PROJECT_CONTEXT.md"
            />
            <CardContent className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <Lock className="w-4 h-4" />
                  <span>Zero Automated External Outreach Guarantee</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Nexus possesses no outbound network handlers for SMTP, WhatsApp, or LinkedIn. Pitch approval creates an internal audit record only. The user copies drafts manually.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Privacy & KVKK/GDPR Compliance</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Only corporate public registry data and official company domains are parsed. Personal phone numbers and private individual accounts are filtered out.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs">
                  <Database className="w-4 h-4" />
                  <span>Strict Separation: Fact vs. Hypothesis</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Every company dossier visibly separates directly observed public facts from speculative problem hypotheses.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Registered Data Adapters Status */}
          <Card>
            <CardHeader
              title="Registered Public Adapters"
              subtitle="Compliance status of search sources"
            />
            <CardContent className="p-0">
              <div className="divide-y divide-slate-800 text-xs">
                {dataProviders.map(p => (
                  <div key={p.id} className="p-3.5 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-slate-200">{p.name}</div>
                      <div className="text-[11px] text-slate-400">{p.description}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                      p.complianceStatus === 'compliant'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-amber-950 text-amber-300 border-amber-800'
                    }`}>
                      {p.complianceStatus.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
