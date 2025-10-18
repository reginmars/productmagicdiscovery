import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import ProblemDiscoveryHub from './components/ProblemDiscovery/ProblemDiscoveryHub';
import OpportunityList from './components/Opportunities/OpportunityList';
import MethodologyLibrary from './components/MethodologyLibrary/MethodologyLibrary';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'discovery':
        return <ProblemDiscoveryHub />;
      case 'opportunities':
        return <OpportunityList />;
      case 'frameworks':
        return <MethodologyLibrary />;
      case 'analytics':
        return (
          <div className="p-8">
            <div className="glass-card p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Discovery Analytics</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="p-8">
            <div className="glass-card p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Team Collaboration</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <div className="glass-card p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
