import React, { useState } from 'react';
import { 
  GitPullRequest, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Copy, 
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OpportunityStatus, Opportunity } from '../../types';
import { EvidenceStrengthBadge } from '../common/Badge';

const PIPELINE_COLUMNS: { id: OpportunityStatus; title: string; step: number; color: string }[] = [
  { id: 'discovered_signal', title: '1. Raw Signal', step: 1, color: 'border-slate-700 bg-slate-900/40' },
  { id: 'hypothesis', title: '2. Hypothesis', step: 2, color: 'border-sky-800 bg-sky-950/20' },
  { id: 'scored', title: '3. Scored', step: 3, color: 'border-indigo-800 bg-indigo-950/20' },
  { id: 'proposal_ready', title: '4. Proposal Ready', step: 4, color: 'border-purple-800 bg-purple-950/20' },
  { id: 'user_approved', title: '5. Human Approved', step: 5, color: 'border-emerald-700 bg-emerald-950/30' },
  { id: 'contacted', title: '6. Outreach Done', step: 6, color: 'border-cyan-800 bg-cyan-950/20' },
  { id: 'outcome_recorded', title: '7. Outcome Logged', step: 7, color: 'border-blue-800 bg-blue-950/20' },
];

export const PipelineScreen: React.FC = () => {
  const { 
    opportunities, 
    updateOpportunityStatus, 
    approveOutreachDraft, 
    viewCompanyDetail
  } = useApp();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getNextStatus = (current: OpportunityStatus): OpportunityStatus | null => {
    const order: OpportunityStatus[] = [
      'discovered_signal',
      'hypothesis',
      'scored',
      'proposal_ready',
      'user_approved',
      'contacted',
      'outcome_recorded'
    ];
    const idx = order.indexOf(current);
    return idx < order.length - 1 ? order[idx + 1] : null;
  };

  const getPrevStatus = (current: OpportunityStatus): OpportunityStatus | null => {
    const order: OpportunityStatus[] = [
      'discovered_signal',
      'hypothesis',
      'scored',
      'proposal_ready',
      'user_approved',
      'contacted',
      'outcome_recorded'
    ];
    const idx = order.indexOf(current);
    return idx > 0 ? order[idx - 1] : null;
  };

  const handleCopyPitch = (opp: Opportunity) => {
    const text = `Subject: ${opp.outreachDraft.subject}\n\n${opp.outreachDraft.body}`;
    navigator.clipboard.writeText(text);
    setCopiedId(opp.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with Pipeline Context */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-brand-400" />
            7-Stage Opportunity Qualification Pipeline (FR-12)
          </h2>
          <p className="text-xs text-slate-400">
            Audit-logged opportunity lifecycle from initial raw observation to client outcome verification.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Stage 5 is a Mandatory Human Approval Gate</span>
        </div>
      </div>

      {/* Kanban Board Horizontal Scroll Container */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1300px]">
          {PIPELINE_COLUMNS.map((col) => {
            const colOpps = opportunities.filter(o => o.status === col.id);

            return (
              <div 
                key={col.id} 
                className="w-72 shrink-0 bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex flex-col max-h-[75vh]"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3">
                  <span className="text-xs font-semibold text-slate-200">
                    {col.title}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold">
                    {colOpps.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {colOpps.length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-slate-400 border border-dashed border-slate-800/80 rounded-lg">
                      No opportunities
                    </div>
                  ) : (
                    colOpps.map((opp) => (
                      <div 
                        key={opp.id}
                        className={`p-3.5 rounded-lg border bg-slate-950 space-y-3 shadow-md shadow-black/20 ${col.color}`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => viewCompanyDetail(opp.companyId)}
                              className="text-xs font-bold text-slate-100 hover:text-brand-400 transition-colors text-left truncate max-w-[160px]"
                            >
                              {opp.companyName}
                            </button>
                            <span className="text-[11px] font-mono font-bold text-brand-400">
                              {opp.score.total}<span className="text-[9px] text-slate-400">/100</span>
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 truncate">
                            {opp.sector}
                          </p>
                        </div>

                        <p className="text-[11px] text-slate-300 line-clamp-3 leading-relaxed">
                          {opp.problemHypothesis}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          <EvidenceStrengthBadge strength={opp.evidenceStrength} />
                          <button
                            onClick={() => viewCompanyDetail(opp.companyId)}
                            className="text-[10px] text-brand-400 hover:text-brand-300 font-medium"
                          >
                            Dossier →
                          </button>
                        </div>

                        {/* Stage 5 Special Action: Human Approval Gate */}
                        {opp.status === 'proposal_ready' && (
                          <div className="pt-2 border-t border-slate-800">
                            <button
                              onClick={() => approveOutreachDraft(opp.id, 'Proje Sahibi')}
                              className="w-full py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 rounded-md transition-colors flex items-center justify-center gap-1.5"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Approve Pitch for Outreach</span>
                            </button>
                          </div>
                        )}

                        {/* Stage 5+ Actions: Copy Pitch button */}
                        {(opp.status === 'user_approved' || opp.status === 'contacted') && (
                          <div className="pt-2 border-t border-slate-800 space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono">
                              <span>✓ Human Approved</span>
                            </div>
                            <button
                              onClick={() => handleCopyPitch(opp)}
                              className="w-full py-1 text-[11px] font-medium text-white bg-brand-600 hover:bg-brand-500 rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <Copy className="w-3 h-3" />
                              <span>{copiedId === opp.id ? 'Copied!' : 'Copy Cold Pitch'}</span>
                            </button>
                          </div>
                        )}

                        {/* Stage Controls: Advance or Regress */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px]">
                          {getPrevStatus(opp.status) ? (
                            <button
                              onClick={() => updateOpportunityStatus(opp.id, getPrevStatus(opp.status)!)}
                              className="text-slate-400 hover:text-slate-200 flex items-center gap-0.5"
                            >
                              <ChevronLeft className="w-3 h-3" /> Prev
                            </button>
                          ) : <div />}

                          {getNextStatus(opp.status) && (
                            <button
                              onClick={() => updateOpportunityStatus(opp.id, getNextStatus(opp.status)!)}
                              className="text-brand-400 hover:text-brand-300 font-medium flex items-center gap-0.5"
                            >
                              Advance <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
