export interface User {
  id: string;
  name: string;
  email: string;
  role: 'product_manager' | 'product_owner' | 'business_analyst' | 'admin';
  avatar?: string;
}

export interface OpportunityCanvas {
  id: string;
  title: string;
  description: string;
  problemStatement: string;
  targetUsers: string[];
  businessGoals: string[];
  successMetrics: KPI[];
  assumptions: Assumption[];
  risks: Risk[];
  solutionHypothesis: string;
  roiCalculation: ROICalculation;
  status: 'draft' | 'in_review' | 'approved' | 'rejected';
  framework: string;
  completenessScore: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface KPI {
  id: string;
  name: string;
  description: string;
  baseline: number;
  target: number;
  unit: string;
  timeframe: string;
}

export interface Assumption {
  id: string;
  description: string;
  confidence: 'low' | 'medium' | 'high';
  validationMethod: string;
  status: 'untested' | 'testing' | 'validated' | 'invalidated';
}

export interface Risk {
  id: string;
  description: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  mitigation: string;
  owner: string;
}

export interface ROICalculation {
  implementationCost: number;
  timeToMarket: number;
  revenueImpact: number;
  costSavings: number;
  marketOpportunitySize: number;
  roi: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  parentId?: string;
}

export interface Framework {
  id: string;
  name: string;
  description: string;
  category: 'opportunity_definition' | 'user_experience' | 'customer_insight' | 'validation' | 'behavior_change' | 'project_management';
  complexity: 'low' | 'medium' | 'high';
  timeToComplete: string;
  bestFor: string[];
  keywords: string[];
  sections: FrameworkSection[];
}

export interface FrameworkSection {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  required: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'select' | 'multiselect' | 'number' | 'date';
  options?: string[];
  required: boolean;
  helpText?: string;
}
