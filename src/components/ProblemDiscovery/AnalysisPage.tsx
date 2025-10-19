import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, TrendingUp, Users, Target, Lightbulb, CheckCircle, Loader, ArrowRight, AlertCircle } from 'lucide-react';
import { ProblemDiscovery, ProblemAnalysis } from '../../types';
import { useStore } from '../../store/useStore';
import { ApiService } from '../../services/api';
import toast from 'react-hot-toast';

interface AnalysisPageProps {
  discovery: ProblemDiscovery;
  onBack: () => void;
  onProceedToHMW: (discovery: ProblemDiscovery) => void;
}

const AnalysisPage: React.FC<AnalysisPageProps> = ({ discovery, onBack, onProceedToHMW }) => {
  const { updateDiscovery } = useStore();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState<ProblemAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const analysisSteps = [
    'Analyzing problem patterns...',
    'Researching market data...',
    'Gathering competitor insights...',
    'Validating with industry benchmarks...',
    'Compiling findings...'
  ];

  useEffect(() => {
    const analyzeDiscovery = async () => {
      setIsAnalyzing(true);
      setError(null);

      try {
        // Simulate step progression
        const stepInterval = setInterval(() => {
          setCurrentStep(prev => {
            if (prev < analysisSteps.length - 1) {
              return prev + 1;
            }
            return prev;
          });
        }, 3000);

        // Perform real AI analysis
        const analysisResult = await ApiService.analyzeDiscovery(discovery);

        clearInterval(stepInterval);
        setCurrentStep(analysisSteps.length - 1);

        // Wait a moment before showing results
        await new Promise(resolve => setTimeout(resolve, 1000));

        setAnalysis(analysisResult);

        // Update discovery with analysis
        updateDiscovery(discovery.id, {
          status: 'analyzing',
          analysis: analysisResult
        });

        setIsAnalyzing(false);
        toast.success('Analysis complete! Review insights below.');
      } catch (err) {
        console.error('Analysis failed:', err);
        setError(err instanceof Error ? err.message : 'Failed to analyze discovery');
        setIsAnalyzing(false);
        toast.error('Analysis failed. Please try again.');
      }
    };

    analyzeDiscovery();
  }, [discovery.id, updateDiscovery]);

  const handleProceed = () => {
    if (analysis) {
      updateDiscovery(discovery.id, {
        status: 'validated'
      });
      toast.success('Proceeding to HMW statement generation...');
      setTimeout(() => {
        onProceedToHMW(discovery);
      }, 1000);
    }
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[600px]"
      >
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Analysis Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="glass-button bg-primary-600 text-white px-6 py-3 w-full"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="glass-button px-6 py-3 w-full"
            >
              Back to Discovery
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (isAnalyzing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[600px]"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Analyzing Your Discovery</h2>
          <p className="text-gray-600 mb-6">
            Using AI to research market data and validate your problem...
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: index <= currentStep ? 1 : 0.3 }}
                className="flex items-center justify-center gap-2"
              >
                {index < currentStep ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : index === currentStep ? (
                  <Loader className="w-4 h-4 animate-spin text-primary-600" />
                ) : (
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                )}
                <span className={index <= currentStep ? 'text-gray-700 font-medium' : ''}>
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!analysis) return null;

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
          Back to Discovery
        </button>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">Confidence Score:</div>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${analysis.confidenceScore}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <span className="text-lg font-bold text-green-600">{analysis.confidenceScore}%</span>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="glass-card p-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">AI-Powered Problem Analysis</h1>
            <p className="text-gray-700 mb-4">
              We've analyzed your discovery using real market research and AI. The insights below are based on actual data gathered from the internet.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-700 font-medium">Problem validated with {analysis.confidenceScore}% confidence</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Findings */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-600" />
          <h2 className="text-xl font-semibold text-gray-800">Key Findings</h2>
        </div>
        <div className="space-y-3">
          {analysis.keyFindings.map((finding, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{finding}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Root Causes */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-800">Root Causes</h2>
          </div>
          <ul className="space-y-2">
            {analysis.rootCauses.map((cause, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-gray-700"
              >
                <span className="text-red-600 font-bold">•</span>
                <span>{cause}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* User Pain Points */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">User Pain Points</h2>
          </div>
          <ul className="space-y-2">
            {analysis.userPainPoints.map((pain, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-gray-700"
              >
                <span className="text-blue-600 font-bold">•</span>
                <span>{pain}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Market Validation */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-800">Market Validation</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Market Context</h3>
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm font-medium text-purple-800 mb-1">Market Size</p>
                <p className="text-gray-700">{analysis.marketValidation.marketSize}</p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm font-medium text-purple-800 mb-1">Growth Trend</p>
                <p className="text-gray-700">{analysis.marketValidation.growthTrend}</p>
              </div>
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm font-medium text-purple-800 mb-1">User Demand</p>
                <p className="text-gray-700">{analysis.marketValidation.userDemand}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Industry Benchmarks</h3>
            <ul className="space-y-2">
              {analysis.marketValidation.industryBenchmarks.map((benchmark, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-purple-600 font-bold">→</span>
                  <span>{benchmark}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">Competitor Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {analysis.marketValidation.competitorSolutions.map((solution, index) => (
              <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                {solution}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">Validation Sources</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.marketValidation.validationSources.map((source, index) => (
              <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                {source}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Competitor Insights */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Competitor Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analysis.competitorInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg"
            >
              <p className="text-gray-700">{insight}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommended Focus */}
      <div className="glass-card p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Recommended Focus</h2>
            <p className="text-gray-700 mb-4">{analysis.recommendedFocus}</p>
            <button
              onClick={handleProceed}
              className="glass-button bg-primary-600 text-white px-6 py-3 flex items-center gap-2"
            >
              Generate "How Might We" Statements
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisPage;
