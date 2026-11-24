import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowUpRight, 
  Calculator, 
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../common/Card';
import { OpportunityStatusBadge, EvidenceStrengthBadge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';

export const OpportunitiesScreen: React.FC = () => {
  const { 
    opportunities, 
    viewCompanyDetail, 
    setActiveOpportunityForRoi, 
    setActiveTab,
    setEnvironment 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedStrength, setSelectedStrength] = useState<string>('all');

  // Extract unique tags across opportunities
  const allTags = Array.from(new Set(opportunities.flatMap(o => o.tags)));

  const filteredOpps = opportunities.filter(o => {
    const matchesSearch = o.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.problemHypothesis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.solutionBrief.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || o.tags.includes(selectedTag);
    const matchesStrength = selectedStrength === 'all' || o.evidenceStrength === selectedStrength;
    return matchesSearch && matchesTag && matchesStrength;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-brand-400" />
            Opportunities & Hypothesis Scoring (FR-04)
          </h2>
          <p className="text-xs text-slate-400">
            Formulated software problem hypotheses evaluated across 4 objective viability dimensions.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search hypotheses, proposed solutions, or company names..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-brand-500"
              >
                <option value="all">All Problem Tags</option>
                {allTags.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                value={selectedStrength}
                onChange={(e) => setSelectedStrength(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-brand-500"
              >
                <option value="all">All Evidence Levels</option>
                <option value="high">High Evidence</option>
                <option value="medium">Medium Evidence</option>
                <option value="low">Weak Signal</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities List */}
      {filteredOpps.length === 0 ? (
        <Card>
          <CardContent className="p-12">
            <EmptyState
              icon={Sparkles}
              title="No Opportunities Found"
              description="No opportunity hypotheses match your filter criteria or the database is in live empty mode."
              actionLabel="Load Demo Fixtures"
              onAction={() => setEnvironment('demo_fixture')}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOpps.map((opp) => (
            <Card key={opp.id} className="p-5 space-y-4 hover:border-slate-700/80 transition-all">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => viewCompanyDetail(opp.companyId)}
                      className="text-sm font-bold text-slate-100 hover:text-brand-400 transition-colors"
                    >
                      {opp.companyName}
                    </button>
                    <OpportunityStatusBadge status={opp.status} />
                    <EvidenceStrengthBadge strength={opp.evidenceStrength} />
                  </div>

                  <h3 className="text-xs font-semibold text-brand-300">
                    {opp.solutionBrief.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    <span className="font-semibold text-slate-200">Problem Hypothesis: </span>
                    {opp.problemHypothesis}
                  </p>
                </div>

                {/* Score Pill */}
                <div className="shrink-0 text-right space-y-2">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center min-w-28">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Viability</div>
                    <div className="text-xl font-bold font-mono text-brand-400">
                      {opp.score.total}<span className="text-xs text-slate-400 font-normal">/100</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setActiveOpportunityForRoi(opp);
                        setActiveTab('roi-calculator');
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors"
                    >
                      <Calculator className="w-3.5 h-3.5 text-brand-400" />
                      <span>ROI</span>
                    </button>
                    <button
                      onClick={() => viewCompanyDetail(opp.companyId)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition-colors"
                    >
                      <span>Dossier</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4-Pillar Score Bar */}
              <div className="pt-3 border-t border-slate-800/70 grid grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Evidence Quality</span>
                  <span className="font-mono font-bold text-slate-200">{opp.score.evidenceQuality}/30</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Tech Feasibility</span>
                  <span className="font-mono font-bold text-slate-200">{opp.score.technicalFeasibility}/25</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Economic Fit</span>
                  <span className="font-mono font-bold text-slate-200">{opp.score.economicFit}/25</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Decision Access</span>
                  <span className="font-mono font-bold text-slate-200">{opp.score.decisionMakerAccess}/20</span>
                </div>
              </div>

              {/* Tags and Uncertainty notes */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3 h-3 text-slate-500" />
                  {opp.tags.map((tag, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-slate-400 italic truncate max-w-md">
                  Note: {opp.uncertaintyNotes}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
