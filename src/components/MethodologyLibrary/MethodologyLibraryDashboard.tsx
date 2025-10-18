import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Zap, Users, Brain, ArrowRight, Search, Filter, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Methodology {
  id: string;
  name: string;
  provider: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  bestFor: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToLearn: string;
  resources: {
    templates: number;
    guides: number;
    examples: number;
  };
}

const MethodologyLibraryDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMethodology, setSelectedMethodology] = useState<Methodology | null>(null);

  const methodologies: Methodology[] = [
    {
      id: 'opportunity-canvas',
      name: 'Opportunity Canvas Framework',
      provider: 'Product Discovery Institute',
      description: 'Structured templates for systematic opportunity identification with guided workflows. Define problems, validate assumptions, and map solutions with evidence-based frameworks.',
      category: 'opportunity_definition',
      icon: <Target className="w-8 h-8" />,
      color: 'blue',
      features: [
        'Problem Statement Templates',
        'Assumption Mapping Tools',
        'Evidence Collection Framework',
        'ROI Calculation Models',
        'Stakeholder Analysis Canvas',
        'Risk Assessment Matrix'
      ],
      bestFor: [
        'Defining new product opportunities',
        'Validating business cases',
        'Strategic planning sessions',
        'Stakeholder alignment'
      ],
      difficulty: 'intermediate',
      timeToLearn: '2-3 hours',
      resources: {
        templates: 12,
        guides: 8,
        examples: 15
      }
    },
    {
      id: 'agile-playbook',
      name: 'Singapore Developer Portal Agile Playbook',
      provider: 'Singapore Government Developer Portal',
      description: 'Integrated agile development methodologies with sprint planning capabilities. Comprehensive guide to implementing agile practices with government-tested frameworks.',
      category: 'agile_development',
      icon: <Zap className="w-8 h-8" />,
      color: 'purple',
      features: [
        'Sprint Planning Templates',
        'User Story Mapping',
        'Backlog Prioritization Framework',
        'Retrospective Guides',
        'Velocity Tracking Tools',
        'Team Collaboration Workflows'
      ],
      bestFor: [
        'Agile team setup',
        'Sprint planning and execution',
        'Continuous improvement',
        'Team collaboration'
      ],
      difficulty: 'beginner',
      timeToLearn: '3-4 hours',
      resources: {
        templates: 18,
        guides: 12,
        examples: 25
      }
    },
    {
      id: 'design-thinking',
      name: 'IDEO Design Thinking Toolkit',
      provider: 'IDEO',
      description: 'Human-centered problem-solving modules with empathy mapping and ideation tools. World-renowned design thinking methodology from innovation leaders.',
      category: 'design_thinking',
      icon: <Users className="w-8 h-8" />,
      color: 'green',
      features: [
        'Empathy Mapping Canvas',
        'Journey Mapping Tools',
        'Ideation Frameworks',
        'Prototyping Guidelines',
        'User Testing Templates',
        'Iteration Workflows'
      ],
      bestFor: [
        'User experience design',
        'Innovation workshops',
        'Customer research',
        'Product ideation'
      ],
      difficulty: 'intermediate',
      timeToLearn: '4-5 hours',
      resources: {
        templates: 15,
        guides: 10,
        examples: 20
      }
    },
    {
      id: 'behavioral-science',
      name: 'Make It Toolkit Behavioral Science',
      provider: 'Make It Toolkit',
      description: 'User behavior analysis components with behavioral trigger identification. Apply behavioral science principles to understand and influence user actions.',
      category: 'behavioral_science',
      icon: <Brain className="w-8 h-8" />,
      color: 'amber',
      features: [
        'Behavior Analysis Framework',
        'Trigger Identification Tools',
        'Motivation Mapping',
        'Habit Formation Models',
        'Cognitive Bias Checklist',
        'Behavioral Experiment Design'
      ],
      bestFor: [
        'Behavior change initiatives',
        'User engagement optimization',
        'Habit formation products',
        'Conversion optimization'
      ],
      difficulty: 'advanced',
      timeToLearn: '5-6 hours',
      resources: {
        templates: 10,
        guides: 14,
        examples: 18
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Methodologies', count: methodologies.length },
    { id: 'opportunity_definition', label: 'Opportunity Definition', count: 1 },
    { id: 'agile_development', label: 'Agile Development', count: 1 },
    { id: 'design_thinking', label: 'Design Thinking', count: 1 },
    { id: 'behavioral_science', label: 'Behavioral Science', count: 1 }
  ];

  const filteredMethodologies = methodologies.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Methodology Library</h2>
          <p className="text-gray-600">Access proven frameworks and methodologies for systematic problem discovery</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="glass-button flex items-center gap-2">
            <Star className="w-4 h-4" />
            My Favorites
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="glass-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search methodologies, frameworks, tools..."
              className="glass-input w-full pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="glass-input"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.label} ({cat.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Methodologies</p>
              <p className="text-2xl font-bold text-gray-800">{methodologies.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm text-gray-600">Total Templates</p>
              <p className="text-2xl font-bold text-gray-800">
                {methodologies.reduce((acc, m) => acc + m.resources.templates, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600" />
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
              <p className="text-sm text-gray-600">Practical Guides</p>
              <p className="text-2xl font-bold text-gray-800">
                {methodologies.reduce((acc, m) => acc + m.resources.guides, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
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
              <p className="text-sm text-gray-600">Real Examples</p>
              <p className="text-2xl font-bold text-gray-800">
                {methodologies.reduce((acc, m) => acc + m.resources.examples, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Methodology Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMethodologies.map((methodology, index) => (
          <motion.div
            key={methodology.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card p-6 cursor-pointer hover:shadow-xl transition-all ${
              selectedMethodology?.id === methodology.id ? 'ring-2 ring-primary-400' : ''
            }`}
            onClick={() => setSelectedMethodology(methodology)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-${methodology.color}-100 rounded-xl flex items-center justify-center text-${methodology.color}-600`}>
                  {methodology.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{methodology.name}</h3>
                  <p className="text-sm text-gray-600">{methodology.provider}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(methodology.difficulty)}`}>
                {methodology.difficulty}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{methodology.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Key Features:</h4>
              <div className="grid grid-cols-2 gap-2">
                {methodology.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              {methodology.features.length > 4 && (
                <p className="text-xs text-gray-500 mt-2">+{methodology.features.length - 4} more features</p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-glass-border">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{methodology.resources.templates} templates</span>
                <span>•</span>
                <span>{methodology.timeToLearn}</span>
              </div>
              <button className="glass-button text-primary-600 hover:bg-primary-50 flex items-center gap-2">
                Explore
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Methodology Detail */}
      {selectedMethodology && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 bg-${selectedMethodology.color}-100 rounded-xl flex items-center justify-center text-${selectedMethodology.color}-600`}>
                {selectedMethodology.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{selectedMethodology.name}</h3>
                <p className="text-gray-600">{selectedMethodology.provider}</p>
              </div>
            </div>
            <button className="glass-button">
              <Star className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">All Features</h4>
              <div className="space-y-2">
                {selectedMethodology.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Best For</h4>
              <div className="space-y-2">
                {selectedMethodology.bestFor.map((use, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-primary-600">{selectedMethodology.resources.templates}</p>
              <p className="text-sm text-gray-600">Templates</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{selectedMethodology.resources.guides}</p>
              <p className="text-sm text-gray-600">Guides</p>
            </div>
            <div className="glass-card p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{selectedMethodology.resources.examples}</p>
              <p className="text-sm text-gray-600">Examples</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="glass-button bg-primary-600 text-white px-8 py-3 flex-1">
              Start Using This Methodology
            </button>
            <button className="glass-button px-8 py-3">
              View Documentation
            </button>
          </div>
        </motion.div>
      )}

      {/* Getting Started Guide */}
      <div className="glass-card p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">How to Use the Methodology Library</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: 1,
              title: 'Explore',
              description: 'Browse methodologies and understand their strengths',
              icon: <Search className="w-6 h-6" />
            },
            {
              step: 2,
              title: 'Select',
              description: 'Choose the methodology that fits your problem type',
              icon: <Target className="w-6 h-6" />
            },
            {
              step: 3,
              title: 'Learn',
              description: 'Study templates, guides, and real-world examples',
              icon: <BookOpen className="w-6 h-6" />
            },
            {
              step: 4,
              title: 'Apply',
              description: 'Use the methodology in your problem discovery process',
              icon: <Zap className="w-6 h-6" />
            }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mx-auto mb-4">
                {item.icon}
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MethodologyLibraryDashboard;
