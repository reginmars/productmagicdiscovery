import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ExternalLink, 
  Clock,
  Calendar,
  FileText,
  Users,
  Bell,
  CheckCircle2
} from 'lucide-react';

interface Methodology {
  id: string;
  name: string;
  provider: string;
  description: string;
  timeToComplete: string;
  link: string;
  icon: string;
}

const MethodologyLibrary: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const methodologies: Methodology[] = [
    {
      id: 'ideo-design-kit',
      name: 'IDEO Design Kit',
      provider: 'IDEO',
      description: 'Human-centered design methods for understanding users and creating innovative solutions.',
      timeToComplete: '2-4 weeks',
      link: 'https://www.designkit.org/',
      icon: '🎨'
    },
    {
      id: 'makeit-toolkit',
      name: 'MakeIt Toolkit - 15 Strategies',
      provider: 'MakeIt',
      description: '15 proven strategies for product discovery and innovation.',
      timeToComplete: '3-6 weeks',
      link: 'https://www.makeit.com/toolkit',
      icon: '🚀'
    },
    {
      id: 'agile-playbook',
      name: 'Agile Playbook',
      provider: 'Singapore Developer Portal',
      description: 'Comprehensive guide to agile practices and methodologies for teams.',
      timeToComplete: '1-2 weeks',
      link: 'https://docs.developer.tech.gov.sg/docs/agile-playbook/agile-delivery?product=Agile+Way+of+Working',
      icon: '⚡'
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Store email locally for now
      localStorage.setItem('community-notification-email', email);
      setSubscribed(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Methodologies & Resources</h1>
              <p className="text-gray-600">Essential frameworks and community resources</p>
            </div>
          </div>
        </motion.div>

        {/* Methodologies Section */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Useful Tools and References</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {methodologies.map((method, index) => (
              <motion.a
                key={method.id}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl">{method.icon}</span>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                </div>
                
                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-primary-600 transition-colors">
                  {method.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3">{method.provider}</p>
                
                <p className="text-sm text-gray-700 mb-4">
                  {method.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-4 h-4" />
                  {method.timeToComplete}
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Events and Resources Section - Side by Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Events */}
            <a
              href="https://www.scs.org.sg/special-interest-groups/product-management"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                        Events
                      </h3>
                      <p className="text-xs text-gray-500">Singapore Computer Society PM SIG</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-700">
                    Join workshops, talks, and networking sessions with Singapore's product management community.
                  </p>
                </div>
              </div>
            </a>

            {/* Resources */}
            <a
              href="https://www.scs.org.sg/special-interest-groups/product-management"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-primary-600 transition-colors">
                        Resources
                      </h3>
                      <p className="text-xs text-gray-500">Singapore Computer Society PM SIG</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <p className="text-sm text-gray-700">
                    Access curated articles, templates, and best practices from the PM community.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-gray-800">
                    Community
                  </h3>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                    Coming Soon
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Connect with product managers, share discoveries, and collaborate on solving real problems together.
                </p>

                {!subscribed ? (
                  <form onSubmit={handleSubscribe} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Bell className="w-4 h-4" />
                      Notify Me
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">You'll be notified when we launch!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MethodologyLibrary;
