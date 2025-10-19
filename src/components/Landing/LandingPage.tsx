import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  Rocket, 
  CheckCircle, 
  ArrowRight,
  Target,
  Users,
  TrendingUp,
  Lightbulb,
  Zap,
  Shield
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Search,
      title: 'Discovery',
      subtitle: 'Solve the Right Problem',
      description: 'Use evidence-based methodologies to identify and validate real user problems before building anything.',
      benefits: [
        'Systematic 5-question framework',
        'Root cause analysis',
        'User-centered validation',
        'Market research insights'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Rocket,
      title: 'Go-To-Market',
      subtitle: 'Ensure Market Success',
      description: 'Launch with confidence using strategic GTM guidance to maximize product adoption and market impact.',
      benefits: [
        'Market positioning strategy',
        'Launch planning framework',
        'Adoption metrics tracking',
        'Growth optimization'
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { value: '3x', label: 'Higher Feature Adoption', icon: TrendingUp },
    { value: '70%', label: 'Reduction in Wasted Features', icon: Target },
    { value: '2x', label: 'Faster Time to Market', icon: Zap },
    { value: '95%', label: 'User Satisfaction Rate', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              x: [0, -150, 0],
              y: [0, 100, 0],
              rotate: [360, 180, 0]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary-200/30 to-primary-200/30 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-gray-800">Product Magic</h1>
            </div>
            
            <p className="text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              From Problem Discovery to Market Success
            </p>
            
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              Helping Product Managers, Product Owners, and Business Analysts discover the right problems and launch successfully with strategic Go-To-Market guidance.
            </p>

            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Start Your Problem Discovery
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-sm text-gray-500 mt-4">
              Evidence-based methodology • Trusted by product teams
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <Icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Pillars */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Your Product Success Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two integrated pillars that guide you from problem identification to market success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-8 hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-lg font-semibold text-primary-600 mb-4">{feature.subtitle}</p>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                
                <div className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How Product Magic Works</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              A systematic, evidence-based approach to product success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Discover Problems',
                description: 'Use our 5-question framework to identify and validate real user problems with evidence and data.',
                icon: Search
              },
              {
                step: '02',
                title: 'Launch Successfully',
                description: 'Execute your go-to-market strategy with confidence using our proven launch framework and tracking.',
                icon: Rocket
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 h-full">
                    <div className="text-6xl font-bold text-white/20 mb-4">{step.step}</div>
                    <Icon className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-white/90">{step.description}</p>
                  </div>
                  {index < 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-white/40" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why Choose Product Magic */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Product Teams Choose Product Magic
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on proven methodologies and best practices from leading product organizations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: 'Evidence-Based',
              description: 'Every decision backed by real user data and market research, not assumptions.'
            },
            {
              icon: Target,
              title: 'Problem-First',
              description: 'Focus on solving the right problems before jumping to solutions.'
            },
            {
              icon: Users,
              title: 'User-Centered',
              description: 'Keep users at the heart of every discovery and validation process.'
            },
            {
              icon: Lightbulb,
              title: 'Systematic Framework',
              description: 'Proven 5-question methodology that guides you step-by-step.'
            },
            {
              icon: TrendingUp,
              title: 'Measurable Impact',
              description: 'Track success metrics and validate outcomes at every stage.'
            },
            {
              icon: Zap,
              title: 'Faster Execution',
              description: 'Reduce wasted effort and accelerate time to market with validated ideas.'
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <Icon className="w-10 h-10 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Product Process?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join product teams who are discovering the right problems and launching successfully.
            </p>
            
            <motion.button
              onClick={onGetStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Start Your Problem Discovery
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-sm text-gray-400 mt-6">
              Free to start • Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
