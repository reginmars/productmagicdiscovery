import OpenAI from 'openai';
import { AIAnalysisResult, DiscoveryRequest, ResearchResult } from '../types/index.js';

export class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async analyzeDiscovery(
    discovery: DiscoveryRequest,
    researchResults: ResearchResult[]
  ): Promise<AIAnalysisResult> {
    const researchContext = this.formatResearchContext(researchResults);

    const prompt = `You are an expert product manager and market researcher. Analyze the following problem discovery and validate it with real market research data.

PROBLEM DISCOVERY:
- Problem Description: ${discovery.problemDescription}
- Affected Users: ${discovery.affectedUsers}
- Evidence: ${discovery.evidence}
- Business Impact: ${discovery.businessImpact}
- Success Criteria: ${discovery.successCriteria}

MARKET RESEARCH DATA:
${researchContext}

Based on the discovery responses and market research, provide a comprehensive analysis in the following JSON format:

{
  "rootCauses": ["array of 3-5 root causes identified from the problem"],
  "userPainPoints": ["array of 3-5 specific user pain points"],
  "competitorInsights": ["array of 3-5 insights about how competitors handle this"],
  "keyFindings": ["array of 4-6 key findings that validate or invalidate the problem"],
  "recommendedFocus": "a single paragraph recommendation on what to focus on",
  "confidenceScore": number between 0-100 based on validation strength
}

Be specific, data-driven, and reference the research findings. The confidence score should reflect how well the market data validates the stated problem.`;

    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert product manager and market researcher who provides data-driven analysis in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 2000
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      return JSON.parse(content) as AIAnalysisResult;
    } catch (error) {
      console.error('OpenAI analysis error:', error);
      throw new Error('Failed to analyze discovery with AI');
    }
  }

  async extractMarketValidation(researchResults: ResearchResult[]): Promise<{
    marketSize: string;
    growthTrend: string;
    competitorSolutions: string[];
    industryBenchmarks: string[];
    userDemand: string;
    validationSources: string[];
  }> {
    const researchContext = this.formatResearchContext(researchResults);

    const prompt = `Based on the following market research data, extract key market validation metrics:

${researchContext}

Provide the information in the following JSON format:

{
  "marketSize": "brief description of market size with numbers if available",
  "growthTrend": "growth trend description with percentages if available",
  "competitorSolutions": ["array of 3-5 competitor solutions mentioned"],
  "industryBenchmarks": ["array of 3-5 relevant industry benchmarks or statistics"],
  "userDemand": "description of user demand with supporting data",
  "validationSources": ["array of source names/publications mentioned"]
}

Be specific and include numbers/percentages where available from the research.`;

    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a market research analyst who extracts structured data from research findings in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.5,
        max_tokens: 1500
      });

      const content = response.choices[0].message.content;
      if (!content) {
        throw new Error('No response from OpenAI');
      }

      return JSON.parse(content);
    } catch (error) {
      console.error('OpenAI market validation error:', error);
      throw new Error('Failed to extract market validation');
    }
  }

  private formatResearchContext(researchResults: ResearchResult[]): string {
    return researchResults
      .map((result, index) => {
        const topResults = result.results.slice(0, 3);
        return `
SEARCH QUERY ${index + 1}: "${result.query}"

${topResults.map((r, i) => `
Result ${i + 1}:
Title: ${r.title}
Source: ${r.url}
Content: ${r.content.substring(0, 500)}...
`).join('\n')}
`;
      })
      .join('\n---\n');
  }
}
