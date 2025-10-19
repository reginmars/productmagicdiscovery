import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass,
  Clock,
  ChevronDown,
  ChevronUp,
  Award,
  ExternalLink
} from 'lucide-react';

const PracticeGuidePage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Practice Guides</h1>
        <p className="text-gray-600 mb-4">
          Practice guides created by the Singapore Computer Society Product Management Special Interest Group.
        </p>
        <p className="text-gray-700 leading-relaxed">
          These evidence-based practice guides help grow your skills and share useful real-world proven signature 
          approaches from the Special Interest Group to benefit practitioners regardless of their level of experience 
          and knowledge—meeting the Special Interest Group members' needs.
        </p>
      </div>

      {/* Actionable Visioning Guide - Coming Soon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-8"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold text-gray-800">
                Actionable Visioning
              </h2>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4" />
                Coming Soon
              </span>
            </div>
            <p className="text-gray-700 mb-4">
              Bridge the gap between Vision and Actionables in day-to-day execution. A strategy map that 
              guides teams and helps leaders align across the organization, using AI and context engineering 
              to power up the strategy map.
            </p>
          </div>
        </div>

        {/* What You'll Learn Section */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-lg font-semibold text-primary-700 hover:text-primary-800 transition-colors mb-4"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            What You'll Learn
          </button>
          
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-6 border-l-2 border-primary-200"
            >
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1 text-lg">•</span>
                  <span>How to translate high-level vision into concrete, actionable initiatives that teams align to and execute</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1 text-lg">•</span>
                  <span>Creating a visual strategy map that connects organizational goals to daily work</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1 text-lg">•</span>
                  <span>How to leverage AI-assistance with context engineering to rapidly create a strategy map for review and iterate to suit</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1 text-lg">•</span>
                  <span>Building a framework that helps teams understand how their work contributes to the bigger picture</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1 text-lg">•</span>
                  <span>How to use the strategy map as a communication tool for stakeholder alignment and decision-making</span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Learn More About SCS PDM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-8 bg-gradient-to-r from-primary-50 to-secondary-50"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              About SCS Product Management SIG
            </h3>
            <p className="text-gray-700 mb-4">
              The Product Management Special Interest Group's core aim is to help uplift product management 
              skills in Singapore. We bring together experienced product managers, product owners, and business 
              analysts to create practice guides, host events, and foster a community dedicated to advancing 
              product management excellence.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.scs.org.sg/special-interest-groups/product-management/resources"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-primary-600 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                SCS PM Resources
              </a>
              <a
                href="https://www.scs.org.sg/communities/product-management-sig/events"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-primary-600 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Upcoming Events
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PracticeGuidePage;
