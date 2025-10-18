import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, Sparkles, CheckCircle, Loader, ArrowRight, Copy, ThumbsUp } from 'lucide-react';
import { ProblemDiscovery } from '../../types';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

interface HMWGenerationPageProps {
  discovery: ProblemDiscovery;
  onBack: () => void;
}

const HMWGenerationPage: React.FC<HMWGenerationPageProps> = ({ discovery, onBack }) => {
  const { updateDiscovery } = useStore();
  const [isGenerating, setIsGenerating] = useState(true);
  const [hmwStatements, setHmwStatements] = useState<string[]>([]);
  const [selectedStatements, setSelectedStatements] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Simulate HMW generation process
    const generateHMWStatements = async () => {
      setIsGenerating(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Generate mock HMW statements based on discovery and analysis
      const statements = [
        `How might we simplify the payment process for mobile users to reduce cart abandonment from 85.6% to below 50%?`,
        `How might we increase trust and transparency during checkout to help users feel confident completing their purchase?`,
        `How might we reduce the number of steps in our checkout flow while maintaining necessary information collection?`
      ];

      setHmwStatements(statements);
      setIsGenerating(false);
      toast.success('HMW statements generated! Select the ones you want to explore.');
    };

    generateHMWStatements();
  }, [discovery.id]);

  const handleToggleStatement = (index: number) => {
    const newSelected = new Set(selectedStatements);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedStatements(newSelected);
  };

  const handleCopyStatement = (statement: string) => {
    navigator.clipboard.writeText(statement);
    toast.success('Copied to clipboard!');
  };

  const handleProceedToOpportunities = () => {
    if (selectedStatements.size === 0) {
      toast.error('Please select at least one HMW statement');
      return;
    }

    const selected = Array.from(selectedStatements).map(i => hmwStatements[i]);
    
    updateDiscovery(discovery.id, {
      status: 'in_progress',
      hmwStatements: selected
    });

    toast.success(`${selected.length} HMW statement(s) saved! Ready to explore opportunities.`);
    
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  if (isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-[600px]"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Generating "How Might We" Statements</h2>
          <p className="text-gray-600 mb-6">
            Transforming your validated problem into actionable opportunity statements...
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2"
            >
              <Loader className="w-4 h-4 animate-spin" />
              <span>Analyzing root causes and pain points...</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex items-center justify-center gap-2"
            >
              <Loader className="w-4 h-4 animate-spin" />
              <span>Crafting opportunity-focused questions...</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="glass-button flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Hub
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span>{selectedStatements.size} statement(s) selected</span>
        </div>
      </div>

      {/* Title Section */}
      <div className="glass-card p-8 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">"How Might We" Statements</h1>
            <p className="text-gray-700 mb-4">
              Based on your validated problem discovery, we've generated opportunity-focused questions. 
              These HMW statements will guide your ideation and solution exploration.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-purple-700 font-medium">
                Select the statements you want to explore further
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Context Reminder */}
      <div className="glass-card p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">📋 Problem Context</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-800 font-medium mb-1">Industry:</p>
            <p className="text-blue-700">{discovery.industry}</p>
          </div>
          <div>
            <p className="text-blue-800 font-medium mb-1">Problem:</p>
            <p className="text-blue-700 line-clamp-2">{discovery.problemDescription}</p>
          </div>
        </div>
      </div>

      {/* HMW Statements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Generated Statements</h2>
        {hmwStatements.map((statement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-6 cursor-pointer transition-all ${
              selectedStatements.has(index)
                ? 'border-2 border-primary-500 bg-primary-50'
                : 'hover:shadow-lg'
            }`}
            onClick={() => handleToggleStatement(index)}
          >
            <div className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                selectedStatements.has(index)
                  ? 'bg-primary-600'
                  : 'bg-gray-200'
              }`}>
                {selectedStatements.has(index) ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-gray-600 font-bold">{index + 1}</span>
                )}
              </div>
              
              <div className="flex-1">
                <p className={`text-lg font-medium mb-3 ${
                  selectedStatements.has(index) ? 'text-primary-900' : 'text-gray-800'
                }`}>
                  {statement}
                </p>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyStatement(statement);
                    }}
                    className="glass-button text-sm flex items-center gap-2"
                  >
                    <Copy size={14} />
                    Copy
                  </button>
                  
                  {selectedStatements.has(index) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 text-sm text-green-600"
                    >
                      <ThumbsUp size={14} />
                      <span>Selected for exploration</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Box */}
      <div className="glass-card p-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <strong>💡 What makes a good HMW statement?</strong>
            <ul className="mt-2 space-y-1 ml-4">
              <li>• Focuses on opportunities, not solutions</li>
              <li>• Is broad enough to allow creativity</li>
              <li>• Is specific enough to be actionable</li>
              <li>• Frames the problem from the user's perspective</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="glass-card p-6 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-800 mb-1">Ready to explore opportunities?</h3>
            <p className="text-sm text-gray-600">
              {selectedStatements.size > 0
                ? `You've selected ${selectedStatements.size} statement(s) to work with`
                : 'Select at least one HMW statement to continue'}
            </p>
          </div>
          <button
            onClick={handleProceedToOpportunities}
            disabled={selectedStatements.size === 0}
            className="glass-button bg-primary-600 text-white px-6 py-3 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Explore Opportunities
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HMWGenerationPage;
