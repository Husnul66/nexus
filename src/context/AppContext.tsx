import React, { createContext, useContext, useState } from 'react';
import { 
  CompanyCandidate, 
  Opportunity, 
  DataSourceProvider, 
  SystemSettings, 
  DiscoverySearchQuery,
  CandidateStatus,
  OpportunityStatus,
  OpportunityOutcome
} from '../types';
import { 
  DEMO_FIXTURE_COMPANIES, 
  DEMO_FIXTURE_OPPORTUNITIES, 
  INITIAL_DATA_PROVIDERS, 
  INITIAL_SETTINGS 
} from '../data/fixtures';

export type NavTab = 
  | 'dashboard' 
  | 'discovery' 
  | 'companies' 
  | 'company-detail' 
  | 'opportunities' 
  | 'pipeline' 
  | 'roi-calculator' 
  | 'settings';

interface AppContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string | null) => void;
  environment: 'demo_fixture' | 'live_empty';
  setEnvironment: (env: 'demo_fixture' | 'live_empty') => void;
  companies: CompanyCandidate[];
  opportunities: Opportunity[];
  dataProviders: DataSourceProvider[];
  recentSearches: DiscoverySearchQuery[];
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  addManualCompany: (company: Omit<CompanyCandidate, 'id' | 'accessDate'>) => void;
  updateCompanyStatus: (id: string, status: CandidateStatus) => void;
  updateOpportunityStatus: (id: string, status: OpportunityStatus) => void;
  approveOutreachDraft: (oppId: string, approvedBy: string) => void;
  recordOpportunityOutcome: (oppId: string, outcome: OpportunityOutcome) => void;
  runDiscoverySearch: (query: Omit<DiscoverySearchQuery, 'id' | 'createdAt' | 'resultsCount'>) => void;
  viewCompanyDetail: (companyId: string) => void;
  activeOpportunityForRoi: Opportunity | null;
  setActiveOpportunityForRoi: (opp: Opportunity | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [environment, setEnvironmentState] = useState<'demo_fixture' | 'live_empty'>('demo_fixture');
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);
  
  // Data states
  const [companies, setCompanies] = useState<CompanyCandidate[]>(DEMO_FIXTURE_COMPANIES);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(DEMO_FIXTURE_OPPORTUNITIES);
  const [dataProviders] = useState<DataSourceProvider[]>(INITIAL_DATA_PROVIDERS);
  const [recentSearches, setRecentSearches] = useState<DiscoverySearchQuery[]>([
    {
      id: 'search_01',
      country: 'Turkey',
      cityOrRegion: 'Bursa',
      sector: 'Automotive & Metal Parts',
      employeeRange: '5–50',
      keywords: 'kalıp pres talaşlı',
      createdAt: '2026-11-20 10:15',
      provider: 'Chamber Public Trade Index API',
      resultsCount: 1,
    },
    {
      id: 'search_02',
      country: 'Turkey',
      cityOrRegion: 'Kocaeli (Gebze)',
      sector: 'Logistics & Freight Forwarding',
      employeeRange: '5–50',
      keywords: 'antrepo nakliyat irsaliye',
      createdAt: '2026-11-22 08:45',
      provider: 'Public Business Directory Adapter',
      resultsCount: 1,
    }
  ]);
  const [activeOpportunityForRoi, setActiveOpportunityForRoi] = useState<Opportunity | null>(null);

  // Synchronize environment toggle with datasets
  const setEnvironment = (env: 'demo_fixture' | 'live_empty') => {
    setEnvironmentState(env);
    if (env === 'live_empty') {
      setCompanies([]);
      setOpportunities([]);
      setRecentSearches([]);
    } else {
      setCompanies(DEMO_FIXTURE_COMPANIES);
      setOpportunities(DEMO_FIXTURE_OPPORTUNITIES);
      setRecentSearches([
        {
          id: 'search_01',
          country: 'Turkey',
          cityOrRegion: 'Bursa',
          sector: 'Automotive & Metal Parts',
          employeeRange: '5–50',
          keywords: 'kalıp pres talaşlı',
          createdAt: '2026-11-20 10:15',
          provider: 'Chamber Public Trade Index API',
          resultsCount: 1,
        }
      ]);
    }
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addManualCompany = (candidateData: Omit<CompanyCandidate, 'id' | 'accessDate'>) => {
    const newCompany: CompanyCandidate = {
      ...candidateData,
      id: `comp_manual_${Date.now()}`,
      accessDate: new Date().toISOString().split('T')[0],
      isDemoFixture: environment === 'demo_fixture',
    };
    setCompanies(prev => [newCompany, ...prev]);
  };

  const updateCompanyStatus = (id: string, status: CandidateStatus) => {
    setCompanies(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  };

  const updateOpportunityStatus = (id: string, status: OpportunityStatus) => {
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o));
  };

  const approveOutreachDraft = (oppId: string, approvedBy: string) => {
    setOpportunities(prev => prev.map(o => {
      if (o.id === oppId) {
        return {
          ...o,
          status: 'user_approved',
          outreachDraft: {
            ...o.outreachDraft,
            isApproved: true,
            approvedAt: new Date().toISOString(),
            approvedBy: approvedBy || 'Proje Sahibi (Nexus User)',
          },
          updatedAt: new Date().toISOString(),
        };
      }
      return o;
    }));
  };

  const recordOpportunityOutcome = (oppId: string, outcome: OpportunityOutcome) => {
    setOpportunities(prev => prev.map(o => {
      if (o.id === oppId) {
        return {
          ...o,
          status: 'outcome_recorded',
          outcome,
          updatedAt: new Date().toISOString(),
        };
      }
      return o;
    }));
  };

  const runDiscoverySearch = (query: Omit<DiscoverySearchQuery, 'id' | 'createdAt' | 'resultsCount'>) => {
    const searchId = `search_${Date.now()}`;
    const newSearch: DiscoverySearchQuery = {
      ...query,
      id: searchId,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      resultsCount: environment === 'demo_fixture' ? Math.floor(Math.random() * 3) + 1 : 0,
    };
    setRecentSearches(prev => [newSearch, ...prev]);
  };

  const viewCompanyDetail = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setActiveTab('company-detail');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedCompanyId,
        setSelectedCompanyId,
        environment,
        setEnvironment,
        companies,
        opportunities,
        dataProviders,
        recentSearches,
        settings,
        updateSettings,
        addManualCompany,
        updateCompanyStatus,
        updateOpportunityStatus,
        approveOutreachDraft,
        recordOpportunityOutcome,
        runDiscoverySearch,
        viewCompanyDetail,
        activeOpportunityForRoi,
        setActiveOpportunityForRoi,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
