import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap,
  Compass,
  Clock,
  CheckCircle,
  Award,
  Zap
} from 'lucide-react';

const PracticeGuidesPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Practice Guides</h1>
        <p className="text-gray-600">
          Practice guides created and released by the Singapore Computer Society Product Management Special Interest Group.
        </p>
      </div>

      {/* Actionable Visioning Guide - Coming Soon */}
      <motion.div
        className="glass-card p-8 border-2 border-primary-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Compass className="w-8 h-8 text-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-2xl font-bold text-gray-800">Actionable Visioning</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-xs font-medium">
                <Clock className="w-3 h-3" />
                Coming Soon
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              Bridge vision and execution with strategy maps that align leaders and teams. 
              Use AI and context engineering to rapidly create draft strategy maps linking vision to actionable features.
            </p>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-white/40">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary-600" />
                What You'll Learn
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Build Strategy Maps:</strong> Connect vision to features and execution, ensuring alignment across all levels.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Leverage AI & Context Engineering:</strong> Use context stacks to generate draft strategy maps in hours, not days.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Align Leaders & Teams:</strong> Bridge strategic vision and tactical execution so everyone understands their impact.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Vision to Actionables:</strong> Transform abstract vision into concrete, prioritized features teams can execute.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4 text-primary-600" />
                <span>
                  Created by <strong>Singapore Computer Society Product Management Special Interest Group</strong>
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-secondary-600">
                <Zap className="w-4 h-4 text-secondary-600" />
                <span>
                  <strong>AI-Powered:</strong> Leverage context engineering to accelerate strategy mapping
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        className="glass-card p-6 bg-gradient-to-r from-primary-50 to-secondary-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="font-semibold text-gray-800 mb-2">📚 More Guides Coming</h3>
        <p className="text-sm text-gray-600">
          Additional practice guides covering problem discovery, validation techniques, and product strategy 
          will be released regularly by the SCS PM SIG community. Check back soon for new content.
        </p>
      </motion.div>
    </div>
  );
};

export default PracticeGuidesPage;
