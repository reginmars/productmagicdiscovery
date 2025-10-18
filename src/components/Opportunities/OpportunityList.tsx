import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import { useStore } from '../../store/useStore';
import OpportunityCard from './OpportunityCard';
import CreateOpportunity from './CreateOpportunity';

const OpportunityList: React.FC = () => {
  const { opportunities, setCurrentOpportunity } = useStore();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreate, setShowCreate] = useState(false);

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || opp.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleOpportunityClick = (opportunity: any) => {
    setCurrentOpportunity(opportunity);
  };

  if (showCreate) {
    return <CreateOpportunity onBack={() => setShowCreate(false)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Opportunities</h2>
          <p className="text-gray-600">Manage your product discovery opportunities</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="glass-button bg-primary-600 text-white flex items-center gap-2 px-6 py-3"
        >
          <Plus size={20} />
          Create Opportunity
        </button>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input pl-10 w-full"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="glass-input"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="in_review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setView('grid')}
              className={`glass-button p-2 ${view === 'grid' ? 'bg-primary-100 text-primary-600' : ''}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`glass-button p-2 ${view === 'list' ? 'bg-primary-100 text-primary-600' : ''}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No opportunities found' : 'No opportunities yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first opportunity to get started with product discovery'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button
                onClick={() => setShowCreate(true)}
                className="glass-button bg-primary-600 text-white px-6 py-3"
              >
                Create Your First Opportunity
              </button>
            )}
          </div>
        ) : (
          <div className={view === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onClick={() => handleOpportunityClick(opportunity)}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default OpportunityList;
