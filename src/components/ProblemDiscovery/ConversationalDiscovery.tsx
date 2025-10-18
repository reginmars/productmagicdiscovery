import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageCircle, Sparkles, CheckCircle, ChevronDown, ChevronUp, List } from 'lucide-react';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';
import { ProblemDiscovery } from '../../types';

interface ConversationalDiscoveryProps {
  onBack: () => void;
  onProceedToAnalysis: (discovery: ProblemDiscovery) => void;
}

const ConversationalDiscovery: React.FC<ConversationalDiscoveryProps> = ({ 
  onBack, 
  onProceedToAnalysis 
}) => {
  const { addDiscovery, user } = useStore();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuestionPreview, setShowQuestionPreview] = useState(false);

  const conversation = [
    {
      id: 'industry',
      coach: "Hey there! 👋 Before we dive in, let's set some context. What industry or domain are you working in?",
      placeholder: "e.g., 'E-commerce', 'Healthcare', 'FinTech', 'SaaS'...",
      followUp: "This helps me understand your market context better!",
      color: 'indigo',
      icon: '🏢',
      shortTitle: 'Industry Context'
    },
    {
      id: 'problemDescription',
      coach: "Perfect! Now, let's explore the problem. What's been keeping you up at night? What issue have you been noticing?",
      placeholder: "Start typing... e.g., 'Our users keep abandoning their shopping carts...'",
      followUp: "That's interesting. Can you tell me more about what you're seeing?",
      color: 'amber',
      icon: '🔍',
      shortTitle: 'Problem Description'
    },
    {
      id: 'affectedUsers',
      coach: "Got it. Now, who's feeling the pain here? Which users or teams are being affected by this?",
      placeholder: "e.g., 'Mostly new mobile users in their 30s...'",
      followUp: "Interesting! Anyone else impacted by this?",
      color: 'blue',
      icon: '👥',
      shortTitle: 'Affected Users'
    },
    {
      id: 'evidence',
      coach: "Okay, let's get concrete. What evidence do you have that this is actually happening? Any data, feedback, or research?",
      placeholder: "e.g., 'Analytics show 60% cart abandonment, plus we have 127 support tickets...'",
      followUp: "Great! The more specific, the better. What else are you seeing?",
      color: 'purple',
      icon: '📊',
      shortTitle: 'Evidence & Data'
    },
    {
      id: 'businessImpact',
      coach: "Now the big question - what's this costing you? What happens if this problem doesn't get solved?",
      placeholder: "e.g., 'We're losing about $50K monthly, and customer satisfaction dropped...'",
      followUp: "That's significant. Any other impacts you're seeing?",
      color: 'red',
      icon: '💰',
      shortTitle: 'Business Impact'
    },
    {
      id: 'successCriteria',
      coach: "Last one! If we solve this perfectly, what does success look like? How will you know you've won?",
      placeholder: "e.g., 'Cart abandonment below 30%, payment completion at 85%+...'",
      followUp: "Perfect! What other metrics would tell you this is solved?",
      color: 'green',
      icon: '🎯',
      shortTitle: 'Success Criteria'
    }
  ];

  const currentQ = conversation[currentQuestion];

  const handleSendMessage = () => {
    if (!currentInput.trim() || currentInput.trim().length < 10) {
      toast.error('Please share a bit more detail (at least 10 characters)');
      return;
    }

    // Save response
    setResponses(prev => ({
      ...prev,
      [currentQ.id]: currentInput
    }));

    // Show typing indicator
    setIsTyping(true);
    setCurrentInput('');

    // Move to next question after brief delay
    setTimeout(() => {
      setIsTyping(false);
      if (currentQuestion < conversation.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleComplete();
      }
    }, 1500);
  };

  const handleComplete = () => {
    const discovery: ProblemDiscovery = {
      id: `discovery-${Date.now()}`,
      industry: responses.industry,
      problemDescription: responses.problemDescription,
      affectedUsers: responses.affectedUsers,
      evidence: responses.evidence,
      businessImpact: responses.businessImpact,
      successCriteria: responses.successCriteria,
      status: 'draft',
      createdBy: user?.name || 'Current User',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    addDiscovery(discovery);
    toast.success('Great conversation! Let\'s analyze what you shared...');
    
    setTimeout(() => {
      onProceedToAnalysis(discovery);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const progress = ((currentQuestion + 1) / conversation.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Header */}
      <div className="glass-card sticky top-0 z-10 border-b border-glass-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="glass-button flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowQuestionPreview(!showQuestionPreview)}
                className="glass-button flex items-center gap-2 text-sm"
              >
                <List size={16} />
                {showQuestionPreview ? 'Hide' : 'Show'} Questions
                {showQuestionPreview ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {conversation.length}
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Question Preview Panel */}
          <AnimatePresence>
            {showQuestionPreview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-glass-border">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Discovery Questions Overview</h3>
                  <div className="grid gap-2">
                    {conversation.map((q, index) => (
                      <div
                        key={q.id}
                        className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
                          index === currentQuestion
                            ? 'bg-primary-50 border-2 border-primary-300'
                            : index < currentQuestion
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-[140px]">
                          <span className="text-xl">{q.icon}</span>
                          <span className="text-xs font-medium text-gray-600">
                            Question {index + 1}
                          </span>
                          {index < currentQuestion && (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          )}
                          {index === currentQuestion && (
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">{q.shortTitle}</p>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-1">{q.coach}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-6 py-8 pb-32">
        <div className="space-y-6">
          {/* Previous Messages */}
          <AnimatePresence>
            {conversation.slice(0, currentQuestion).map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Coach Message */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                    AI
                  </div>
                  <div className="glass-card p-4 max-w-2xl">
                    <p className="text-gray-700">{q.coach}</p>
                  </div>
                </div>

                {/* User Response */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="glass-card p-4 max-w-2xl bg-primary-50 border-primary-200">
                    <p className="text-gray-800">{responses[q.id]}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{q.icon}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Current Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Coach Message */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                AI
              </div>
              <div className="glass-card p-4 max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{currentQ.icon}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-${currentQ.color}-100 text-${currentQ.color}-700`}>
                    Question {currentQuestion + 1}
                  </span>
                </div>
                <p className="text-gray-700 text-lg">{currentQ.coach}</p>
              </div>
            </div>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  AI
                </div>
                <div className="glass-card p-4">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Input Area */}
          {!isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky bottom-6"
            >
              <div className="glass-card p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={currentQ.placeholder}
                      className="w-full glass-input resize-none"
                      rows={3}
                      autoFocus
                    />
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        {currentInput.length} characters • Press Enter to send, Shift+Enter for new line
                      </p>
                      {currentInput.trim().length >= 10 && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Looking good!
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={currentInput.trim().length < 10}
                    className="glass-button bg-primary-600 text-white px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 h-fit"
                  >
                    {currentQuestion === conversation.length - 1 ? (
                      <>
                        Complete
                        <Sparkles size={16} />
                      </>
                    ) : (
                      <>
                        Send
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Helpful Tips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 glass-card p-3 bg-blue-50 border-blue-200"
              >
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> {currentQ.followUp}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Progress Footer */}
      <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-glass-border py-3">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2">
            {conversation.map((q, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index < currentQuestion
                    ? 'w-8 bg-green-500'
                    : index === currentQuestion
                    ? 'w-12 bg-primary-500'
                    : 'w-8 bg-gray-300'
                }`}
                title={q.shortTitle}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConversationalDiscovery;
