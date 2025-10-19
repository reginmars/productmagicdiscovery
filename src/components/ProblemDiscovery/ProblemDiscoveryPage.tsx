import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Lightbulb, AlertTriangle, Target, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';
import { ProblemDiscovery } from '../../types';

interface ProblemDiscoveryPageProps {
  onBack: () => void;
  onProceedToAnalysis: (discovery: ProblemDiscovery) => void;
}

const ProblemDiscoveryPage: React.FC<ProblemDiscoveryPageProps> = ({ onBack, onProceedToAnalysis }) => {
  const { addDiscovery, user } = useStore();
  const [formData, setFormData] = useState({
    problemDescription: '',
    affectedUsers: '',
    evidence: '',
    businessImpact: '',
    successCriteria: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'problemDescription',
      number: 1,
      title: 'What problem are you observing?',
      description: 'Describe the symptoms and issues you\'re seeing. Focus on observable facts, not solutions.',
      placeholder: 'e.g., Users are abandoning their shopping carts at a 60% rate during checkout. Support tickets about payment issues have increased by 40% in the last month.',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'amber',
      guidance: 'Start with what you can see, measure, or hear from users. Avoid jumping to solutions or root causes yet.'
    },
    {
      id: 'affectedUsers',
      number: 2,
      title: 'Who is experiencing this problem?',
      description: 'Identify the specific user segments or personas affected by this issue.',
      placeholder: 'e.g., New mobile users aged 25-40, primarily shopping during evening hours. Also affecting our customer support team who handle 50+ tickets daily about this.',
      icon: <Users className="w-6 h-6" />,
      color: 'blue',
      guidance: 'Be specific about user segments, roles, or personas. Include both direct users and indirect stakeholders.'
    },
    {
      id: 'evidence',
      number: 3,
      title: 'What evidence do you have that this is a real problem?',
      description: 'Provide concrete data, user feedback, or research that validates this problem exists.',
      placeholder: 'e.g., Analytics show 60% cart abandonment at payment step (up from 35% last quarter). User interviews with 15 customers revealed confusion about payment options. 127 support tickets mention "payment not working" in last 30 days.',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'purple',
      guidance: 'Include quantitative data (metrics, analytics) and qualitative insights (user quotes, feedback). Multiple evidence sources strengthen validation.'
    },
    {
      id: 'businessImpact',
      number: 4,
      title: 'What is the impact of this problem?',
      description: 'Describe the business and user consequences if this problem remains unsolved.',
      placeholder: 'e.g., Estimated $50K monthly revenue loss from abandoned carts. Customer satisfaction score dropped from 4.2 to 3.1. Support team spending 30% of time on payment-related issues instead of strategic work.',
      icon: <Target className="w-6 h-6" />,
      color: 'red',
      guidance: 'Quantify impact where possible. Consider revenue, costs, user satisfaction, team productivity, and strategic goals.'
    },
    {
      id: 'successCriteria',
      number: 5,
      title: 'What would success look like?',
      description: 'Define measurable outcomes that would indicate this problem is solved.',
      placeholder: 'e.g., Reduce cart abandonment rate from 60% to below 30% within 3 months. Increase payment completion rate to 85%+. Reduce payment-related support tickets by 70%. Improve customer satisfaction score to 4.0+.',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'green',
      guidance: 'Set specific, measurable targets with timeframes. Include both primary metrics and secondary indicators of success.'
    }
  ];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    questions.forEach(question => {
      const value = formData[question.id as keyof typeof formData];
      if (!value || value.trim().length < 20) {
        newErrors[question.id] = 'Please provide a detailed answer (at least 20 characters)';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error('Please complete all questions with detailed answers');
      return;
    }

    const discovery: ProblemDiscovery = {
      id: `discovery-${Date.now()}`,
      ...formData,
      status: 'draft',
      createdBy: user?.name || 'Current User',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    addDiscovery(discovery);
    toast.success('Discovery responses saved! Proceeding to analysis...');
    
    setTimeout(() => {
      onProceedToAnalysis(discovery);
    }, 1000);
  };

  const getCompletionPercentage = () => {
    const completed = questions.filter(q => {
      const value = formData[q.id as keyof typeof formData];
      return value && value.trim().length >= 20;
    }).length;
    return Math.round((completed / questions.length) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="glass-button flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {getCompletionPercentage()}% Complete
          </div>
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary-600"
              initial={{ width: 0 }}
              animate={{ width: `${getCompletionPercentage()}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="glass-card p-8 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Problem Discovery</h1>
            <p className="text-gray-700 mb-4">
              Answer these 5 questions to systematically identify and validate a real problem worth solving. 
              After completion, we'll analyze your responses and research market data to generate "How Might We" statements.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Evidence-based</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span>User-centered</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span>Market-validated</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full bg-${question.color}-100 flex items-center justify-center flex-shrink-0`}>
                <div className={`text-${question.color}-600`}>
                  {question.icon}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full bg-${question.color}-100 text-${question.color}-700`}>
                    Question {question.number}
                  </span>
                  {formData[question.id as keyof typeof formData] && 
                   formData[question.id as keyof typeof formData].trim().length >= 20 && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {question.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {question.description}
                </p>
                <div className={`bg-${question.color}-50 border border-${question.color}-200 rounded-lg p-3 mb-4`}>
                  <p className="text-sm text-gray-700">
                    <strong className={`text-${question.color}-800`}>💡 Guidance:</strong> {question.guidance}
                  </p>
                </div>
              </div>
            </div>

            <textarea
              value={formData[question.id as keyof typeof formData]}
              onChange={(e) => updateField(question.id, e.target.value)}
              className={`glass-input w-full h-32 resize-none ${
                errors[question.id] ? 'border-red-300 focus:border-red-500' : ''
              }`}
              placeholder={question.placeholder}
            />
            
            {errors[question.id] && (
              <p className="text-red-600 text-sm mt-2">{errors[question.id]}</p>
            )}
            
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                {formData[question.id as keyof typeof formData].length} characters
              </p>
              {formData[question.id as keyof typeof formData].trim().length >= 20 && (
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Complete
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Submit Section */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Ready to analyze?</h3>
            <p className="text-sm text-gray-600">
              Next: We'll analyze your responses, validate with market research, and generate "How Might We" statements.
            </p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={getCompletionPercentage() < 100}
            className="glass-button bg-primary-600 text-white px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Proceed to Analysis
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Process Preview */}
      <div className="glass-card p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="font-semibold text-gray-800 mb-4">📋 What happens next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Analysis</h4>
              <p className="text-sm text-gray-600">We'll analyze your responses to identify root causes and key insights</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">Market Research</h4>
              <p className="text-sm text-gray-600">Validate the problem with market data, trends, and competitor insights</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">HMW Statements</h4>
              <p className="text-sm text-gray-600">Generate 2-3 "How Might We" problem statements to explore opportunities</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemDiscoveryPage;
