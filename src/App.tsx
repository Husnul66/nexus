import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { DiscoveryScreen } from './components/screens/DiscoveryScreen';
import { CompaniesScreen } from './components/screens/CompaniesScreen';
import { CompanyDetailScreen } from './components/screens/CompanyDetailScreen';
import { OpportunitiesScreen } from './components/screens/OpportunitiesScreen';
import { PipelineScreen } from './components/screens/PipelineScreen';
import { RoiCalculatorScreen } from './components/screens/RoiCalculatorScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  switch (activeTab) {
    case 'dashboard':
      return <DashboardScreen />;
    case 'discovery':
      return <DiscoveryScreen />;
    case 'companies':
      return <CompaniesScreen />;
    case 'company-detail':
      return <CompanyDetailScreen />;
    case 'opportunities':
      return <OpportunitiesScreen />;
    case 'pipeline':
      return <PipelineScreen />;
    case 'roi-calculator':
      return <RoiCalculatorScreen />;
    case 'settings':
      return <SettingsScreen />;
    default:
      return <DashboardScreen />;
  }
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppLayout>
        <MainContent />
      </AppLayout>
    </AppProvider>
  );
};

export default App;
