export interface DiscoveryRequest {
  problemDescription: string;
  affectedUsers: string;
  evidence: string;
  businessImpact: string;
  successCriteria: string;
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

export interface ResearchResult {
  query: string;
  results: Array<{
    title: string;
    url: string;
    content: string;
    score: number;
  }>;
}

export interface AIAnalysisResult {
  rootCauses: string[];
  userPainPoints: string[];
  competitorInsights: string[];
  keyFindings: string[];
  recommendedFocus: string;
  confidenceScore: number;
}
