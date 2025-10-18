import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Users, Target, Lightbulb } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface ProblemDiscoveryWizardProps {
  onComplete: (discoveryData: any) => void;
  onBack: () => void;
}

const ProblemDiscoveryWizard: React.FC<ProblemDiscoveryWizardProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [discoveryData, setDiscoveryData] = useState({
    // Step 1: Problem Identification
    observedSymptoms: '',
    affectedUsers: '',
    businessImpact: '',
    
    // Step 2: Problem Validation
    evidenceSources: [],
    dataPoints: '',
    userFeedback: '',
    
    // Step 3: Root Cause Analysis
    rootCauseHypothesis: '',
    contributingFactors: [],
    systemicIssues: '',
    
    // Step 4: Problem Statement Refinement
    problemStatement: '',
    targetSegment: '',
    successCriteria: '',
    
    // Step 5: Solution Approach
    solutionHypotheses: [],
    validationPlan: '',
    riskAssessment: ''
  });

  const steps = [
    {
      id: 'symptoms',
      title: 'Identify Symptoms',
      description: 'What observable issues are you seeing?',
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 'validate',
      title: 'Validate with Evidence',
      description: 'Gather data to confirm the problem exists',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      id: 'analyze',
      title: 'Root Cause Analysis',
      description: 'Understand why the problem occurs',
      icon: <Target className="w-6 h-6" />
    },
    {
      id: 'define',
      title: 'Define the Problem',
      description: 'Craft a clear, actionable problem statement',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 'approach',
      title: 'Solution Approach',
      description: 'Plan how to solve the validated problem',
      icon: <Lightbulb className="w-6 h-6" />
    }
  ];

  const updateData = (field: string, value: any) => {
    setDiscoveryData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(discoveryData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-amber-800 mb-2">🎯 Focus on Observable Issues</h4>
              <p className="text-sm text-amber-700">
                Start with what you can see, measure, or hear from users. Avoid jumping to solutions or assumptions about causes.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What symptoms or issues have you observed? *
              </label>
              <textarea
                value={discoveryData.observedSymptoms}
                onChange={(e) => updateData('observedSymptoms', e.target.value)}
                className="glass-input w-full h-32 resize-none"
                placeholder="e.g., Users are dropping off at 60% during checkout, Support tickets increased by 40%, Feature adoption is only 15%..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who is affected by these issues? *
              </label>
              <textarea
                value={discoveryData.affectedUsers}
                onChange={(e) => updateData('affectedUsers', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="e.g., New mobile users, Enterprise customers, Internal sales team..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What business impact are you seeing? *
              </label>
              <textarea
                value={discoveryData.businessImpact}
                onChange={(e) => updateData('businessImpact', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="e.g., 20% revenue loss, Increased churn rate, Higher support costs..."
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-blue-800 mb-2">📊 Evidence-Based Validation</h4>
              <p className="text-sm text-blue-700">
                Validate your observations with concrete data. This prevents solving the wrong problem.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What data sources can validate this problem? *
              </label>
              <div className="space-y-2">
                {['Analytics data', 'User interviews', 'Support tickets', 'Sales feedback', 'Surveys', 'A/B test results', 'Other'].map((source) => (
                  <label key={source} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={discoveryData.evidenceSources.includes(source)}
                      onChange={(e) => {
                        const sources = e.target.checked
                          ? [...discoveryData.evidenceSources, source]
                          : discoveryData.evidenceSources.filter(s => s !== source);
                        updateData('evidenceSources', sources);
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What specific data points support this problem? *
              </label>
              <textarea
                value={discoveryData.dataPoints}
                onChange={(e) => updateData('dataPoints', e.target.value)}
                className="glass-input w-full h-32 resize-none"
                placeholder="e.g., Conversion rate dropped from 12% to 7% over 3 months, 45% of users abandon cart at payment step, NPS score decreased from 8.2 to 6.1..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are users saying about this issue?
              </label>
              <textarea
                value={discoveryData.userFeedback}
                onChange={(e) => updateData('userFeedback', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="Direct quotes from user interviews, support tickets, or feedback..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-purple-800 mb-2">🔍 Root Cause Analysis</h4>
              <p className="text-sm text-purple-700">
                Dig deeper to understand WHY the problem occurs. Use the "5 Whys" technique or fishbone analysis.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you think is the root cause? *
              </label>
              <textarea
                value={discoveryData.rootCauseHypothesis}
                onChange={(e) => updateData('rootCauseHypothesis', e.target.value)}
                className="glass-input w-full h-32 resize-none"
                placeholder="e.g., The checkout process has too many steps and requires information users don't have readily available..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What factors contribute to this problem?
              </label>
              <div className="space-y-2">
                {['Technical limitations', 'Process issues', 'User experience problems', 'Lack of information', 'External factors', 'Resource constraints'].map((factor) => (
                  <label key={factor} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={discoveryData.contributingFactors.includes(factor)}
                      onChange={(e) => {
                        const factors = e.target.checked
                          ? [...discoveryData.contributingFactors, factor]
                          : discoveryData.contributingFactors.filter(f => f !== factor);
                        updateData('contributingFactors', factors);
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{factor}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are there systemic issues that enable this problem?
              </label>
              <textarea
                value={discoveryData.systemicIssues}
                onChange={(e) => updateData('systemicIssues', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="e.g., Lack of user research process, Siloed teams, No feedback loops..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-green-800 mb-2">✍️ Problem Statement Framework</h4>
              <p className="text-sm text-green-700">
                Create a clear, actionable problem statement using the format: "How might we help [user] achieve [goal] when [context]?"
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refined Problem Statement *
              </label>
              <textarea
                value={discoveryData.problemStatement}
                onChange={(e) => updateData('problemStatement', e.target.value)}
                className="glass-input w-full h-32 resize-none"
                placeholder="How might we help new mobile users complete their profile setup when they're on-the-go and have limited time?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary target segment *
              </label>
              <input
                type="text"
                value={discoveryData.targetSegment}
                onChange={(e) => updateData('targetSegment', e.target.value)}
                className="glass-input w-full"
                placeholder="e.g., New mobile users aged 25-40 in urban areas"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How will you measure success? *
              </label>
              <textarea
                value={discoveryData.successCriteria}
                onChange={(e) => updateData('successCriteria', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="e.g., Increase profile completion rate from 40% to 70% within 3 months"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-indigo-800 mb-2">💡 Solution Strategy</h4>
              <p className="text-sm text-indigo-700">
                Now that you have a validated problem, explore solution approaches and plan validation.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your solution hypotheses? *
              </label>
              <textarea
                value={discoveryData.solutionHypotheses.join('\n')}
                onChange={(e) => updateData('solutionHypotheses', e.target.value.split('\n').filter(h => h.trim()))}
                className="glass-input w-full h-32 resize-none"
                placeholder="List each hypothesis on a new line:
- Reduce onboarding steps from 8 to 3
- Allow social login to skip manual entry
- Implement progressive profiling"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How will you validate these solutions? *
              </label>
              <textarea
                value={discoveryData.validationPlan}
                onChange={(e) => updateData('validationPlan', e.target.value)}
                className="glass-input w-full h-32 resize-none"
                placeholder="e.g., Create prototypes and test with 20 users, A/B test simplified flow with 10% of traffic, Interview users about social login preferences..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What risks should you consider?
              </label>
              <textarea
                value={discoveryData.riskAssessment}
                onChange={(e) => updateData('riskAssessment', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="e.g., Reduced information might impact personalization, Social login might exclude some users..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return discoveryData.observedSymptoms && discoveryData.affectedUsers && discoveryData.businessImpact;
      case 1:
        return discoveryData.evidenceSources.length > 0 && discoveryData.dataPoints;
      case 2:
        return discoveryData.rootCauseHypothesis;
      case 3:
        return discoveryData.problemStatement && discoveryData.targetSegment && discoveryData.successCriteria;
      case 4:
        return discoveryData.solutionHypotheses.length > 0 && discoveryData.validationPlan;
      default:
        return false;
    }
  };

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
          Back
        </button>
        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                index <= currentStep 
                  ? 'bg-primary-600 border-primary-600 text-white' 
                  : 'border-gray-300 text-gray-400'
              }`}>
                {index < currentStep ? (
                  <CheckCircle size={20} />
                ) : (
                  step.icon
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 ${
                  index < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">
            {steps[currentStep].description}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between pt-8 border-t border-glass-border">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="glass-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <div className="text-sm text-gray-600">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% complete
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="glass-button bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {currentStep === steps.length - 1 ? 'Complete Discovery' : 'Next'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemDiscoveryWizard;
