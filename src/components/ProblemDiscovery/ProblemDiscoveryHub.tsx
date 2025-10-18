import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Search, Filter, TrendingUp, Clock, Users, Target } from 'lucide-react';
import { ProblemDiscovery } from '../../types';
import { useStore } from '../../store/useStore';
import ProblemDiscoveryPage from './ProblemDiscoveryPage';
import AnalysisPage from './AnalysisPage';
import HMWGenerationPage from './HMWGenerationPage';

type ViewMode = 'list' | 'discovery' | 'analysis' | 'hmw';

const ProblemDiscoveryHub: React.FC = () => {
  const { discoveries } = useStore();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedDiscovery, setSelectedDiscovery] = useState<ProblemDiscovery | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleStartDiscovery = () => {
    setViewMode('discovery');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedDiscovery(null);
  };

  const handleProceedToAnalysis = (discovery: ProblemDiscovery) => {
    setSelectedDiscovery(discovery);
    setViewMode('analysis');
  };

  const handleProceedToHMW = (discovery: ProblemDiscovery) => {
    setSelectedDiscovery(discovery);
    setViewMode('hmw');
  };

  const filteredDiscoveries = discoveries.filter(discovery => {
    const matchesSearch = 
      discovery.problemDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discovery.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || discovery.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'analyzing': return 'bg-blue-100 text-blue-700';
      case 'validated': return 'bg-green-100 text-green-700';
      case 'in_progress': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'analyzing': return 'Analyzing';
      case 'validated': return 'Validated';
      case 'in_progress': return 'In Progress';
      default: return status;
    }
  };

  if (viewMode === 'discovery') {
    return (
      <ProblemDiscoveryPage
        onBack={handleBackToList}
        onProceedToAnalysis={handleProceedToAnalysis}
      />
    );
  }

  if (viewMode === 'analysis' && selectedDiscovery) {
    return (
      <div className="p-8">
        <AnalysisPage
          discovery={selectedDiscovery}
          onBack={handleBackToList}
          onProceedToHMW={handleProceedToHMW}
        />
      </div>
    );
  }

  if (viewMode === 'hmw' && selectedDiscovery) {
    return (
      <div className="p-8">
        <HMWGenerationPage
          discovery={selectedDiscovery}
          onBack={handleBackToList}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Problem Discovery Hub</h1>
              <p className="text-gray-600">
                Start with understanding the problem before jumping to solutions
              </p>
            </div>
            <button
              onClick={handleStartDiscovery}
              className="glass-button bg-primary-600 text-white px-6 py-3 flex items-center gap-2"
            >
              <Plus size={20} />
              Start New Discovery
            </button>
          </div>

          {/* Search and Filters */}
          <div className="glass-card p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search discoveries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input pl-10 w-full"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="glass-input pl-10 w-full"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="analyzing">Analyzing</option>
                  <option value="validated">Validated</option>
                  <option value="in_progress">In Progress</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Discovery List */}
        {filteredDiscoveries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 text-center"
          >
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Discoveries Yet</h2>
            <p className="text-gray-600 mb-6">
              Start your first problem discovery to identify real user needs and validate opportunities
            </p>
            <button
              onClick={handleStartDiscovery}
              className="glass-button bg-primary-600 text-white px-6 py-3 flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Start Discovery
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiscoveries.map((discovery, index) => (
              <motion.div
                key={discovery.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => {
                  setSelectedDiscovery(discovery);
                  if (discovery.status === 'draft') {
                    setViewMode('analysis');
                  } else if (discovery.status === 'validated') {
                    setViewMode('hmw');
                  } else {
                    setViewMode('analysis');
                  }
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-500">{discovery.industry}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(discovery.status)}`}>
                        {getStatusLabel(discovery.status)}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {discovery.problemDescription}
                    </h3>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Affected Users</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target className="w-4 h-4" />
                    <span className="text-xs">Business Impact</span>
                  </div>
                </div>

                {/* Evidence Preview */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Evidence:</p>
                  <p className="text-sm text-gray-700 line-clamp-2">{discovery.evidence}</p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {new Date(discovery.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    by {discovery.createdBy}
                  </div>
                </div>

                {/* Confidence Score (if analyzed) */}
                {discovery.analysis && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-700">Confidence Score</span>
                      <span className="text-sm font-bold text-green-600">
                        {discovery.analysis.confidenceScore}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 transition-all"
                        style={{ width: `${discovery.analysis.confidenceScore}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats Overview */}
        {discoveries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{discoveries.length}</p>
                  <p className="text-xs text-gray-600">Total Discoveries</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {discoveries.filter(d => d.status === 'draft').length}
                  </p>
                  <p className="text-xs text-gray-600">In Draft</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {discoveries.filter(d => d.status === 'validated').length}
                  </p>
                  <p className="text-xs text-gray-600">Validated</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {discoveries.filter(d => d.status === 'in_progress').length}
                  </p>
                  <p className="text-xs text-gray-600">In Progress</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProblemDiscoveryHub;
