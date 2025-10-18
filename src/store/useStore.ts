import { create } from 'zustand';
import { User, OpportunityCanvas, Framework, ProblemDiscovery } from '../types';
import { frameworks } from '../data/frameworks';

interface AppState {
  user: User | null;
  opportunities: OpportunityCanvas[];
  frameworks: Framework[];
  currentOpportunity: OpportunityCanvas | null;
  discoveries: ProblemDiscovery[];
  currentDiscovery: ProblemDiscovery | null;
  
  // Actions
  setUser: (user: User) => void;
  setOpportunities: (opportunities: OpportunityCanvas[]) => void;
  addOpportunity: (opportunity: OpportunityCanvas) => void;
  updateOpportunity: (id: string, updates: Partial<OpportunityCanvas>) => void;
  setCurrentOpportunity: (opportunity: OpportunityCanvas | null) => void;
  setFrameworks: (frameworks: Framework[]) => void;
  addDiscovery: (discovery: ProblemDiscovery) => void;
  updateDiscovery: (id: string, updates: Partial<ProblemDiscovery>) => void;
  setCurrentDiscovery: (discovery: ProblemDiscovery | null) => void;
}

export const useStore = create<AppState>((set, get) => ({
  user: {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'product_manager',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  opportunities: [
    {
      id: '1',
      title: 'Mobile App Onboarding Optimization',
      description: 'Users are dropping off during the mobile app onboarding process, leading to low activation rates.',
      problemStatement: 'New users are experiencing friction during the mobile app onboarding process, with 60% dropping off before completing their profile setup.',
      framework: 'design-thinking',
      status: 'in_review',
      completenessScore: 85,
      createdBy: 'Sarah Chen',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      version: 2,
      targetUsers: ['New mobile users', 'First-time app downloaders'],
      businessGoals: ['Increase activation rate', 'Reduce time to value'],
      successMetrics: [
        {
          id: '1',
          name: 'Activation Rate',
          description: 'Percentage of users completing onboarding',
          baseline: 40,
          target: 70,
          unit: '%',
          timeframe: '3 months'
        }
      ],
      assumptions: [
        {
          id: '1',
          description: 'Users find the current onboarding too long',
          confidence: 'high',
          validationMethod: 'User interviews',
          status: 'validated'
        }
      ],
      risks: [
        {
          id: '1',
          description: 'Changes might confuse existing users',
          probability: 'medium',
          impact: 'low',
          mitigation: 'A/B test with gradual rollout',
          owner: 'Sarah Chen'
        }
      ],
      solutionHypothesis: 'By simplifying the onboarding flow and reducing required steps, we can increase activation rates.',
      roiCalculation: {
        implementationCost: 50000,
        timeToMarket: 6,
        revenueImpact: 200000,
        costSavings: 0,
        marketOpportunitySize: 1000000,
        roi: 3.0
      }
    },
    {
      id: '2',
      title: 'E-commerce Checkout Abandonment',
      description: 'High cart abandonment rates during checkout process affecting revenue.',
      problemStatement: 'Customers are abandoning their carts at a rate of 70% during the checkout process.',
      framework: 'behavioral-science',
      status: 'approved',
      completenessScore: 92,
      createdBy: 'Alex Johnson',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18'),
      version: 1,
      targetUsers: ['E-commerce customers', 'Returning buyers'],
      businessGoals: ['Reduce cart abandonment', 'Increase conversion rate'],
      successMetrics: [
        {
          id: '2',
          name: 'Cart Abandonment Rate',
          description: 'Percentage of carts abandoned during checkout',
          baseline: 70,
          target: 50,
          unit: '%',
          timeframe: '2 months'
        }
      ],
      assumptions: [],
      risks: [],
      solutionHypothesis: 'By applying behavioral science principles to reduce friction and anxiety, we can decrease abandonment.',
      roiCalculation: {
        implementationCost: 30000,
        timeToMarket: 4,
        revenueImpact: 500000,
        costSavings: 0,
        marketOpportunitySize: 2000000,
        roi: 15.67
      }
    }
  ],
  frameworks: frameworks,
  currentOpportunity: null,
  discoveries: [],
  currentDiscovery: null,

  setUser: (user) => set({ user }),
  
  setOpportunities: (opportunities) => set({ opportunities }),
  
  addOpportunity: (opportunity) => set((state) => ({
    opportunities: [...state.opportunities, opportunity]
  })),
  
  updateOpportunity: (id, updates) => set((state) => ({
    opportunities: state.opportunities.map(opp => 
      opp.id === id ? { ...opp, ...updates } : opp
    ),
    currentOpportunity: state.currentOpportunity?.id === id 
      ? { ...state.currentOpportunity, ...updates }
      : state.currentOpportunity
  })),
  
  setCurrentOpportunity: (opportunity) => set({ currentOpportunity: opportunity }),
  
  setFrameworks: (frameworks) => set({ frameworks }),

  addDiscovery: (discovery) => set((state) => ({
    discoveries: [...state.discoveries, discovery]
  })),

  updateDiscovery: (id, updates) => set((state) => ({
    discoveries: state.discoveries.map(disc => 
      disc.id === id ? { ...disc, ...updates } : disc
    ),
    currentDiscovery: state.currentDiscovery?.id === id 
      ? { ...state.currentDiscovery, ...updates }
      : state.currentDiscovery
  })),

  setCurrentDiscovery: (discovery) => set({ currentDiscovery: discovery })
}));
