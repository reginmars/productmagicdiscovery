import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target, CheckCircle, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface DashboardProps {
  onStartDiscovery: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartDiscovery }) => {
  const { opportunities, user } = useStore();

  const stats = {
    totalProblems: opportunities.length,
    validatedProblems: opportunities.filter(o => o.status === 'approved').length,
    inProgress: opportunities.filter(o => o.status === 'in_review').length,
    avgCompleteness: Math.round(opportunities.reduce((acc, o) => acc + o.completenessScore, 0) / opportunities.length) || 0
  };

  const recentActivity = [
    {
      id: 1,
      type: 'problem_validated',
      title: 'Mobile Onboarding Problem Validated',
      description: 'Confirmed 60% drop-off rate with user interviews',
      time: '2 hours ago',
      user: 'Sarah Chen'
    },
    {
      id: 2,
      type: 'solution_tested',
      title: 'Checkout Flow Prototype Tested',
      description: '15% improvement in task completion rate',
      time: '5 hours ago',
      user: 'Alex Johnson'
    },
    {
      id: 3,
      type: 'discovery_started',
      title: 'New Problem Discovery Started',
      description: 'Investigating customer support ticket trends',
      time: '1 day ago',
      user: 'Maria Garcia'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-600">Here's your product discovery progress and insights</p>
        </div>
      </div>

      {/* Value Proposition Banner */}
      <div className="glass-card p-8 bg-gradient-to-r from-primary-50 to-secondary-50">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              🎯 Systematic Problem Discovery
            </h3>
            <p className="text-gray-700 mb-4">
              Stop building solutions for the wrong problems. Our evidence-based approach helps you identify, validate, and solve real user problems using proven methodologies from product management, behavioral science, and design thinking.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Evidence-based validation</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Root cause analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>User-centered approach</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Problems Identified</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalProblems}</p>
              <p className="text-xs text-gray-500 mt-1">Total discoveries</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Validated Problems</p>
              <p className="text-2xl font-bold text-green-600">{stats.validatedProblems}</p>
              <p className="text-xs text-gray-500 mt-1">Ready to solve</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Discovery</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
              <p className="text-xs text-gray-500 mt-1">Being validated</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Completeness</p>
              <p className="text-2xl font-bold text-purple-600">{stats.avgCompleteness}%</p>
              <p className="text-xs text-gray-500 mt-1">Discovery quality</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Discovery Activity</h3>
            
            {recentActivity.length === 0 ? (
              <div className="text-center py-8">
                <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent activity. Start your first problem discovery!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 glass-card hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'problem_validated' ? 'bg-green-100' :
                      activity.type === 'solution_tested' ? 'bg-blue-100' :
                      'bg-yellow-100'
                    }`}>
                      {activity.type === 'problem_validated' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : activity.type === 'solution_tested' ? (
                        <Target className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Search className="w-5 h-5 text-yellow-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Discovery Process Guide */}
        <div>
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">5 Discovery Questions</h3>
            <div className="space-y-4">
              {[
                { step: 1, title: 'What problem?', desc: 'Observable symptoms', color: 'amber' },
                { step: 2, title: 'Who affected?', desc: 'User segments', color: 'blue' },
                { step: 3, title: 'What evidence?', desc: 'Data & validation', color: 'purple' },
                { step: 4, title: 'What impact?', desc: 'Business consequences', color: 'red' },
                { step: 5, title: 'What success?', desc: 'Measurable outcomes', color: 'green' }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center text-sm font-medium`}>
                    {item.step}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Impact Showcase */}
      <div className="glass-card p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Why Problem-First Discovery Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❌</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Without Validation</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 70% of features go unused</li>
              <li>• Solutions don't fit real needs</li>
              <li>• Wasted development resources</li>
              <li>• Poor user adoption</li>
            </ul>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔄</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Our Process</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Evidence-based problem identification</li>
              <li>• User-centered validation</li>
              <li>• Root cause analysis</li>
              <li>• Solution hypothesis testing</li>
            </ul>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">With Validation</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 3x higher feature adoption</li>
              <li>• Faster time to market</li>
              <li>• Better user satisfaction</li>
              <li>• Higher ROI on development</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
