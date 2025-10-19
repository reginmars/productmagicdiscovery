import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ExternalLink, Clock, Users, Target, Map } from 'lucide-react';

const PracticeGuidePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Practice Guides</h1>
        <p className="text-gray-600">
          Curated practice guides from the Singapore Computer Society Product Management Special Interest Group.
        </p>
      </div>

      {/* Upcoming Practice Guide */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Compass className="w-6 h-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Practice Guides</h2>
        </div>

        <motion.div
          className="glass-card p-8 hover:shadow-lg transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Map className="w-8 h-8 text-white" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">
                  <Clock className="w-3 h-3" />
                  Coming Soon
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Actionable Visioning - Connecting Vision and Strategy for More Powerful Execution
              </h3>

              <p className="text-gray-700 mb-4 leading-relaxed">
                An approach to use vision to form a strategy map for bridging the gap between vision and day-to-day execution. 
                This practice guide will help you translate high-level product visions into actionable strategic roadmaps 
                that guide your team's daily work and decision-making.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Map className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Strategy Mapping</h4>
                    <p className="text-xs text-gray-600">Transform vision into actionable strategy</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Execution Bridge</h4>
                    <p className="text-xs text-gray-600">Connect vision to daily work</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm mb-1">Team Alignment</h4>
                    <p className="text-xs text-gray-600">Unite teams around shared direction</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 border border-primary-200">
                <h4 className="font-semibold text-gray-800 mb-2">What You'll Learn</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-0.5">•</span>
                    <span>How to create strategy maps that translate vision into concrete execution plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-0.5">•</span>
                    <span>How to use AI assistance and context engineering to help you draft an actionable map for you to review and refine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-0.5">•</span>
                    <span>Techniques to bridge the gap between high-level vision and day-to-day team activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-0.5">•</span>
                    <span>Methods to ensure strategic alignment across all levels of your organization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-600 mt-0.5">•</span>
                    <span>Best practices from experienced product leaders in Singapore</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <button
                  disabled
                  className="px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                >
                  Available Soon
                </button>
                <a
                  href="https://www.scs.org.sg/communities/product-management-sig"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Learn More About SCS PDM SIG
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Info Card */}
      <motion.div
        className="glass-card p-6 bg-gradient-to-r from-primary-50 to-secondary-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-semibold text-gray-800 mb-2">📚 About Practice Guides</h3>
        <p className="text-sm text-gray-600">
          Practice guides are curated by the Singapore Computer Society Product Management Special Interest Group, 
          featuring proven methodologies and insights from experienced practitioners. Stay tuned for more guides 
          covering essential product management practices.
        </p>
      </motion.div>
    </div>
  );
};

export default PracticeGuidePage;
