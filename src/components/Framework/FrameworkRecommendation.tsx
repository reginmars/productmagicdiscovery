import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, BarChart3, Users, Target, Zap } from 'lucide-react';
import { Framework } from '../../types';
import { getFrameworkRecommendations } from '../../data/frameworks';

interface FrameworkRecommendationProps {
  problemStatement: string;
  context?: string;
  onSelectFramework: (framework: Framework) => void;
}

const FrameworkRecommendation: React.FC<FrameworkRecommendationProps> = ({
  problemStatement,
  context,
  onSelectFramework
}) => {
  const [recommendations, setRecommendations] = useState<Framework[]>([]);
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  useEffect(() => {
    if (problemStatement.trim()) {
      const recs = getFrameworkRecommendations(problemStatement, context);
      setRecommendations(recs);
    }
  }, [problemStatement, context]);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'opportunity_definition': return <Target className="w-5 h-5" />;
      case 'user_experience': return <Users className="w-5 h-5" />;
      case 'customer_insight': return <Lightbulb className="w-5 h-5" />;
      case 'validation': return <BarChart3 className="w-5 h-5" />;
      case 'behavior_change': return <Zap className="w-5 h-5" />;
      case 'project_management': return <Clock className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  if (!problemStatement.trim() || recommendations.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          Framework Recommendations
        </h3>
        <p className="text-gray-500">
          Enter a problem statement to get personalized framework recommendations
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-800">
            Recommended Frameworks
          </h3>
        </div>
        <p className="text-gray-600 mb-6">
          Based on your problem statement, here are the most suitable frameworks to guide your discovery process:
        </p>

        <div className="grid gap-4">
          {recommendations.map((framework, index) => (
            <motion.div
              key={framework.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedFramework?.id === framework.id ? 'ring-2 ring-primary-400' : ''
              }`}
              onClick={() => setSelectedFramework(framework)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                    {getCategoryIcon(framework.category)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {framework.name}
                    </h4>
                    <p className="text-sm text-gray-600 capitalize">
                      {framework.category.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(framework.complexity)}`}>
                    {framework.complexity}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {framework.timeToComplete}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{framework.description}</p>

              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-800 mb-2">Best for:</h5>
                <div className="flex flex-wrap gap-2">
                  {framework.bestFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {framework.sections.length} sections
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFramework(framework);
                  }}
                  className="glass-button text-primary-600 hover:bg-primary-50"
                >
                  Use This Framework
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedFramework && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Framework Preview: {selectedFramework.name}
          </h4>
          
          <div className="space-y-4">
            {selectedFramework.sections.map((section) => (
              <div key={section.id} className="border-l-4 border-primary-200 pl-4">
                <h5 className="font-medium text-gray-800 mb-1">
                  {section.title}
                  {section.required && <span className="text-red-500 ml-1">*</span>}
                </h5>
                <p className="text-sm text-gray-600 mb-2">{section.description}</p>
                <div className="text-xs text-gray-500">
                  {section.questions.length} question{section.questions.length !== 1 ? 's' : ''}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-glass-border">
            <button
              onClick={() => onSelectFramework(selectedFramework)}
              className="w-full glass-button bg-primary-600 text-white hover:bg-primary-700 py-3"
            >
              Start with {selectedFramework.name}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FrameworkRecommendation;
