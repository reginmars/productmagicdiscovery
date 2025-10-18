import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, BarChart3, MessageSquare, MoreHorizontal } from 'lucide-react';
import { OpportunityCanvas } from '../../types';
import { formatDistanceToNow } from 'date-fns';

interface OpportunityCardProps {
  opportunity: OpportunityCanvas;
  onClick: () => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_review': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFrameworkColor = (framework: string) => {
    switch (framework) {
      case 'opportunity_canvas': return 'text-primary-600';
      case 'design_thinking': return 'text-purple-600';
      case 'behavioral_science': return 'text-orange-600';
      case 'agile': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {opportunity.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {opportunity.description}
          </p>
        </div>
        <button className="glass-button p-2 ml-4">
          <MoreHorizontal size={16} className="text-gray-500" />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(opportunity.status)}`}>
          {opportunity.status.replace('_', ' ')}
        </span>
        <span className={`text-xs font-medium ${getFrameworkColor(opportunity.framework)}`}>
          {opportunity.framework.replace('_', ' ')}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 size={14} className="text-gray-500" />
          <span className="text-sm text-gray-600">Completeness</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${opportunity.completenessScore}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-600 w-8">{opportunity.completenessScore}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{opportunity.createdBy}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDistanceToNow(opportunity.updatedAt, { addSuffix: true })}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare size={14} />
          <span>3</span>
        </div>
      </div>

      {opportunity.roiCalculation.roi > 0 && (
        <div className="mt-4 pt-4 border-t border-glass-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Projected ROI</span>
            <span className="text-lg font-semibold text-green-600">
              {(opportunity.roiCalculation.roi * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OpportunityCard;
