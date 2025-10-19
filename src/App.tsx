import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import ProblemDiscoveryPage from './components/ProblemDiscovery/ProblemDiscoveryPage';
import AnalysisPage from './components/ProblemDiscovery/AnalysisPage';
import OpportunityList from './components/Opportunities/OpportunityList';
import ResourcesPage from './components/Resources/ResourcesPage';
import PracticeGuidePage from './components/PracticeGuide/PracticeGuidePage';
import { ProblemDiscovery } from './types';

type ViewState = 'dashboard' | 'discovery' | 'analysis' | 'hmw' | 'opportunities' | 'analytics' | 'resources' | 'practice-guide' | 'settings';

function App() {
  const [activeTab, setActiveTab] = useState<ViewState>('dashboard');
  const [currentDiscovery, setCurrentDiscovery] = useState<ProblemDiscovery | null>(null);

  const handleStartDiscovery = () => {
    setActiveTab('discovery');
  };

  const handleProceedToAnalysis = (discovery: ProblemDiscovery) => {
    setCurrentDiscovery(discovery);
    setActiveTab('analysis');
  };

  const handleProceedToHMW = (discovery: ProblemDiscovery) => {
    setCurrentDiscovery(discovery);
    setActiveTab('hmw');
  };

  const handleBackFromDiscovery = () => {
    setActiveTab('dashboard');
    setCurrentDiscovery(null);
  };

  const handleBackFromAnalysis = () => {
    setActiveTab('discovery');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onStartDiscovery={handleStartDiscovery} />;
      
      case 'discovery':
        return (
          <ProblemDiscoveryPage
            onBack={handleBackFromDiscovery}
            onProceedToAnalysis={handleProceedToAnalysis}
          />
        );
      
      case 'analysis':
        return currentDiscovery ? (
          <AnalysisPage
            discovery={currentDiscovery}
            onBack={handleBackFromAnalysis}
            onProceedToHMW={handleProceedToHMW}
          />
        ) : null;
      
      case 'hmw':
        return (
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">"How Might We" Statement Generation</h2>
            <p className="text-gray-600">Coming next: Generate 2-3 HMW statements from your validated problem...</p>
          </div>
        );
      
      case 'opportunities':
        return <OpportunityList />;
      
      case 'analytics':
        return (
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Discovery Analytics</h2>
            <p className="text-gray-600">Insights into your problem discovery effectiveness coming soon...</p>
          </div>
        );
      
      case 'resources':
        return <ResourcesPage />;
      
      case 'practice-guide':
        return <PracticeGuidePage />;
      
      case 'settings':
        return (
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">Platform configuration coming soon...</p>
          </div>
        );
      
      default:
        return <Dashboard onStartDiscovery={handleStartDiscovery} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 font-inter">
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col">
          <Header />
          
          <main className="flex-1 p-8 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#374151',
          },
        }}
      />

      {/* Floating background elements for glassmorphism effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, -150, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary-200/20 to-primary-200/20 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}

export default App;
