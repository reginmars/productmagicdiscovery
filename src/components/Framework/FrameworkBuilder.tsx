import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, MessageSquare } from 'lucide-react';
import { Framework, OpportunityCanvas } from '../../types';
import { useStore } from '../../store/useStore';

interface FrameworkBuilderProps {
  framework: Framework;
  onBack: () => void;
  onSave: (opportunity: Partial<OpportunityCanvas>) => void;
}

const FrameworkBuilder: React.FC<FrameworkBuilderProps> = ({
  framework,
  onBack,
  onSave
}) => {
  const { user } = useStore();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (questionId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentSection < framework.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleSave = () => {
    const opportunity: Partial<OpportunityCanvas> = {
      id: `opp-${Date.now()}`,
      title: formData['problem-desc']?.substring(0, 100) || 'New Opportunity',
      description: formData['problem-desc'] || '',
      problemStatement: formData['problem-desc'] || '',
      framework: framework.id,
      status: 'draft',
      completenessScore: calculateCompleteness(),
      createdBy: user?.name || 'Unknown',
      createdAt: new Date(),
      updatedAt: new Date(),
      version: 1,
      targetUsers: [],
      businessGoals: [],
      successMetrics: [],
      assumptions: [],
      risks: [],
      solutionHypothesis: formData['solution-desc'] || '',
      roiCalculation: {
        implementationCost: 0,
        timeToMarket: 0,
        revenueImpact: 0,
        costSavings: 0,
        marketOpportunitySize: 0,
        roi: 0
      }
    };

    onSave(opportunity);
  };

  const calculateCompleteness = () => {
    const totalQuestions = framework.sections.reduce((acc, section) => acc + section.questions.length, 0);
    const answeredQuestions = Object.keys(formData).filter(key => formData[key]?.toString().trim()).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const currentSectionData = framework.sections[currentSection];
  const progress = ((currentSection + 1) / framework.sections.length) * 100;

  if (isPreview) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsPreview(false)}
            className="glass-button flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Editor
          </button>
          <button
            onClick={handleSave}
            className="glass-button bg-primary-600 text-white flex items-center gap-2"
          >
            <Save size={16} />
            Save Opportunity
          </button>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {framework.name} - Preview
          </h2>

          {framework.sections.map((section) => (
            <div key={section.id} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-glass-border pb-2">
                {section.title}
              </h3>
              
              {section.questions.map((question) => (
                <div key={question.id} className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">{question.text}</h4>
                  <div className="glass-card p-4 bg-gray-50">
                    {formData[question.id] ? (
                      <p className="text-gray-800">{formData[question.id]}</p>
                    ) : (
                      <p className="text-gray-500 italic">Not answered</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
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
          Back to Recommendations
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPreview(true)}
            className="glass-button flex items-center gap-2"
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            onClick={handleSave}
            className="glass-button bg-primary-600 text-white flex items-center gap-2"
          >
            <Save size={16} />
            Save Draft
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              {framework.name}
            </h2>
            <span className="text-sm text-gray-600">
              Section {currentSection + 1} of {framework.sections.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {currentSectionData.title}
            {currentSectionData.required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          <p className="text-gray-600 mb-6">{currentSectionData.description}</p>

          <div className="space-y-6">
            {currentSectionData.questions.map((question) => (
              <div key={question.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {question.text}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                
                {question.type === 'textarea' ? (
                  <textarea
                    value={formData[question.id] || ''}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    className="glass-input w-full h-32 resize-none"
                    placeholder={question.helpText}
                  />
                ) : question.type === 'text' ? (
                  <input
                    type="text"
                    value={formData[question.id] || ''}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    className="glass-input w-full"
                    placeholder={question.helpText}
                  />
                ) : question.type === 'select' ? (
                  <select
                    value={formData[question.id] || ''}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    className="glass-input w-full"
                  >
                    <option value="">Select an option</option>
                    {question.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : null}
                
                {question.helpText && (
                  <p className="text-xs text-gray-500 mt-1">{question.helpText}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-glass-border">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="glass-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            <MessageSquare size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {calculateCompleteness()}% complete
            </span>
          </div>
          
          {currentSection === framework.sections.length - 1 ? (
            <button
              onClick={() => setIsPreview(true)}
              className="glass-button bg-primary-600 text-white"
            >
              Review & Save
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="glass-button bg-primary-600 text-white"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FrameworkBuilder;
