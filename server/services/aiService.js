import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const ANALYSIS_PROMPT = `You are an expert product management consultant specializing in problem discovery and market validation. 

Analyze the following problem discovery responses and provide comprehensive insights:

Problem Description: {problemDescription}
Affected Users: {affectedUsers}
Evidence: {evidence}
Business Impact: {businessImpact}
Success Criteria: {successCriteria}

Perform the following analysis:

1. ROOT CAUSES: Identify 4-6 underlying root causes of this problem. Go beyond surface symptoms.

2. USER PAIN POINTS: List 4-6 specific pain points users experience due to this problem.

3. MARKET VALIDATION: Research and provide:
   - Market size and opportunity
   - Growth trends in this space
   - 4-5 competitor solutions addressing similar problems
   - 4-5 industry benchmarks and statistics
   - User demand indicators
   - 3-4 validation sources (research reports, studies, etc.)

4. COMPETITOR INSIGHTS: Provide 4 specific insights about how competitors have addressed this problem and their results.

5. KEY FINDINGS: Summarize 5 critical findings that validate or invalidate this problem.

6. RECOMMENDED FOCUS: Provide a clear recommendation on where to focus efforts.

7. CONFIDENCE SCORE: Rate confidence in this problem's validity (0-100) based on evidence and market data.

Return your response as a valid JSON object with this exact structure:
{
  "rootCauses": ["cause1", "cause2", ...],
  "userPainPoints": ["pain1", "pain2", ...],
  "marketValidation": {
    "marketSize": "string",
    "growthTrend": "string",
    "competitorSolutions": ["solution1", "solution2", ...],
    "industryBenchmarks": ["benchmark1", "benchmark2", ...],
    "userDemand": "string",
    "validationSources": ["source1", "source2", ...]
  },
  "competitorInsights": ["insight1", "insight2", ...],
  "keyFindings": ["finding1", "finding2", ...],
  "recommendedFocus": "string",
  "confidenceScore": number
}`;

const HMW_PROMPT = `You are an expert product strategist specializing in "How Might We" (HMW) statement generation.

Based on the following problem analysis, generate 2-3 high-quality HMW statements:

Problem Description: {problemDescription}
Root Causes: {rootCauses}
User Pain Points: {userPainPoints}
Key Findings: {keyFindings}
Recommended Focus: {recommendedFocus}

For each HMW statement:
1. Frame it as an opportunity (starting with "How might we...")
2. Be specific and actionable
3. Focus on user value
4. Avoid prescribing solutions

For each HMW statement, provide:
- The HMW statement itself
- Rationale (why this is important)
- Target outcome (what success looks like)
- 3-4 potential solution directions (not full solutions)
- Priority (high/medium/low)
- Feasibility score (1-10)
- Impact score (1-10)

Return your response as a valid JSON array with this structure:
[
  {
    "statement": "How might we...",
    "rationale": "string",
    "targetOutcome": "string",
    "potentialSolutions": ["solution1", "solution2", ...],
    "priority": "high|medium|low",
    "feasibility": number,
    "impact": number
  }
]`;

export async function analyzeDiscovery(discovery) {
  try {
    const prompt = ANALYSIS_PROMPT
      .replace('{problemDescription}', discovery.problemDescription)
      .replace('{affectedUsers}', discovery.affectedUsers)
      .replace('{evidence}', discovery.evidence)
      .replace('{businessImpact}', discovery.businessImpact)
      .replace('{successCriteria}', discovery.successCriteria);

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content[0].text;
    
    // Extract JSON from response (handle markdown code blocks)
    let jsonText = responseText;
    if (responseText.includes('```json')) {
      jsonText = responseText.split('```json')[1].split('```')[0].trim();
    } else if (responseText.includes('```')) {
      jsonText = responseText.split('```')[1].split('```')[0].trim();
    }

    const analysisData = JSON.parse(jsonText);

    return {
      id: `analysis-${Date.now()}`,
      discoveryId: discovery.id,
      ...analysisData,
      analyzedAt: new Date()
    };
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error(`Failed to analyze discovery: ${error.message}`);
  }
}

export async function generateHMWStatements(discovery, analysis) {
  try {
    const prompt = HMW_PROMPT
      .replace('{problemDescription}', discovery.problemDescription)
      .replace('{rootCauses}', JSON.stringify(analysis.rootCauses))
      .replace('{userPainPoints}', JSON.stringify(analysis.userPainPoints))
      .replace('{keyFindings}', JSON.stringify(analysis.keyFindings))
      .replace('{recommendedFocus}', analysis.recommendedFocus);

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 3072,
      temperature: 0.8,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const responseText = message.content[0].text;
    
    // Extract JSON from response
    let jsonText = responseText;
    if (responseText.includes('```json')) {
      jsonText = responseText.split('```json')[1].split('```')[0].trim();
    } else if (responseText.includes('```')) {
      jsonText = responseText.split('```')[1].split('```')[0].trim();
    }

    const hmwData = JSON.parse(jsonText);

    return hmwData.map((hmw, index) => ({
      id: `hmw-${Date.now()}-${index}`,
      ...hmw,
      selected: false
    }));
  } catch (error) {
    console.error('HMW Generation Error:', error);
    throw new Error(`Failed to generate HMW statements: ${error.message}`);
  }
}
