import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Check, 
  AlertTriangle, 
  Sparkles, 
  Calculator, 
  Copy, 
  CheckCircle2, 
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../common/Card';
import { CandidateStatusBadge, OpportunityStatusBadge } from '../common/Badge';
import { InitialsAvatar } from '../common/InitialsAvatar';

export const CompanyDetailScreen: React.FC = () => {
  const { 
    selectedCompanyId, 
    companies, 
    opportunities, 
    setActiveTab, 
    approveOutreachDraft,
    setActiveOpportunityForRoi 
  } = useApp();

  const [copiedDraftId, setCopiedDraftId] = useState<string | null>(null);

  const company = companies.find(c => c.id === selectedCompanyId);
  const companyOpps = opportunities.filter(o => o.companyId === selectedCompanyId);

  if (!company) {
    return (
      <div className="p-8 text-center space-y-4">
        <p className="text-xs text-slate-400">No company selected.</p>
        <button
          onClick={() => setActiveTab('companies')}
          className="px-4 py-2 text-xs font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-500"
        >
          Return to Companies
        </button>
      </div>
    );
  }

  const handleCopyDraft = (oppId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDraftId(oppId);
    setTimeout(() => setCopiedDraftId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Back button & Company Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('companies')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Companies</span>
        </button>

        <div className="flex items-center gap-2">
          <CandidateStatusBadge status={company.status} />
        </div>
      </div>

      {/* Main Company Overview Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <InitialsAvatar name={company.name} size="lg" />
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-slate-100 tracking-tight">
                    {company.name}
                  </h2>
                  {company.isDemoFixture && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                      SYNTHETIC FIXTURE
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="text-slate-300 font-medium">{company.sector}</span>
                  <span>•</span>
                  <span>{company.city}, {company.country}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-300">Staff: {company.employeeRange}</span>
                </div>

                {company.domain && (
                  <div className="pt-1">
                    <a
                      href={`https://${company.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      <span>{company.domain}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Source Provenance Box */}
            <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-lg text-xs space-y-1.5 w-72 shrink-0">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Source Provenance
              </span>
              <div className="text-slate-300 font-medium truncate">{company.sourceProvider}</div>
              <div className="text-slate-400 text-[11px]">Accessed: {company.accessDate}</div>
              <div className="pt-1 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Duplicates:</span>
                <span className={company.hasDuplicateCandidates ? "text-amber-400 font-medium" : "text-emerald-400"}>
                  {company.hasDuplicateCandidates ? "Flagged for Deduplication" : "Unique Candidate"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2-Column Split: Evidence vs. Solution Hypotheses */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: Direct Evidence & Observation */}
        <div className="space-y-4">
          <Card>
            <CardHeader
              title="Proven Public Signals"
              subtitle="Directly verifiable facts extracted from official public sources"
            />
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {company.observedFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-950/30 border border-emerald-900/40 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>

              {/* Missing Fields Box */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Unknown Parameters (Requires Client Verification)
                </span>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                  {company.missingFields.map((field, idx) => (
                    <li key={idx}>{field}</li>
                  ))}
                </ul>
              </div>

              {company.notes && (
                <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                  <strong className="text-slate-300">Analyst Context:</strong> {company.notes}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Opportunities & Solution Architecture */}
        <div className="space-y-4">
          {companyOpps.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
                <h4 className="text-sm font-semibold text-slate-200">No Problem Hypotheses Formulated</h4>
                <p className="text-xs text-slate-400">
                  Evidence indicates potential operational bottlenecks. Click below to draft an evidence-backed hypothesis.
                </p>
                <button
                  onClick={() => setActiveTab('opportunities')}
                  className="px-3.5 py-1.5 text-xs font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-500 transition-colors"
                >
                  Create Opportunity Hypothesis
                </button>
              </CardContent>
            </Card>
          ) : (
            companyOpps.map((opp) => (
              <Card key={opp.id} className="space-y-4">
                <CardHeader
                  title={opp.solutionBrief.title}
                  badge={<OpportunityStatusBadge status={opp.status} />}
                  action={
                    <button
                      onClick={() => {
                        setActiveOpportunityForRoi(opp);
                        setActiveTab('roi-calculator');
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5 text-brand-400" />
                      <span>Model ROI</span>
                    </button>
                  }
                />
                <CardContent className="space-y-4 pt-0">
                  {/* Problem Hypothesis statement */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[10px] uppercase font-semibold text-brand-400 tracking-wider">
                      Problem Hypothesis (FR-02)
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {opp.problemHypothesis}
                    </p>
                  </div>

                  {/* 4-Pillar Scorecard */}
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">
                        Opportunity Feasibility Score
                      </span>
                      <span className="text-sm font-bold text-brand-400 font-mono">
                        {opp.score.total}/100
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <span className="text-slate-400 block">Evidence</span>
                        <span className="font-mono font-bold text-slate-200">{opp.score.evidenceQuality}/30</span>
                      </div>
                      <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <span className="text-slate-400 block">Feasibility</span>
                        <span className="font-mono font-bold text-slate-200">{opp.score.technicalFeasibility}/25</span>
                      </div>
                      <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <span className="text-slate-400 block">Econ Fit</span>
                        <span className="font-mono font-bold text-slate-200">{opp.score.economicFit}/25</span>
                      </div>
                      <div className="p-1.5 bg-slate-950 rounded border border-slate-800">
                        <span className="text-slate-400 block">Decision Maker</span>
                        <span className="font-mono font-bold text-slate-200">{opp.score.decisionMakerAccess}/20</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 italic">
                      "{opp.score.justification}"
                    </p>
                  </div>

                  {/* Low-Fidelity Solution Flow Concept */}
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                    <span className="text-[10px] uppercase font-semibold text-purple-400 tracking-wider">
                      Low-Fidelity Concept Flow (FR-06)
                    </span>
                    <p className="text-slate-300 font-mono text-[11px] bg-slate-900 p-2 rounded border border-slate-800/80">
                      {opp.solutionBrief.proposedFlow}
                    </p>
                    <p className="text-[11px] text-slate-400 pt-1">
                      <strong className="text-slate-300">Risk Check:</strong> {opp.solutionBrief.riskAnalysis}
                    </p>
                  </div>

                  {/* Outreach Draft & Approval Gate */}
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-brand-400" />
                        Human-Governed Outreach Pitch
                      </span>
                      {opp.outreachDraft.isApproved ? (
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Approved by {opp.outreachDraft.approvedBy}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-amber-400">
                          Pending Approval
                        </span>
                      )}
                    </div>

                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
                      <strong>Subject: {opp.outreachDraft.subject}</strong>
                      {'\n\n'}
                      {opp.outreachDraft.body}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">
                        *No automated emails sent. Copy manually.
                      </span>

                      <div className="flex items-center gap-2">
                        {!opp.outreachDraft.isApproved && (
                          <button
                            onClick={() => approveOutreachDraft(opp.id, 'Proje Sahibi')}
                            className="px-3 py-1 text-xs font-medium text-emerald-300 bg-emerald-950 border border-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors"
                          >
                            Approve Pitch ✓
                          </button>
                        )}
                        <button
                          onClick={() => handleCopyDraft(opp.id, `${opp.outreachDraft.subject}\n\n${opp.outreachDraft.body}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-white bg-brand-600 hover:bg-brand-500 rounded-lg transition-colors shadow-sm"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedDraftId === opp.id ? 'Copied to Clipboard!' : 'Copy Pitch'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
