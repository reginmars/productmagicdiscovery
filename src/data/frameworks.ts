import { Framework } from '../types';

export const frameworks: Framework[] = [
  {
    id: 'opportunity-canvas',
    name: 'Opportunity Canvas',
    description: 'A structured approach to define and validate business opportunities with clear problem-solution fit.',
    category: 'opportunity_definition',
    complexity: 'medium',
    timeToComplete: '2-4 hours',
    bestFor: ['Business opportunities', 'Market validation', 'Strategic planning'],
    keywords: ['business', 'market', 'revenue', 'opportunity', 'strategy', 'growth'],
    sections: [
      {
        id: 'problem',
        title: 'Problem Statement',
        description: 'Define the core problem you are solving',
        questions: [
          {
            id: 'problem-desc',
            text: 'What specific problem are you solving?',
            type: 'textarea',
            required: true,
            helpText: 'Be specific and focus on user pain points'
          }
        ],
        required: true
      },
      {
        id: 'target-users',
        title: 'Target Users',
        description: 'Identify who experiences this problem',
        questions: [
          {
            id: 'user-segments',
            text: 'Who are your target user segments?',
            type: 'textarea',
            required: true
          }
        ],
        required: true
      },
      {
        id: 'solution-hypothesis',
        title: 'Solution Hypothesis',
        description: 'Your proposed solution approach',
        questions: [
          {
            id: 'solution-desc',
            text: 'What is your solution hypothesis?',
            type: 'textarea',
            required: true
          }
        ],
        required: true
      }
    ]
  },
  {
    id: 'design-thinking',
    name: 'Design Thinking',
    description: 'Human-centered approach to innovation that integrates needs of people, possibilities of technology, and requirements for business success.',
    category: 'user_experience',
    complexity: 'high',
    timeToComplete: '1-2 weeks',
    bestFor: ['User experience problems', 'Innovation challenges', 'Complex user needs'],
    keywords: ['user', 'experience', 'empathy', 'prototype', 'test', 'human-centered', 'innovation'],
    sections: [
      {
        id: 'empathize',
        title: 'Empathize',
        description: 'Understand your users and their needs',
        questions: [
          {
            id: 'user-research',
            text: 'What do you know about your users?',
            type: 'textarea',
            required: true
          },
          {
            id: 'pain-points',
            text: 'What are their main pain points?',
            type: 'textarea',
            required: true
          }
        ],
        required: true
      },
      {
        id: 'define',
        title: 'Define',
        description: 'Frame the problem in a human-centered way',
        questions: [
          {
            id: 'problem-statement',
            text: 'How might we solve this problem?',
            type: 'textarea',
            required: true
          }
        ],
        required: true
      }
    ]
  },
  {
    id: 'jobs-to-be-done',
    name: 'Jobs-to-be-Done',
    description: 'Framework for understanding customer motivations and the jobs they hire products to do.',
    category: 'customer_insight',
    complexity: 'medium',
    timeToComplete: '3-5 days',
    bestFor: ['Product development', 'Customer research', 'Market positioning'],
    keywords: ['customer', 'job', 'outcome', 'motivation', 'hire', 'progress', 'functional'],
    sections: [
      {
        id: 'job-statement',
        title: 'Job Statement',
        description: 'Define the job customers are trying to get done',
        questions: [
          {
            id: 'functional-job',
            text: 'What functional job is the customer trying to accomplish?',
            type: 'textarea',
            required: true
          },
          {
            id: 'emotional-job',
            text: 'What emotional job needs to be fulfilled?',
            type: 'textarea',
            required: false
          }
        ],
        required: true
      }
    ]
  },
  {
    id: 'lean-startup',
    name: 'Lean Startup',
    description: 'Methodology for developing businesses and products through validated learning, scientific experimentation, and iterative product releases.',
    category: 'validation',
    complexity: 'medium',
    timeToComplete: '1-3 weeks',
    bestFor: ['Startup validation', 'MVP development', 'Hypothesis testing'],
    keywords: ['startup', 'mvp', 'validate', 'experiment', 'pivot', 'learn', 'build-measure-learn'],
    sections: [
      {
        id: 'hypothesis',
        title: 'Hypothesis',
        description: 'Define your key assumptions',
        questions: [
          {
            id: 'value-hypothesis',
            text: 'What is your value hypothesis?',
            type: 'textarea',
            required: true
          },
          {
            id: 'growth-hypothesis',
            text: 'What is your growth hypothesis?',
            type: 'textarea',
            required: true
          }
        ],
        required: true
      }
    ]
  },
  {
    id: 'behavioral-science',
    name: 'Behavioral Science',
    description: 'Apply psychological principles and behavioral insights to understand and influence user behavior.',
    category: 'behavior_change',
    complexity: 'high',
    timeToComplete: '1-2 weeks',
    bestFor: ['Behavior change', 'User engagement', 'Habit formation'],
    keywords: ['behavior', 'psychology', 'habit', 'motivation', 'trigger', 'nudge', 'cognitive'],
    sections: [
      {
        id: 'behavior-analysis',
        title: 'Behavior Analysis',
        description: 'Analyze current and desired behaviors',
        questions: [
          {
            id: 'current-behavior',
            text: 'What is the current user behavior?',
            type: 'textarea',
            required: true
          },
          {
            id: 'desired-behavior',
            text: 'What behavior do you want to encourage?',
            type: 'textarea',
            required: true
          }
        ],
        required: true
      }
    ]
  },
  {
    id: 'agile-methodology',
    name: 'Agile Methodology',
    description: 'Iterative approach to project management and software development that helps teams deliver value faster.',
    category: 'project_management',
    complexity: 'low',
    timeToComplete: '2-4 weeks',
    bestFor: ['Software development', 'Team collaboration', 'Iterative delivery'],
    keywords: ['agile', 'scrum', 'sprint', 'iterative', 'collaboration', 'delivery', 'team'],
    sections: [
      {
        id: 'user-stories',
        title: 'User Stories',
        description: 'Define features from user perspective',
        questions: [
          {
            id: 'epic',
            text: 'What is the main epic or theme?',
            type: 'textarea',
            required: true
          }
        ],
        required: true
      }
    ]
  }
];

export const getFrameworkRecommendations = (problemStatement: string, context?: string): Framework[] => {
  const text = `${problemStatement} ${context || ''}`.toLowerCase();
  
  const scores = frameworks.map(framework => {
    let score = 0;
    
    // Keyword matching
    framework.keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        score += 2;
      }
    });
    
    // Category-specific scoring
    if (text.includes('user') || text.includes('customer') || text.includes('experience')) {
      if (framework.category === 'user_experience' || framework.category === 'customer_insight') {
        score += 3;
      }
    }
    
    if (text.includes('business') || text.includes('revenue') || text.includes('market')) {
      if (framework.category === 'opportunity_definition') {
        score += 3;
      }
    }
    
    if (text.includes('behavior') || text.includes('habit') || text.includes('engagement')) {
      if (framework.category === 'behavior_change') {
        score += 3;
      }
    }
    
    if (text.includes('validate') || text.includes('test') || text.includes('experiment')) {
      if (framework.category === 'validation') {
        score += 3;
      }
    }
    
    if (text.includes('team') || text.includes('project') || text.includes('development')) {
      if (framework.category === 'project_management') {
        score += 3;
      }
    }
    
    return { framework, score };
  });
  
  return scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.framework);
};
