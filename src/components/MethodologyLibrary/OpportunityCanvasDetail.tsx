import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Download, Play, BookOpen, FileText, CheckCircle } from 'lucide-react';

const OpportunityCanvasDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'guides' | 'examples'>('overview');

  const templates = [
    {
      id: 1,
      name: 'Problem Statement Canvas',
      description: 'Define and articulate the core problem you are solving',
      type: 'Interactive Template',
      sections: 5,
      timeToComplete: '30 min'
    },
    {
      id: 2,
      name: 'Assumption Mapping Template',
      description: 'Identify and validate key assumptions about your opportunity',
      type: 'Worksheet',
      sections: 4,
      timeToComplete: '45 min'
    },
    {
      id: 3,
      name: 'Evidence Collection Framework',
      description: 'Systematically gather and organize supporting evidence',
      type: 'Framework',
      sections: 6,
      timeToComplete: '1 hour'
    },
    {
      id: 4,
      name: 'ROI Calculation Model',
      description: 'Calculate potential return on investment for opportunities',
      type: 'Calculator',
      sections: 3,
      timeToComplete: '20 min'
    },
    {
      id: 5,
      name: 'Stakeholder Analysis Canvas',
      description: 'Map stakeholders and their interests in the opportunity',
      type: 'Canvas',
      sections: 4,
      timeToComplete: '40 min'
    },
    {
      id: 6,
      name: 'Risk Assessment Matrix',
      description: 'Identify and evaluate risks associated with the opportunity',
      type: 'Matrix',
      sections: 3,
      timeToComplete: '35 min'
    }
  ];

  const guides = [
    {
      id: 1,
      title: 'Getting Started with Opportunity Canvas',
      description: 'Complete beginner guide to using the framework',
      duration: '15 min read',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Writing Effective Problem Statements',
      description: 'Best practices for articulating problems clearly',
      duration: '20 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Validating Assumptions with Evidence',
      description: 'Techniques for gathering and evaluating evidence',
      duration: '25 min read',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      title: 'Stakeholder Engagement Strategies',
      description: 'How to involve stakeholders in opportunity definition',
      duration: '18 min read',
      difficulty: 'Advanced'
    }
  ];

  const examples = [
    {
      id: 1,
      title: 'E-commerce Checkout Optimization',
      industry: 'E-commerce',
      problem: 'High cart abandonment rate',
      outcome: '35% reduction in abandonment',
      metrics: ['Conversion rate +25%', 'Revenue +$2M annually']
    },
    {
      id: 2,
      title: 'Mobile Banking Onboarding',
      industry: 'FinTech',
      problem: 'Low user activation rate',
      outcome: 'Activation increased from 40% to 72%',
      metrics: ['Time to value -60%', 'User satisfaction +45%']
    },
    {
      id: 3,
      title: 'SaaS Feature Adoption',
      industry: 'B2B SaaS',
      problem: 'New features going unused',
      outcome: 'Feature adoption increased 3x',
      metrics: ['Active users +180%', 'Churn rate -22%']
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="glass-card p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <Target className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Opportunity Canvas Framework</h2>
              <p className="text-gray-600">Product Discovery Institute</p>
            </div>
          </div>
          <button className="glass-button bg-primary-600 text-white px-6 py-3">
            Start Using Framework
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          The Opportunity Canvas Framework provides structured templates for systematic opportunity identification with guided workflows. 
          Define problems, validate assumptions, and map solutions with evidence-based frameworks used by leading product teams worldwide.
        </p>

        <div className="grid grid-cols-4 gap-4">
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-600">Templates</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-sm text-gray-600">Guides</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">15</p>
            <p className="text-sm text-gray-600">Examples</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">2-3h</p>
            <p className="text-sm text-gray-600">To Learn</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-2">
        <div className="flex gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'templates', label: 'Templates', icon: <FileText className="w-4 h-4" /> },
            { id: 'guides', label: 'Guides', icon: <Play className="w-4 h-4" /> },
            { id: 'examples', label: 'Examples', icon: <CheckCircle className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Core Concepts</h4>
                <ul className="space-y-2">
                  {[
                    'Problem-first thinking methodology',
                    'Evidence-based opportunity validation',
                    'Assumption identification and testing',
                    'Stakeholder alignment techniques',
                    'ROI calculation frameworks',
                    'Risk assessment and mitigation'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Practical Skills</h4>
                <ul className="space-y-2">
                  {[
                    'Writing clear problem statements',
                    'Mapping and validating assumptions',
                    'Collecting and organizing evidence',
                    'Calculating opportunity ROI',
                    'Conducting stakeholder analysis',
                    'Creating risk mitigation plans'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">When to Use This Framework</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-4">
                <h4 className="font-medium text-gray-800 mb-2">✅ Best For</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• New product opportunities</li>
                  <li>• Business case development</li>
                  <li>• Strategic planning</li>
                  <li>• Stakeholder alignment</li>
                </ul>
              </div>
              <div className="glass-card p-4">
                <h4 className="font-medium text-gray-800 mb-2">⚠️ Consider Alternatives</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Rapid prototyping needs</li>
                  <li>• Pure UX research</li>
                  <li>• Technical architecture</li>
                  <li>• Agile sprint planning</li>
                </ul>
              </div>
              <div className="glass-card p-4">
                <h4 className="font-medium text-gray-800 mb-2">🔄 Combine With</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Design Thinking Toolkit</li>
                  <li>• Behavioral Science methods</li>
                  <li>• Agile Playbook</li>
                  <li>• User research techniques</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {template.type}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span>{template.sections} sections</span>
                <span>•</span>
                <span>{template.timeToComplete}</span>
              </div>

              <div className="flex gap-2">
                <button className="glass-button flex-1 bg-primary-600 text-white">
                  Use Template
                </button>
                <button className="glass-button">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'guides' && (
        <div className="space-y-4">
          {guides.map((guide) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{guide.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {guide.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{guide.description}</p>
                  <p className="text-xs text-gray-500">{guide.duration}</p>
                </div>
                <button className="glass-button ml-4">
                  Read Guide
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'examples' && (
        <div className="grid grid-cols-1 gap-6">
          {examples.map((example) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{example.title}</h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {example.industry}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <strong>Problem:</strong> {example.problem}
                  </p>
                  <p className="text-green-700 font-medium mb-3">
                    <strong>Outcome:</strong> {example.outcome}
                  </p>
                  <div className="flex gap-4">
                    {example.metrics.map((metric, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-lg">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="glass-button">
                  View Full Case Study
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OpportunityCanvasDetail;
