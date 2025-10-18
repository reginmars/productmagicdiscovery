import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, AlertTriangle, Users, Target, Lightbulb, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface SimplifiedDiscoveryFormProps {
  onComplete: (discoveryData: any) => void;
  onBack: () => void;
}

const SimplifiedDiscoveryForm: React.FC<SimplifiedDiscoveryFormProps> = ({ onComplete, onBack }) => {
  const [formData, setFormData] = useState({
    observedSymptoms: '',
    affectedUsers: '',
    businessImpact: '',
    evidenceSources: [] as string[],
    dataPoints: '',
    rootCauseHypothesis: '',
    problemStatement: '',
    targetSegment: '',
    successCriteria: '',
    solutionHypotheses: '',
    validationPlan: ''
  });

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleEvidenceSource = (source: string) => {
    const sources = formData.evidenceSources.includes(source)
      ? formData.evidenceSources.filter(s => s !== source)
      : [...formData.evidenceSources, source];
    updateField('evidenceSources', sources);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.observedSymptoms || !formData.affectedUsers || !formData.businessImpact) {
      toast.error('Please fill in all required fields in Section 1');
      return;
    }
    
    if (formData.evidenceSources.length === 0 || !formData.dataPoints) {
      toast.error('Please provide evidence sources and data points in Section 2');
      return;
    }
    
    if (!formData.rootCauseHypothesis) {
      toast.error('Please provide a root cause hypothesis in Section 3');
      return;
    }
    
    if (!formData.problemStatement || !formData.targetSegment || !formData.successCriteria) {
      toast.error('Please complete the problem statement in Section 4');
      return;
    }
    
    if (!formData.solutionHypotheses || !formData.validationPlan) {
      toast.error('Please provide solution hypotheses and validation plan in Section 5');
      return;
    }

    toast.success('Problem discovery completed! 🎉');
    onComplete(formData);
  };

  const evidenceSourceOptions = [
    'Analytics data',
    'User interviews',
    'Support tickets',
    'Sales feedback',
    'Surveys',
    'A/B test results',
    'Other'
  ];

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
          Complete all 5 sections below
        </div>
      </div>

      <div className="glass-card p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Problem Discovery Questionnaire
          </h2>
          <p className="text-gray-600">
            Answer all questions below to complete your problem discovery process
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Section 1: Identify Symptoms */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">1. Identify Symptoms</h3>
                <p className="text-sm text-gray-600">What observable issues are you seeing?</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What symptoms or issues have you observed? *
              </label>
              <textarea
                value={formData.observedSymptoms}
                onChange={(e) => updateField('observedSymptoms', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="e.g., Users are dropping off at 60% during checkout, Support tickets increased by 40%..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Who is affected by these issues? *
              </label>
              <input
                type="text"
                value={formData.affectedUsers}
                onChange={(e) => updateField('affectedUsers', e.target.value)}
                className="glass-input w-full"
                placeholder="e.g., New mobile users, Enterprise customers..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What business impact are you seeing? *
              </label>
              <input
                type="text"
                value={formData.businessImpact}
                onChange={(e) => updateField('businessImpact', e.target.value)}
                className="glass-input w-full"
                placeholder="e.g., 20% revenue loss, Increased churn rate..."
                required
              />
            </div>
          </div>

          {/* Section 2: Validate with Evidence */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">2. Validate with Evidence</h3>
                <p className="text-sm text-gray-600">Gather data to confirm the problem exists</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What data sources can validate this problem? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {evidenceSourceOptions.map((source) => (
                  <label key={source} className="flex items-center glass-card p-3 cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={formData.evidenceSources.includes(source)}
                      onChange={() => toggleEvidenceSource(source)}
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
                value={formData.dataPoints}
                onChange={(e) => updateField('dataPoints', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="e.g., Conversion rate dropped from 12% to 7%, NPS score decreased from 8.2 to 6.1..."
                required
              />
            </div>
          </div>

          {/* Section 3: Root Cause Analysis */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">3. Root Cause Analysis</h3>
                <p className="text-sm text-gray-600">Understand why the problem occurs</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you think is the root cause? *
              </label>
              <textarea
                value={formData.rootCauseHypothesis}
                onChange={(e) => updateField('rootCauseHypothesis', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="e.g., The checkout process has too many steps and requires information users don't have readily available..."
                required
              />
            </div>
          </div>

          {/* Section 4: Define the Problem */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">4. Define the Problem</h3>
                <p className="text-sm text-gray-600">Craft a clear, actionable problem statement</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refined Problem Statement (How might we...) *
              </label>
              <textarea
                value={formData.problemStatement}
                onChange={(e) => updateField('problemStatement', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="How might we help new mobile users complete their profile setup when they're on-the-go and have limited time?"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary target segment *
              </label>
              <input
                type="text"
                value={formData.targetSegment}
                onChange={(e) => updateField('targetSegment', e.target.value)}
                className="glass-input w-full"
                placeholder="e.g., New mobile users aged 25-40 in urban areas"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How will you measure success? *
              </label>
              <input
                type="text"
                value={formData.successCriteria}
                onChange={(e) => updateField('successCriteria', e.target.value)}
                className="glass-input w-full"
                placeholder="e.g., Increase profile completion rate from 40% to 70% within 3 months"
                required
              />
            </div>
          </div>

          {/* Section 5: Solution Approach */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">5. Solution Approach</h3>
                <p className="text-sm text-gray-600">Plan how to solve the validated problem</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What are your solution hypotheses? (One per line) *
              </label>
              <textarea
                value={formData.solutionHypotheses}
                onChange={(e) => updateField('solutionHypotheses', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="- Reduce onboarding steps from 8 to 3&#10;- Allow social login to skip manual entry&#10;- Implement progressive profiling"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How will you validate these solutions? *
              </label>
              <textarea
                value={formData.validationPlan}
                onChange={(e) => updateField('validationPlan', e.target.value)}
                className="glass-input w-full h-24 resize-none"
                placeholder="e.g., Create prototypes and test with 20 users, A/B test simplified flow with 10% of traffic..."
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-8 border-t border-gray-200">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full glass-button bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 text-lg font-semibold flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Complete Problem Discovery
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SimplifiedDiscoveryForm;
