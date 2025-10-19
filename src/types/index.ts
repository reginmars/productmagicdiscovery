export interface User {
  id: string;
  name: string;
  email: string;
  role: 'product_manager' | 'product_owner' | 'business_analyst' | 'admin';
  avatar?: string;
}

export interface ProblemDiscovery {
  id: string;
  problemDescription: string;
  affectedUsers: string;
  evidence: string;
  businessImpact: string;
  successCriteria: string;
  status: 'draft' | 'analyzing' | 'validated' | 'hmw_generated';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  analysis?: ProblemAnalysis;
  hmwStatements?: HMWStatement[];
}

export interface ProblemAnalysis {
  id: string;
  discoveryId: string;
  rootCauses: string[];
  userPainPoints: string[];
  marketValidation: MarketValidation;
  competitorInsights: string[];
  keyFindings: string[];
  recommendedFocus: string;
  confidenceScore: number;
  analyzedAt: Date;
}

export interface MarketValidation {
  marketSize: string;
  growthTrend: string;
  competitorSolutions: string[];
  industryBenchmarks: string[];
  userDemand: string;
  validationSources: string[];
}

export interface HMWStatement {
  id: string;
  statement: string;
  rationale: string;
  targetOutcome: string;
  potentialSolutions: string[];
  priority: 'high' | 'medium' | 'low';
  feasibility: number;
  impact: number;
  selected: boolean;
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
  discoveryId?: string;
  hmwStatementId?: string;
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
