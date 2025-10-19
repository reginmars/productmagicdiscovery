const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface AnalysisResponse {
  success: boolean;
  analysis: any;
}

export interface HMWResponse {
  success: boolean;
  hmwStatements: any[];
}

export async function analyzeDiscovery(discovery: any): Promise<AnalysisResponse> {
  try {
    const response = await fetch(`${API_URL}/api/analysis/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ discovery }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to analyze discovery');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function generateHMWStatements(discovery: any, analysis: any): Promise<HMWResponse> {
  try {
    const response = await fetch(`${API_URL}/api/analysis/hmw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ discovery, analysis }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate HMW statements');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
