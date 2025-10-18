import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Clock, CheckCircle } from 'lucide-react';

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Active Opportunities',
      value: '24',
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: 'text-primary-600'
    },
    {
      title: 'Completed This Month',
      value: '8',
      change: '+25%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Completion Time',
      value: '5.2 days',
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'text-blue-600'
    },
    {
      title: 'ROI Generated',
      value: '$2.4M',
      change: '+18%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br from-white/20 to-white/5 ${stat.color}`}>
                <Icon size={24} />
              </div>
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
