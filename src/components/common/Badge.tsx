import React from 'react';
import { CandidateStatus, OpportunityStatus, EvidenceStrength, MatchConfidence } from '../../types';

export const CandidateStatusBadge: React.FC<{ status: CandidateStatus }> = ({ status }) => {
  switch (status) {
    case 'new':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sky-950/80 text-sky-400 border border-sky-800/60">New Candidate</span>;
    case 'reviewing':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-950/80 text-amber-400 border border-amber-800/60">Under Review</span>;
    case 'promoted_to_research':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">Researching</span>;
    case 'dismissed':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800/80 text-slate-400 border border-slate-700/60">Dismissed</span>;
    default:
      return null;
  }
};

export const OpportunityStatusBadge: React.FC<{ status: OpportunityStatus }> = ({ status }) => {
  switch (status) {
    case 'discovered_signal':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">1. Raw Signal</span>;
    case 'hypothesis':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sky-950 text-sky-300 border border-sky-800">2. Hypothesis</span>;
    case 'scored':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-950 text-indigo-300 border border-indigo-800">3. Scored</span>;
    case 'proposal_ready':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-950 text-purple-300 border border-purple-800">4. Proposal Ready</span>;
    case 'user_approved':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono">5. Human Approved ✓</span>;
    case 'contacted':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-950 text-cyan-300 border border-cyan-800">6. Outreach Done</span>;
    case 'outcome_recorded':
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-950 text-blue-300 border border-blue-800">7. Outcome Logged</span>;
    default:
      return null;
  }
};

export const EvidenceStrengthBadge: React.FC<{ strength: EvidenceStrength }> = ({ strength }) => {
  switch (strength) {
    case 'high':
      return <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">● High Evidence</span>;
    case 'medium':
      return <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">◐ Medium Evidence</span>;
    case 'low':
      return <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">○ Weak Signal</span>;
    default:
      return null;
  }
};

export const MatchConfidenceBadge: React.FC<{ confidence: MatchConfidence }> = ({ confidence }) => {
  switch (confidence) {
    case 'high':
      return <span className="text-xs text-emerald-400">95%+ Match</span>;
    case 'medium':
      return <span className="text-xs text-amber-400">Ambiguous (Verify)</span>;
    case 'low':
      return <span className="text-xs text-slate-400">Low Match</span>;
  }
};
