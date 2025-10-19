import { ProblemDiscovery, ProblemAnalysis } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class ApiService {
  static async analyzeDiscovery(discovery: ProblemDiscovery): Promise<ProblemAnalysis> {
    const response = await fetch(`${API_BASE_URL}/analysis/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        discoveryId: discovery.id,
        problemDescription: discovery.problemDescription,
        affectedUsers: discovery.affectedUsers,
        evidence: discovery.evidence,
        businessImpact: discovery.businessImpact,
        successCriteria: discovery.successCriteria,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to analyze discovery');
    }

    const result = await response.json();
    return result.data;
  }

  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}
