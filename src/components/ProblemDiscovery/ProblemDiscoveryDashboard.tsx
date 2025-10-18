import React from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, Users, Target, CheckCircle, AlertTriangle } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface ProblemDiscoveryDashboardProps {
  onStartDiscovery: () => void;
}

const ProblemDiscoveryDashboard: React.FC<ProblemDiscoveryDashboardProps> = ({ onStartDiscovery }) => {
  const { opportunities } = useStore();

  const discoveryStats = {
    totalProblems: opportunities.length,
    validatedProblems: opportunities.filter(o => o.status === 'approved').length,
    inProgress: opportunities.filter(o => o.status === 'in_review').length,
    avgValidationTime: '12 days'
  };

  const recentDiscoveries = opportunities.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Problem Discovery</h2>
          <p className="text-gray-600">Systematically identify and validate real problems worth solving</p>
        </div>
        <button
          onClick={onStartDiscovery}
          className="glass-button bg-primary-600 text-white flex items-center gap-2 px-6 py-3"
        >
          <Plus size={20} />
          Start Problem Discovery
        </button>
      </div>

      {/* Discovery Process Overview */}
      <div className="glass-card p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Evidence-Based Problem Discovery Process</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[
            {
              step: 1,
              title: 'Observe Symptoms',
              description: 'Identify observable issues and their impact',
              icon: <AlertTriangle className="w-6 h-6" />,
              color: 'amber'
            },
            {
              step: 2,
              title: 'Validate with Data',
              description: 'Gather evidence to confirm the problem exists',
              icon: <TrendingUp className="w-6 h-6" />,
              color: 'blue'
            },
            {
              step: 3,
              title: 'Analyze Root Causes',
              description: 'Understand why the problem occurs',
              icon: <Target className="w-6 h-6" />,
              color: 'purple'
            },
            {
              step: 4,
              title: 'Define Problem',
              description: 'Craft clear, actionable problem statement',
              icon: <Users className="w-6 h-6" />,
              color: 'green'
            },
            {
              step: 5,
              title: 'Plan Solution',
              description: 'Develop validation strategy for solutions',
              icon: <CheckCircle className="w-6 h-6" />,
              color: 'indigo'
            }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${item.color}-100 flex items-center justify-center text-${item.color}-600`}>
                {item.icon}
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Problems</p>
              <p className="text-2xl font-bold text-gray-800">{discoveryStats.totalProblems}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-600" />
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
              <p className="text-sm text-gray-600">Validated</p>
              <p className="text-2xl font-bold text-green-600">{discoveryStats.validatedProblems}</p>
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
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-600">{discoveryStats.inProgress}</p>
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
              <p className="text-sm text-gray-600">Avg. Validation Time</p>
              <p className="text-2xl font-bold text-gray-800">{discoveryStats.avgValidationTime}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Discoveries */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Recent Problem Discoveries</h3>
          <button className="glass-button text-primary-600">View All</button>
        </div>

        {recentDiscoveries.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-600 mb-2">No discoveries yet</h4>
            <p className="text-gray-500 mb-6">Start your first problem discovery to see results here</p>
            <button
              onClick={onStartDiscovery}
              className="glass-button bg-primary-600 text-white px-6 py-3"
            >
              Start Your First Discovery
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {recentDiscoveries.map((discovery) => (
              <div key={discovery.id} className="glass-card p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{discovery.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{discovery.problemStatement}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>By {discovery.createdBy}</span>
                      <span>{discovery.createdAt.toLocaleDateString()}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        discovery.status === 'approved' ? 'bg-green-100 text-green-700' :
                        discovery.status === 'in_review' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {discovery.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">{discovery.completenessScore}%</div>
                    <div className="text-xs text-gray-500">Complete</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Best Practices */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Problem Discovery Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">✅ Do</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Start with observable symptoms, not solutions</li>
              <li>• Validate problems with concrete data</li>
              <li>• Talk to affected users directly</li>
              <li>• Use the "5 Whys" for root cause analysis</li>
              <li>• Define clear success metrics</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">❌ Avoid</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Jumping to solutions too quickly</li>
              <li>• Relying only on assumptions</li>
              <li>• Solving problems for edge cases</li>
              <li>• Ignoring business impact</li>
              <li>• Skipping user validation</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProblemDiscoveryDashboard;
