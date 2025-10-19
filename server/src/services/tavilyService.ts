import axios from 'axios';
import { ResearchResult } from '../types/index.js';

const TAVILY_API_URL = 'https://api.tavily.com/search';

export class TavilyService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async search(query: string, maxResults: number = 5): Promise<ResearchResult> {
    try {
      const response = await axios.post(
        TAVILY_API_URL,
        {
          api_key: this.apiKey,
          query,
          search_depth: 'advanced',
          include_answer: true,
          include_raw_content: false,
          max_results: maxResults,
          include_domains: [],
          exclude_domains: []
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        query,
        results: response.data.results.map((result: any) => ({
          title: result.title,
          url: result.url,
          content: result.content,
          score: result.score
        }))
      };
    } catch (error) {
      console.error('Tavily search error:', error);
      throw new Error('Failed to perform web research');
    }
  }

  async multiSearch(queries: string[]): Promise<ResearchResult[]> {
    const searchPromises = queries.map(query => this.search(query));
    return Promise.all(searchPromises);
  }
}
