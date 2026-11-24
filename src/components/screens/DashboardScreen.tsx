import React from 'react';
import { 
  Building2, 
  Sparkles, 
  Target, 
  CheckCircle2, 
  ArrowUpRight, 
  Compass, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../common/Card';
import { OpportunityStatusBadge, EvidenceStrengthBadge } from '../common/Badge';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { EmptyState } from '../common/EmptyState';

export const DashboardScreen: React.FC = () => {
  const { 
    companies, 
    opportunities, 
    setActiveTab, 
    viewCompanyDetail, 
    setEnvironment 
  } = useApp();

  const highScoringOpps = opportunities.filter(o => o.score.total >= 75);
  const approvedOpps = opportunities.filter(o => o.status === 'user_approved');
  const activeHypotheses = opportunities.filter(o => o.status === 'hypothesis' || o.status === 'scored');

  return (
    <div className="space-y-6">
      {/* Welcome & Context Banner */}
      <div className="flex items-center justify-between p-5 rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-brand-950/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-brand-500/10 text-brand-400 border border-brand-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Evidence-First Architecture
            </span>
            <span className="text-xs text-slate-400">• Local Single-User Edition</span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 tracking-tight">
            Target Opportunity Intelligence
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Discover SME operational bottlenecks (5–50 employees) from verified public signals, formulate testable software hypotheses, and prepare human-approved outreach.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('discovery')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-950 transition-all"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Businesses</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">Tracked Companies</span>
              <div className="text-2xl font-bold text-slate-100 font-mono">{companies.length}</div>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-brand-400" />
                SME target profile (5–50)
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-brand-400">
              <Building2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">Active Hypotheses</span>
              <div className="text-2xl font-bold text-slate-100 font-mono">{activeHypotheses.length}</div>
              <span className="text-[11px] text-sky-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Evidence-backed analysis
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-sky-950/60 border border-sky-800/60 flex items-center justify-center text-sky-400">
              <Sparkles className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">High Score (75+)</span>
              <div className="text-2xl font-bold text-slate-100 font-mono">{highScoringOpps.length}</div>
              <span className="text-[11px] text-indigo-400 flex items-center gap-1">
                <Target className="w-3 h-3" />
                Multi-factor rubric
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
              <Target className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs text-slate-400 font-medium">Human Approved</span>
              <div className="text-2xl font-bold text-emerald-400 font-mono">{approvedOpps.length}</div>
              <span className="text-[11px] text-emerald-400/90 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Ready for manual outreach
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Priority Opportunities & Workflow Guide */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column (2 cols): High Priority Opportunities */}
        <div className="col-span-2 space-y-4">
          <Card>
            <CardHeader
              title="Prioritized Opportunities"
              subtitle="Scored on evidence quality, technical feasibility, economic fit & decision-maker access"
              action={
                <button
                  onClick={() => setActiveTab('opportunities')}
                  className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>View All Opportunities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              }
            />
            <CardContent className="p-0">
              {opportunities.length === 0 ? (
                <div className="p-8">
                  <EmptyState
                    icon={Sparkles}
                    title="No Opportunity Signals Yet"
                    description="Run your first business discovery query or import a manual company domain to generate hypotheses."
                    actionLabel="Run Business Discovery"
                    onAction={() => setActiveTab('discovery')}
                    secondaryActionLabel="Load Demo Fixtures"
                    onSecondaryAction={() => setEnvironment('demo_fixture')}
                  />
                </div>
              ) : (
                <div className="divide-y divide-slate-800/70">
                  {opportunities.slice(0, 3).map((opp) => (
                    <div 
                      key={opp.id} 
                      className="p-4 hover:bg-slate-800/40 transition-colors flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-3">
                        <InitialsAvatar name={opp.companyName} size="md" />
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => viewCompanyDetail(opp.companyId)}
                              className="text-xs font-semibold text-slate-100 hover:text-brand-400 transition-colors text-left"
                            >
                              {opp.companyName}
                            </button>
                            <span className="text-[11px] text-slate-400">• {opp.city}, {opp.country}</span>
                            <EvidenceStrengthBadge strength={opp.evidenceStrength} />
                          </div>

                          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                            {opp.problemHypothesis}
                          </p>

                          <div className="flex items-center gap-2 pt-0.5">
                            <OpportunityStatusBadge status={opp.status} />
                            {opp.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 space-y-1">
                        <div className="text-base font-bold text-slate-100 font-mono">
                          {opp.score.total}<span className="text-xs text-slate-400">/100</span>
                        </div>
                        <button
                          onClick={() => {
                            viewCompanyDetail(opp.companyId);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-400 hover:text-brand-300 transition-colors"
                        >
                          <span>Dossier</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1 col): Guided Pipeline & Guardrails */}
        <div className="space-y-4">
          {/* Quick Flow Navigator */}
          <Card>
            <CardHeader
              title="First-User Workflow"
              subtitle="Step-by-step methodology"
            />
            <CardContent className="space-y-3">
              <div 
                onClick={() => setActiveTab('discovery')}
                className="p-3 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-brand-500/40 hover:bg-slate-900 cursor-pointer transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-[10px] font-mono flex items-center justify-center font-bold">1</span>
                    Discover Businesses
                  </span>
                  <span className="text-[10px] text-brand-400">5–50 SMEs</span>
                </div>
                <p className="text-[11px] text-slate-400 pl-7">
                  Filter by country, region, sector & keywords across compliant registries.
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('companies')}
                className="p-3 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-brand-500/40 hover:bg-slate-900 cursor-pointer transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono flex items-center justify-center font-bold">2</span>
                    Inspect Evidence
                  </span>
                  <span className="text-[10px] text-slate-400">Raw Facts</span>
                </div>
                <p className="text-[11px] text-slate-400 pl-7">
                  Distinguish direct observations from unverified hypotheses.
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('pipeline')}
                className="p-3 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-brand-500/40 hover:bg-slate-900 cursor-pointer transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono flex items-center justify-center font-bold">3</span>
                    Approve Outreach
                  </span>
                  <span className="text-[10px] text-emerald-400">Audit Gate</span>
                </div>
                <p className="text-[11px] text-slate-400 pl-7">
                  Review low-fi concepts, calculate ROI & copy human-approved pitches.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Architecture Guardrail card */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Governance Guarantee</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Nexus maintains zero automated external sending channels. All communication drafts remain internal until explicitly verified and copied by you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
