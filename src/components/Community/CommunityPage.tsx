import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, CheckCircle, Sparkles, MessageCircle, BookOpen, Target } from 'lucide-react';
import toast from 'react-hot-toast';

const CommunityPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      toast.success('Welcome to the founding community! 🎉');
      setEmail('');
    }, 500);
  };

  const upcomingFeatures = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Discussion Forums',
      description: 'Connect with fellow product managers and share insights'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Knowledge Base',
      description: 'Access curated resources and best practices from the community'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Case Study Library',
      description: 'Learn from real-world problem discovery success stories'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Expert Office Hours',
      description: 'Get guidance from experienced product leaders'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="glass-card p-12 text-center relative overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-200/30 to-secondary-200/30 rounded-full blur-3xl"
        />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Community Coming Soon
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join a vibrant community of product managers, designers, and innovators 
            who are passionate about solving real problems.
          </p>

          <div className="flex items-center justify-center gap-2 text-primary-600 mb-8">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Be among the first to know when we launch!</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </motion.div>
      </div>

      {/* Email Signup */}
      <div className="glass-card p-8">
        <div className="max-w-2xl mx-auto">
          {!isSubmitted ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Become a Founding Community Member
              </h2>
              <p className="text-gray-600 mb-8 text-center">
                Get exclusive early access, special perks, and be part of shaping our community from day one.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="glass-input w-full pl-12 py-4 text-lg"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glass-button bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-4 text-lg font-semibold"
                >
                  Join the Founding Community
                </motion.button>
              </form>

              <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <h3 className="font-semibold text-primary-800 mb-2">🎁 Founding Member Benefits:</h3>
                <ul className="space-y-1 text-sm text-primary-700">
                  <li>✓ Exclusive early access to community features</li>
                  <li>✓ Special founding member badge</li>
                  <li>✓ Priority access to expert office hours</li>
                  <li>✓ Influence community roadmap and features</li>
                  <li>✓ Lifetime founding member status</li>
                </ul>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                You're In! 🎉
              </h3>
              <p className="text-gray-600 mb-6">
                Welcome to the founding community! We'll keep you updated on our launch 
                and send you exclusive early access when we're ready.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="glass-button text-primary-600"
              >
                Invite Another Member
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Upcoming Features */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          What's Coming to the Community
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Values */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Our Community Values
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h3 className="font-semibold text-gray-800 mb-2">Collaboration</h3>
            <p className="text-sm text-gray-600">
              Share knowledge and learn from each other's experiences
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">Problem-First</h3>
            <p className="text-sm text-gray-600">
              Focus on understanding problems before jumping to solutions
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-800 mb-2">Evidence-Based</h3>
            <p className="text-sm text-gray-600">
              Make decisions backed by data and user research
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityPage;
