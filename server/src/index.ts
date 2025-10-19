import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createAnalysisRouter } from './routes/analysis.js';
import { AnalysisService } from './services/analysisService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Validate environment variables
const TAVILY_API_KEY = process.env.TAVILY_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!TAVILY_API_KEY || !OPENAI_API_KEY) {
  console.error('ERROR: Missing required API keys in environment variables');
  console.error('Please set TAVILY_API_KEY and OPENAI_API_KEY in .env file');
  process.exit(1);
}

// Initialize services
const analysisService = new AnalysisService(TAVILY_API_KEY, OPENAI_API_KEY);

// Routes
app.use('/api/analysis', createAnalysisRouter(analysisService));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      tavily: !!TAVILY_API_KEY,
      openai: !!OPENAI_API_KEY
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Analysis API: http://localhost:${PORT}/api/analysis`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});
