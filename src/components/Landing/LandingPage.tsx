import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle,
  TrendingUp,
  Users,
  Lightbulb,
  BarChart3,
  Zap,
  Search,
  Globe
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const discoveryBenefits = [
    {
      icon: TrendingUp,
      title: '3x Higher Adoption',
      description: 'Features built on validated problems see significantly higher user adoption rates'
    },
    {
      icon: Zap,
      title: 'Faster Time to Market',
      description: 'Skip building the wrong things and focus on what truly matters to users'
    },
    {
      icon: Users,
      title: 'Better User Satisfaction',
      description: 'Solve real problems that users actually care about and will pay for'
    },
    {
      icon: BarChart3,
      title: 'Higher ROI',
      description: 'Maximize development resources by building solutions that deliver real value'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6"
        >
          <Lightbulb className="w-4 h-4" />
          Evidence-Based Product Development
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          Build Products That{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Solve Real Problems
          </span>
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          A systematic platform for product managers, product owners, and business analysts 
          to identify, validate, and solve real user problems using evidence-based methodologies 
          with automated online research.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            onClick={onGetStarted}
            className="glass-button bg-primary-600 text-white px-8 py-4 text-lg flex items-center gap-2 hover:bg-primary-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Problem Discovery
            <ArrowRight size={20} />
          </motion.button>
          
          <motion.button
            className="glass-button bg-white text-gray-700 px-8 py-4 text-lg hover:bg-gray-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Start validating problems in minutes with automated research
        </p>
      </motion.section>

      {/* Current Focus: Discovery */}
      <section className="max-w-6xl mx-auto">
        <div className="glass-card p-8 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Search className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                🎯 Problem Discovery Framework
              </h2>
              <p className="text-gray-700 mb-6">
                Stop building solutions for the wrong problems. Our evidence-based discovery framework 
                helps you systematically identify, validate, and prioritize real user problems using 
                proven methodologies from product management, behavioral science, and design thinking.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/40">
                  <h4 className="font-semibold text-gray-800 mb-2">5-Question Framework</h4>
                  <p className="text-sm text-gray-600">
                    Structured approach to capture problem symptoms, affected users, evidence, 
                    impact, and success metrics.
                  </p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/40">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-primary-600" />
                    <h4 className="font-semibold text-gray-800">Automated Online Research</h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    AI-powered research that gathers validation data from online sources based on 
                    your 5 question responses, including market insights and trend analysis.
                  </p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/40">
                  <h4 className="font-semibold text-gray-800 mb-2">Intelligent Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Root cause analysis, confidence scoring, and evidence-based insights 
                    generated from your responses and research data.
                  </p>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/40">
                  <h4 className="font-semibold text-gray-800 mb-2">HMW Statement Generation</h4>
                  <p className="text-sm text-gray-600">
                    Transform validated problems into actionable "How Might We" statements 
                    with clear rationale and opportunity tracking.
                  </p>
                </div>
              </div>

              <button
                onClick={onGetStarted}
                className="glass-button bg-primary-600 text-white px-6 py-3 flex items-center gap-2 hover:bg-primary-700 transition-colors"
              >
                Start Your First Discovery
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Problem-First Discovery Works */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Evidence-Based Discovery Matters
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Building the right thing is more important than building things right. 
            Here's the impact of starting with validated problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {discoveryBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* The Problem with Solution-First Thinking */}
      <section className="max-w-6xl mx-auto">
        <div className="glass-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">❌</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Without Validation</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 70% of features go unused</li>
                <li>• Solutions don't fit real needs</li>
                <li>• Wasted development resources</li>
                <li>• Poor user adoption rates</li>
                <li>• Low ROI on product investments</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔄</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Our Process</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Evidence-based problem identification</li>
                <li>• Automated online research & validation</li>
                <li>• Root cause analysis</li>
                <li>• Market research integration</li>
                <li>• Systematic opportunity prioritization</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">With Validation</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 3x higher feature adoption</li>
                <li>• Faster time to market</li>
                <li>• Better user satisfaction</li>
                <li>• Higher ROI on development</li>
                <li>• Confident product decisions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-12 bg-gradient-to-br from-primary-50 to-secondary-50"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Build the Right Things?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with systematic problem discovery and build products users actually need.
          </p>
          
          <button
            onClick={onGetStarted}
            className="glass-button bg-primary-600 text-white px-8 py-4 text-lg flex items-center gap-2 hover:bg-primary-700 transition-colors mx-auto"
          >
            Begin Problem Discovery
            <ArrowRight size={20} />
          </button>

          <p className="text-sm text-gray-500 mt-6">
            Join product teams using evidence-based discovery to build better products
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
