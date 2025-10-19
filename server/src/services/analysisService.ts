import { TavilyService } from './tavilyService.js';
import { OpenAIService } from './openaiService.js';
import { DiscoveryRequest, ProblemAnalysis } from '../types/index.js';

export class AnalysisService {
  private tavilyService: TavilyService;
  private openaiService: OpenAIService;

  constructor(tavilyApiKey: string, openaiApiKey: string) {
    this.tavilyService = new TavilyService(tavilyApiKey);
    this.openaiService = new OpenAIService(openaiApiKey);
  }

  async analyzeDiscovery(
    discoveryId: string,
    discovery: DiscoveryRequest
  ): Promise<ProblemAnalysis> {
    console.log('Starting analysis for discovery:', discoveryId);

    // Step 1: Generate research queries based on the discovery
    const researchQueries = this.generateResearchQueries(discovery);
    console.log('Generated research queries:', researchQueries);

    // Step 2: Perform web research using Tavily
    console.log('Performing web research...');
    const researchResults = await this.tavilyService.multiSearch(researchQueries);
    console.log(`Completed ${researchResults.length} research queries`);

    // Step 3: Analyze with AI
    console.log('Analyzing with AI...');
    const aiAnalysis = await this.openaiService.analyzeDiscovery(
      discovery,
      researchResults
    );

    // Step 4: Extract market validation
    console.log('Extracting market validation...');
    const marketValidation = await this.openaiService.extractMarketValidation(
      researchResults
    );

    // Step 5: Compile final analysis
    const analysis: ProblemAnalysis = {
      id: `analysis-${Date.now()}`,
      discoveryId,
      rootCauses: aiAnalysis.rootCauses,
      userPainPoints: aiAnalysis.userPainPoints,
      marketValidation,
      competitorInsights: aiAnalysis.competitorInsights,
      keyFindings: aiAnalysis.keyFindings,
      recommendedFocus: aiAnalysis.recommendedFocus,
      confidenceScore: aiAnalysis.confidenceScore,
      analyzedAt: new Date()
    };

    console.log('Analysis complete with confidence score:', analysis.confidenceScore);
    return analysis;
  }

  private generateResearchQueries(discovery: DiscoveryRequest): string[] {
    const queries: string[] = [];

    // Query 1: Market size and trends
    queries.push(
      `${discovery.problemDescription} market size trends statistics 2024`
    );

    // Query 2: User pain points and research
    queries.push(
      `${discovery.affectedUsers} ${discovery.problemDescription} user research pain points`
    );

    // Query 3: Competitor solutions
    queries.push(
      `${discovery.problemDescription} competitor solutions best practices`
    );

    // Query 4: Industry benchmarks
    queries.push(
      `${discovery.problemDescription} industry benchmarks KPIs metrics`
    );

    // Query 5: Validation and case studies
    queries.push(
      `${discovery.problemDescription} case studies success stories ROI`
    );

    return queries;
  }
}
