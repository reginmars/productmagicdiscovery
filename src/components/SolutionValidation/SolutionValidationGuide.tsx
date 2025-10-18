import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, BarChart3, Lightbulb, Target, ArrowRight } from 'lucide-react';

interface SolutionValidationGuideProps {
  problemData: any;
  onComplete: (validationPlan: any) => void;
}

const SolutionValidationGuide: React.FC<SolutionValidationGuideProps> = ({ problemData, onComplete }) => {
  const [validationPlan, setValidationPlan] = useState({
    hypotheses: problemData.solutionHypotheses || [],
    validationMethods: [],
    successMetrics: '',
    timeline: '',
    resources: '',
    riskMitigation: problemData.riskAssessment || ''
  });

  const validationMethods = [
    {
      id: 'user-interviews',
      name: 'User Interviews',
      description: 'Qualitative insights from target users',
      bestFor: 'Understanding user needs and pain points',
      timeframe: '1-2 weeks',
      effort: 'Medium'
    },
    {
      id: 'prototype-testing',
      name: 'Prototype Testing',
      description: 'Test concepts with interactive prototypes',
      bestFor: 'Validating user experience and usability',
      timeframe: '2-3 weeks',
      effort: 'High'
    },
    {
      id: 'ab-testing',
      name: 'A/B Testing',
      description: 'Compare solutions with statistical significance',
      bestFor: 'Measuring impact on key metrics',
      timeframe: '2-4 weeks',
      effort: 'Medium'
    },
    {
      id: 'surveys',
      name: 'User Surveys',
      description: 'Quantitative feedback from larger user base',
      bestFor: 'Validating assumptions at scale',
      timeframe: '1 week',
      effort: 'Low'
    },
    {
      id: 'analytics',
      name: 'Behavioral Analytics',
      description: 'Analyze user behavior patterns',
      bestFor: 'Understanding current user journeys',
      timeframe: 'Ongoing',
      effort: 'Low'
    },
    {
      id: 'mvp',
      name: 'MVP Release',
      description: 'Build minimum viable solution',
      bestFor: 'Real-world validation with actual users',
      timeframe: '4-8 weeks',
      effort: 'High'
    }
  ];

  const handleMethodToggle = (methodId: string) => {
    setValidationPlan(prev => ({
      ...prev,
      validationMethods: prev.validationMethods.includes(methodId)
        ? prev.validationMethods.filter(m => m !== methodId)
        : [...prev.validationMethods, methodId]
    }));
  };

  const getRecommendedMethods = () => {
    // Logic to recommend methods based on problem type and context
    const problemText = problemData.problemStatement?.toLowerCase() || '';
    const recommended = [];

    if (problemText.includes('user') || problemText.includes('experience')) {
      recommended.push('user-interviews', 'prototype-testing');
    }
    if (problemText.includes('conversion') || problemText.includes('metric')) {
      recommended.push('ab-testing', 'analytics');
    }
    if (problemText.includes('new') || problemText.includes('feature')) {
      recommended.push('mvp', 'surveys');
    }

    return recommended.length > 0 ? recommended : ['user-interviews', 'prototype-testing', 'ab-testing'];
  };

  const recommendedMethods = getRecommendedMethods();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Solution Validation Strategy</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800 mb-2">Problem Context</h3>
          <p className="text-sm text-blue-700">{problemData.problemStatement}</p>
        </div>
      </div>

      {/* Solution Hypotheses */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Solution Hypotheses to Validate</h3>
        <div className="space-y-3">
          {validationPlan.hypotheses.map((hypothesis, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-medium mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-800">{hypothesis}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Methods */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Validation Methods</h3>
        
        <div className="mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">💡 Recommended for your problem type</h4>
            <div className="flex flex-wrap gap-2">
              {recommendedMethods.map(methodId => {
                const method = validationMethods.find(m => m.id === methodId);
                return (
                  <span key={methodId} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {method?.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {validationMethods.map((method) => (
            <div
              key={method.id}
              className={`glass-card p-4 cursor-pointer transition-all ${
                validationPlan.validationMethods.includes(method.id)
                  ? 'ring-2 ring-primary-400 bg-primary-50'
                  : 'hover:shadow-md'
              } ${recommendedMethods.includes(method.id) ? 'border-green-200' : ''}`}
              onClick={() => handleMethodToggle(method.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{method.name}</h4>
                <div className="flex items-center gap-2">
                  {recommendedMethods.includes(method.id) && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    validationPlan.validationMethods.includes(method.id)
                      ? 'bg-primary-600 border-primary-600'
                      : 'border-gray-300'
                  }`}>
                    {validationPlan.validationMethods.includes(method.id) && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{method.description}</p>
              
              <div className="space-y-1 text-xs text-gray-500">
                <div><strong>Best for:</strong> {method.bestFor}</div>
                <div className="flex justify-between">
                  <span><strong>Timeline:</strong> {method.timeframe}</span>
                  <span><strong>Effort:</strong> {method.effort}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Define Success Metrics</h3>
        <textarea
          value={validationPlan.successMetrics}
          onChange={(e) => setValidationPlan(prev => ({ ...prev, successMetrics: e.target.value }))}
          className="glass-input w-full h-32 resize-none"
          placeholder="How will you measure if your solution hypotheses are correct?
e.g., 
- Increase task completion rate from 60% to 80%
- Reduce time to complete onboarding from 10 min to 5 min
- Achieve 4.5+ satisfaction score in user testing"
        />
      </div>

      {/* Timeline & Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Validation Timeline</h3>
          <textarea
            value={validationPlan.timeline}
            onChange={(e) => setValidationPlan(prev => ({ ...prev, timeline: e.target.value }))}
            className="glass-input w-full h-24 resize-none"
            placeholder="Week 1-2: User interviews
Week 3-4: Prototype development
Week 5-6: Prototype testing
Week 7-8: Analysis and iteration"
          />
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Required Resources</h3>
          <textarea
            value={validationPlan.resources}
            onChange={(e) => setValidationPlan(prev => ({ ...prev, resources: e.target.value }))}
            className="glass-input w-full h-24 resize-none"
            placeholder="- UX Designer (20 hours)
- Developer (40 hours)
- 20 user interview participants
- Analytics tools access"
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={() => onComplete(validationPlan)}
          disabled={validationPlan.validationMethods.length === 0 || !validationPlan.successMetrics}
          className="glass-button bg-primary-600 text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          Create Validation Plan
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default SolutionValidationGuide;
