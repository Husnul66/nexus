import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  ArrowUpRight 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../common/Card';
import { CandidateStatusBadge } from '../common/Badge';
import { InitialsAvatar } from '../common/InitialsAvatar';
import { EmptyState } from '../common/EmptyState';

export const CompaniesScreen: React.FC = () => {
  const { companies, viewCompanyDetail, setActiveTab, setEnvironment } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.domain && c.domain.toLowerCase().includes(searchTerm.toLowerCase())) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || c.sector === selectedSector;
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;
    return matchesSearch && matchesSector && matchesStatus;
  });

  const sectors = Array.from(new Set(companies.map(c => c.sector)));

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand-400" />
            Qualified Companies Portfolio
          </h2>
          <p className="text-xs text-slate-400">
            Target businesses under observation. Evidence is strictly separated from unverified assumptions.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('discovery')}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium bg-brand-600 hover:bg-brand-500 text-white rounded-lg transition-colors shadow-sm"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Discover More Candidates</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search companies by name, domain, or city..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-brand-500"
              >
                <option value="all">All Sectors</option>
                {sectors.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 focus:outline-none focus:border-brand-500"
              >
                <option value="all">All Statuses</option>
                <option value="new">New Candidate</option>
                <option value="reviewing">Under Review</option>
                <option value="promoted_to_research">Researching</option>
                <option value="dismissed">Dismissed</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Companies Data Table */}
      <Card>
        <CardContent className="p-0">
          {filteredCompanies.length === 0 ? (
            <div className="p-10">
              <EmptyState
                icon={Building2}
                title="No Companies Found"
                description={
                  companies.length === 0
                    ? "Your company repository is currently empty in this environment."
                    : "No companies match your search and filter criteria."
                }
                actionLabel={companies.length === 0 ? "Load Demo Fixtures" : "Reset Filters"}
                onAction={
                  companies.length === 0 
                    ? () => setEnvironment('demo_fixture') 
                    : () => { setSearchTerm(''); setSelectedSector('all'); setSelectedStatus('all'); }
                }
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-medium">
                    <th className="py-3 px-4">Company & Domain</th>
                    <th className="py-3 px-4">Sector</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Staff Indicator</th>
                    <th className="py-3 px-4">Observed Facts</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {filteredCompanies.map((c) => (
                    <tr 
                      key={c.id} 
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => viewCompanyDetail(c.id)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <InitialsAvatar name={c.name} size="sm" />
                          <div>
                            <span className="font-semibold text-slate-100 group-hover:text-brand-400 transition-colors">
                              {c.name}
                            </span>
                            {c.domain && (
                              <div className="text-[11px] text-slate-400 font-mono">
                                {c.domain}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300">
                        {c.sector}
                      </td>

                      <td className="py-3.5 px-4 text-slate-400">
                        {c.city}, {c.country}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-300">
                        {c.employeeRange}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[11px] flex items-center justify-center font-bold">
                            {c.observedFacts.length}
                          </span>
                          <span className="text-[11px] text-slate-400">proven facts</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <CandidateStatusBadge status={c.status} />
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            viewCompanyDetail(c.id);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700 transition-colors"
                        >
                          <span>Dossier</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
