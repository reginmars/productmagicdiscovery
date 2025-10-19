import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Target, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Search,
  BarChart3,
  Zap
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 font-inter overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
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
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-secondary-200/20 to-primary-200/20 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-lg">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ProductMagic</h1>
              <p className="text-xs text-gray-600">Problem Discovery Platform</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Target className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">Evidence-Based Product Discovery</span>
              </div>

              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Stop Building
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  The Wrong Things
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Discover and validate real problems before investing in solutions. Our systematic 5-question framework helps product teams identify opportunities worth solving.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.button
                  onClick={onGetStarted}
                  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Problem Discovery
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">3x</div>
                  <div className="text-sm text-gray-600">Higher Feature Adoption</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-600 mb-1">70%</div>
                  <div className="text-sm text-gray-600">Faster Validation</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">5</div>
                  <div className="text-sm text-gray-600">Critical Questions</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - 5 Questions Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-card p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">The 5 Discovery Questions</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'What problem are we solving?', color: 'bg-amber-500', icon: Search },
                    { step: 2, title: 'Who is affected by this problem?', color: 'bg-blue-500', icon: Users },
                    { step: 3, title: 'What evidence do we have?', color: 'bg-purple-500', icon: BarChart3 },
                    { step: 4, title: 'What is the impact?', color: 'bg-red-500', icon: TrendingUp },
                    { step: 5, title: 'How will we measure success?', color: 'bg-green-500', icon: CheckCircle }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.step}
                        className="flex items-center gap-4 p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all"
                        whileHover={{ x: 8 }}
                      >
                        <div className={`w-12 h-12 rounded-full ${item.color} text-white flex items-center justify-center text-lg font-bold shadow-lg flex-shrink-0`}>
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{item.title}</p>
                        </div>
                        <Icon className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">AI-Powered Analysis</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 px-8 py-20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Problem-First Discovery Works</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stop wasting resources on solutions nobody needs. Validate problems first, build solutions second.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Without Validation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">❌</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-800">Without Validation</h4>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span>70% of features go unused</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Solutions don't fit real needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Wasted development resources</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Poor user adoption and satisfaction</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">•</span>
                  <span>Longer time to market with wrong features</span>
                </li>
              </ul>
            </motion.div>

            {/* With Discovery */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-2 border-green-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✅</span>
                </div>
                <h4 className="text-2xl font-bold text-gray-800">With Discovery</h4>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>3x higher feature adoption rates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Faster time to market with right features</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Better user satisfaction and retention</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Higher ROI on development investment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Evidence-based decision making</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Methodology */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 bg-gradient-to-r from-primary-50 to-secondary-50"
          >
            <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Evidence-Based Methodology</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary-600" />
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">Problem Identification</h5>
                <p className="text-sm text-gray-600">Systematic discovery of real user problems</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">User Validation</h5>
                <p className="text-sm text-gray-600">Direct feedback from affected users</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">Root Cause Analysis</h5>
                <p className="text-sm text-gray-600">Deep dive into underlying issues</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h5 className="font-semibold text-gray-800 mb-2">Solution Hypothesis</h5>
                <p className="text-sm text-gray-600">Test-driven approach to building</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 bg-gradient-to-br from-primary-500 to-secondary-500 text-white"
          >
            <h3 className="text-4xl font-bold mb-4">Ready to Discover Real Problems?</h3>
            <p className="text-xl mb-8 text-white/90">
              Join product teams who validate before they build. Start your evidence-based discovery journey today.
            </p>
            <motion.button
              onClick={onGetStarted}
              className="inline-flex items-center gap-3 bg-white text-primary-600 px-10 py-5 rounded-lg font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your First Discovery
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-8 border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p className="text-sm">
            © 2024 ProductMagic. Evidence-based product discovery for modern teams.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
