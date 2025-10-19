import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, TrendingUp, Users, Target, Lightbulb, CheckCircle, Loader, ArrowRight } from 'lucide-react';
import { ProblemDiscovery, ProblemAnalysis, MarketValidation } from '../../types';
import { useStore } from '../../store/useStore';
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

  useEffect(() => {
    // Simulate analysis process
    const analyzeDiscovery = async () => {
      setIsAnalyzing(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate mock analysis based on discovery responses
      const mockAnalysis: ProblemAnalysis = {
        id: `analysis-${Date.now()}`,
        discoveryId: discovery.id,
        rootCauses: [
          'Complex payment flow with too many steps',
          'Lack of clear payment method visibility',
          'Mobile UX not optimized for quick checkout',
          'Missing trust signals during payment process'
        ],
        userPainPoints: [
          'Confusion about available payment options',
          'Uncertainty about payment security',
          'Frustration with lengthy checkout process',
          'Difficulty recovering from payment errors'
        ],
        marketValidation: {
          marketSize: '$2.3B e-commerce checkout optimization market',
          growthTrend: '18% YoY growth in mobile commerce',
          competitorSolutions: [
            'One-click checkout (Amazon, Shopify)',
            'Digital wallet integration (Apple Pay, Google Pay)',
            'Guest checkout options',
            'Progressive disclosure patterns'
          ],
          industryBenchmarks: [
            'Average cart abandonment: 69.8% (Baymard Institute)',
            'Mobile abandonment: 85.6% vs desktop 73.1%',
            'Payment step abandonment: 17% of total',
            'Best-in-class: <50% abandonment rate'
          ],
          userDemand: 'High - 67% of users cite complicated checkout as reason for abandonment',
          validationSources: [
            'Baymard Institute Checkout Research',
            'Forrester Mobile Commerce Report 2024',
            'Internal user interview data (n=15)',
            'Support ticket analysis (127 tickets)'
          ]
        },
        competitorInsights: [
          'Leading platforms reduced steps from 5 to 2-3',
          'Digital wallet adoption increased conversion by 20-30%',
          'Trust badges near payment increased completion by 15%',
          'Real-time validation reduced errors by 40%'
        ],
        keyFindings: [
          'Problem is validated by industry data - above average abandonment rate',
          'Mobile users disproportionately affected (85.6% vs 73.1%)',
          'Payment step is critical friction point (17% drop-off)',
          'Proven solutions exist with measurable impact',
          'Market opportunity is significant and growing'
        ],
        recommendedFocus: 'Prioritize mobile payment experience optimization with focus on reducing steps and increasing trust signals',
        confidenceScore: 87,
        analyzedAt: new Date()
      };

      setAnalysis(mockAnalysis);
      
      // Update discovery with analysis
      updateDiscovery(discovery.id, {
        status: 'analyzing',
        analysis: mockAnalysis
      });

      setIsAnalyzing(false);
      toast.success('Analysis complete! Review insights below.');
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
            Identifying root causes, validating with market data, and generating insights...
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2"
            >
              <Loader className="w-4 h-4 animate-spin" />
              <span>Analyzing problem patterns...</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center justify-center gap-2"
            >
              <Loader className="w-4 h-4 animate-spin" />
              <span>Researching market data...</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex items-center justify-center gap-2"
            >
              <Loader className="w-4 h-4 animate-spin" />
              <span>Validating with industry benchmarks...</span>
            </motion.div>
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
            <h1 className="text-3xl font-bold text-gray-800 mb-3">Problem Analysis & Market Validation</h1>
            <p className="text-gray-700 mb-4">
              We've analyzed your discovery responses and validated the problem with market research. 
              Review the insights below before generating "How Might We" statements.
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
