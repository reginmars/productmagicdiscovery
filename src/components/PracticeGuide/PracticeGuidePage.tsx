import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Target, Users, Zap, CheckCircle } from 'lucide-react';

const PracticeGuidePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="glass-card p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Practice Guide</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Master problem discovery with hands-on exercises, real-world scenarios, and expert guidance
        </p>
      </div>

      {/* Coming Soon Message */}
      <div className="glass-card p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Comprehensive Practice Guide Coming Soon
          </h2>
          <p className="text-gray-600 mb-8">
            We're crafting an extensive practice guide with interactive exercises, 
            real-world case studies, and step-by-step tutorials to help you master 
            problem discovery methodologies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="glass-card p-4">
              <h3 className="font-semibold text-gray-800 mb-2">📚 What to Expect:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Interactive learning modules</li>
                <li>• Hands-on exercises</li>
                <li>• Real-world case studies</li>
                <li>• Video tutorials</li>
                <li>• Downloadable worksheets</li>
              </ul>
            </div>
            
            <div className="glass-card p-4">
              <h3 className="font-semibold text-gray-800 mb-2">🎯 Topics Covered:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Problem identification techniques</li>
                <li>• Evidence collection methods</li>
                <li>• Stakeholder interviewing</li>
                <li>• Assumption validation</li>
                <li>• Solution prioritization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Preview of Content Structure */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview: Learning Path Structure</h2>
        
        <div className="space-y-4">
          {[
            {
              level: 'Beginner',
              title: 'Foundations of Problem Discovery',
              modules: 5,
              duration: '2 hours',
              icon: <BookOpen className="w-6 h-6" />,
              color: 'green'
            },
            {
              level: 'Intermediate',
              title: 'Advanced Validation Techniques',
              modules: 7,
              duration: '3 hours',
              icon: <Target className="w-6 h-6" />,
              color: 'blue'
            },
            {
              level: 'Advanced',
              title: 'Strategic Problem Framing',
              modules: 6,
              duration: '2.5 hours',
              icon: <Zap className="w-6 h-6" />,
              color: 'purple'
            },
            {
              level: 'Expert',
              title: 'Leading Discovery Teams',
              modules: 8,
              duration: '4 hours',
              icon: <Users className="w-6 h-6" />,
              color: 'amber'
            }
          ].map((path, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 opacity-60"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${path.color}-100 rounded-lg flex items-center justify-center text-${path.color}-600`}>
                    {path.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-gray-800">{path.title}</h3>
                      <span className={`px-2 py-1 bg-${path.color}-100 text-${path.color}-700 text-xs rounded-full`}>
                        {path.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {path.modules} modules • {path.duration}
                    </p>
                  </div>
                </div>
                <div className="text-gray-400 text-sm">Coming Soon</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PracticeGuidePage;
