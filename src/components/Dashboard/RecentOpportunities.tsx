import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, BarChart3, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const RecentOpportunities: React.FC = () => {
  const opportunities = [
    {
      id: '1',
      title: 'Mobile App User Onboarding Optimization',
      framework: 'Design Thinking',
      status: 'in_review',
      completenessScore: 85,
      updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      assignee: 'Alex Johnson'
    },
    {
      id: '2',
      title: 'E-commerce Checkout Flow Improvement',
      framework: 'Opportunity Canvas',
      status: 'draft',
      completenessScore: 62,
      updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      assignee: 'Maria Garcia'
    },
    {
      id: '3',
      title: 'Customer Support Chatbot Enhancement',
      framework: 'Behavioral Science',
      status: 'approved',
      completenessScore: 95,
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      assignee: 'David Kim'
    },
    {
      id: '4',
      title: 'SaaS Dashboard Analytics Integration',
      framework: 'Agile Methodology',
      status: 'in_review',
      completenessScore: 78,
      updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      assignee: 'Sarah Chen'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Recent Opportunities</h3>
        <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        {opportunities.map((opportunity, index) => (
          <motion.div
            key={opportunity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5 border border-glass-border hover:shadow-md transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{opportunity.title}</h4>
                <p className="text-sm text-gray-600">{opportunity.framework}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(opportunity.status)}`}>
                {opportunity.status.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{opportunity.assignee}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{formatDistanceToNow(opportunity.updatedAt, { addSuffix: true })}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-gray-500" />
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${opportunity.completenessScore}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 w-8">{opportunity.completenessScore}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentOpportunities;
