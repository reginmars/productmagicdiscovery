import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { Framework, OpportunityCanvas } from '../../types';
import { useStore } from '../../store/useStore';
import FrameworkRecommendation from '../Framework/FrameworkRecommendation';
import FrameworkBuilder from '../Framework/FrameworkBuilder';

interface CreateOpportunityProps {
  onBack: () => void;
}

const CreateOpportunity: React.FC<CreateOpportunityProps> = ({ onBack }) => {
  const { addOpportunity } = useStore();
  const [step, setStep] = useState<'problem' | 'recommendation' | 'builder'>('problem');
  const [problemStatement, setProblemStatement] = useState('');
  const [context, setContext] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<Framework | null>(null);

  const handleProblemSubmit = () => {
    if (problemStatement.trim()) {
      setStep('recommendation');
    }
  };

  const handleFrameworkSelect = (framework: Framework) => {
    setSelectedFramework(framework);
    setStep('builder');
  };

  const handleSaveOpportunity = (opportunity: Partial<OpportunityCanvas>) => {
    addOpportunity(opportunity as OpportunityCanvas);
    onBack();
  };

  if (step === 'builder' && selectedFramework) {
    return (
      <FrameworkBuilder
        framework={selectedFramework}
        onBack={() => setStep('recommendation')}
        onSave={handleSaveOpportunity}
      />
    );
  }

  if (step === 'recommendation') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep('problem')}
            className="glass-button flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Edit Problem Statement
          </button>
        </div>

        <FrameworkRecommendation
          problemStatement={problemStatement}
          context={context}
          onSelectFramework={handleFrameworkSelect}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="glass-button flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Opportunities
        </button>
      </div>

      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create New Opportunity
          </h2>
          <p className="text-gray-600">
            Start by describing the problem or opportunity you want to explore
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Problem Statement *
            </label>
            <textarea
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              className="glass-input w-full h-32 resize-none"
              placeholder="Describe the problem or opportunity you want to address. Be specific about what you're trying to solve and who it affects..."
            />
            <p className="text-xs text-gray-500 mt-1">
              This will help us recommend the most suitable framework for your needs
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Context (Optional)
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="glass-input w-full h-24 resize-none"
              placeholder="Any additional context about your industry, target users, business goals, or constraints..."
            />
          </div>

          <div className="pt-6">
            <button
              onClick={handleProblemSubmit}
              disabled={!problemStatement.trim()}
              className="w-full glass-button bg-primary-600 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get Framework Recommendations
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateOpportunity;
