import React, { useState } from 'react';
import { 
  Compass, 
  Search, 
  Check, 
  AlertTriangle, 
  ExternalLink,
  Database
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../common/Card';
import { CandidateStatusBadge, MatchConfidenceBadge } from '../common/Badge';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { EmptyState } from '../common/EmptyState';

export const DiscoveryScreen: React.FC = () => {
  const { 
    companies, 
    dataProviders, 
    recentSearches, 
    runDiscoverySearch, 
    updateCompanyStatus, 
    viewCompanyDetail,
    environment,
    setEnvironment
  } = useApp();

  // Search filter states (mandated defaults: 5–50 employees, Turkey default or international)
  const [country, setCountry] = useState('Turkey');
  const [cityOrRegion, setCityOrRegion] = useState('Bursa');
  const [sector, setSector] = useState('Automotive & Metal Parts');
  const [employeeRange, setEmployeeRange] = useState('5–50');
  const [keywords, setKeywords] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(dataProviders[0]?.id || 'public_registry_adapter');
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuccessMessage, setSearchSuccessMessage] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchSuccessMessage(null);

    setTimeout(() => {
      runDiscoverySearch({
        country,
        cityOrRegion,
        sector,
        employeeRange,
        keywords: keywords.trim() || undefined,
        provider: dataProviders.find(p => p.id === selectedProvider)?.name || selectedProvider,
      });
      setIsSearching(false);
      setSearchSuccessMessage(
        environment === 'demo_fixture'
          ? `Discovered ${companies.length} candidate businesses in ${cityOrRegion}, ${country} matching criteria.`
          : 'Search executed in Live Mode. No external live scraping backend configured yet (Local-first state).'
      );
    }, 600);
  };

  const activeProviderObj = dataProviders.find(p => p.id === selectedProvider);

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-brand-400" />
            Target Business Discovery (FR-01)
          </h2>
          <p className="text-xs text-slate-400">
            Query compliant public business registries with bounded filters. Defaults to SME profile (5–50 employees).
          </p>
        </div>
      </div>

      {/* Main Search Builder Card */}
      <Card>
        <CardHeader
          title="Discovery Query Configuration"
          subtitle="Mandatory location & sector filters prevent unconstrained web scraping"
          badge={
            activeProviderObj && (
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                activeProviderObj.complianceStatus === 'compliant'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                  : 'bg-amber-950/80 text-amber-300 border-amber-800'
              }`}>
                Provider: {activeProviderObj.complianceStatus.toUpperCase()}
              </span>
            )
          }
        />
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {/* Country */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Country <span className="text-rose-400">*</span>
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-brand-500"
                >
                  <option value="Turkey">Turkey</option>
                  <option value="Germany">Germany</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                </select>
              </div>

              {/* City / Region */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  City or Region <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={cityOrRegion}
                  onChange={(e) => setCityOrRegion(e.target.value)}
                  placeholder="e.g. Bursa, Kocaeli, Hamburg"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Sector */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Sector <span className="text-rose-400">*</span>
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-brand-500"
                >
                  <option value="Automotive & Metal Parts">Automotive & Metal Parts</option>
                  <option value="Logistics & Freight Forwarding">Logistics & Freight Forwarding</option>
                  <option value="Medical Devices & Service">Medical Devices & Service</option>
                  <option value="Industrial Manufacturing">Industrial Manufacturing</option>
                  <option value="Food & Wholesale Distribution">Food & Wholesale Distribution</option>
                  <option value="Construction & Contracting">Construction & Contracting</option>
                </select>
              </div>

              {/* Employee Range (Defaulting to 5–50) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">
                    Employee Range
                  </label>
                  <span className="text-[10px] text-brand-400 font-mono">Default: 5–50</span>
                </div>
                <input
                  type="text"
                  value={employeeRange}
                  onChange={(e) => setEmployeeRange(e.target.value)}
                  placeholder="5–50"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Optional Keywords */}
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Optional Search Keywords (Process signals)
                </label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="e.g. pres kalıp irsaliye excel depo sevkiyat"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Source Adapter Provider */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Compliant Source Adapter
                </label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-brand-500"
                >
                  {dataProviders.map(p => (
                    <option key={p.id} value={p.id} disabled={!p.isAvailable}>
                      {p.name} {p.isAvailable ? `(${p.dailyQuotaRemaining} quota)` : '(Review Required)'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Provider limits and submit row */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
              <div className="flex items-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-brand-400" />
                  Rate Limit: {activeProviderObj?.rateLimitPerMin || 30} req/min
                </span>
                <span>•</span>
                <span>Robots.txt & ToS Compliant</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setKeywords('');
                    setCityOrRegion('Bursa');
                  }}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSearching}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all disabled:opacity-50"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{isSearching ? 'Querying Public Adapter...' : 'Run Discovery Search'}</span>
                </button>
              </div>
            </div>
          </form>

          {searchSuccessMessage && (
            <div className="mt-4 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{searchSuccessMessage}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Discovery Results Candidates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">
            Discovered Candidates ({companies.length})
          </h3>
          <span className="text-xs text-slate-400">
            Directly observed facts vs. missing attributes
          </span>
        </div>

        {companies.length === 0 ? (
          <EmptyState
            icon={Compass}
            title="No Candidate Businesses In View"
            description="Run a discovery search above, or add a manual company website URL to start evidence-backed opportunity research."
            actionLabel="Load Demo Fixtures"
            onAction={() => setEnvironment('demo_fixture')}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {companies.map((company) => (
              <Card key={company.id} className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <InitialsAvatar name={company.name} size="lg" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-sm font-semibold text-slate-100 hover:text-brand-400 cursor-pointer transition-colors"
                            onClick={() => viewCompanyDetail(company.id)}>
                          {company.name}
                        </h4>
                        <CandidateStatusBadge status={company.status} />
                        <MatchConfidenceBadge confidence={company.matchConfidence} />
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>{company.city}, {company.country}</span>
                        <span>•</span>
                        <span className="text-brand-400 font-medium">{company.sector}</span>
                        <span>•</span>
                        <span className="font-mono text-slate-300">Staff: {company.employeeRange}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateCompanyStatus(company.id, 'promoted_to_research')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        company.status === 'promoted_to_research'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                          : 'bg-brand-600 hover:bg-brand-500 text-white'
                      }`}
                    >
                      {company.status === 'promoted_to_research' ? 'In Research ✓' : 'Promote to Research'}
                    </button>
                    <button
                      onClick={() => viewCompanyDetail(company.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    >
                      Full Dossier
                    </button>
                  </div>
                </div>

                {/* Evidence & Missing Fields Grid */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800/70 text-xs">
                  {/* Observed Facts */}
                  <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      Observed Public Facts (Direct Evidence)
                    </span>
                    <ul className="space-y-1 text-slate-300 list-disc list-inside">
                      {company.observedFacts.map((fact, idx) => (
                        <li key={idx} className="leading-relaxed">{fact}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Fields */}
                  <div className="space-y-1.5 bg-slate-950/50 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Missing / Unverified Attributes
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {company.missingFields.map((field, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                          {field}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 pt-1 italic">
                      *Nexus does not hallucinate private financials or budgets.
                    </p>
                  </div>
                </div>

                {/* Provenance footer */}
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <div className="flex items-center gap-2">
                    <span>Source: {company.sourceProvider}</span>
                    <span>•</span>
                    <span>Accessed: {company.accessDate}</span>
                  </div>
                  {company.publicSourceUrl && (
                    <a 
                      href={company.publicSourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 transition-colors"
                    >
                      <span>Public Source Record</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent Discovery Searches History */}
      {recentSearches.length > 0 && (
        <Card>
          <CardHeader
            title="Recent Discovery Searches"
            subtitle="Audit history of executed registry searches and parameters"
          />
          <CardContent className="p-0">
            <div className="divide-y divide-slate-800/70 text-xs">
              {recentSearches.map((s) => (
                <div key={s.id} className="p-3.5 flex items-center justify-between hover:bg-slate-800/30">
                  <div className="flex items-center gap-4">
                    <div className="font-medium text-slate-200">
                      {s.sector} — <span className="text-slate-400">{s.cityOrRegion}, {s.country}</span>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      Range: {s.employeeRange}
                    </span>
                    {s.keywords && (
                      <span className="text-[11px] text-brand-400 italic">
                        "{s.keywords}"
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span>{s.createdAt}</span>
                    <span>•</span>
                    <span className="text-slate-300">{s.provider}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
