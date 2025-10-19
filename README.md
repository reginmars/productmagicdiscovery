# Product Discovery Platform

Enterprise-grade platform for systematic problem discovery and validation using AI-powered market research.

## Features

- **Problem Discovery**: Structured 5-question framework to identify real problems
- **AI-Powered Analysis**: Real-time web crawling and market research using GPT-4 and Tavily AI
- **Market Validation**: Automated gathering of market data, competitor insights, and industry benchmarks
- **Evidence-Based Insights**: Data-driven recommendations with confidence scoring

## Setup

### Frontend

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Start development server:
```bash
npm run dev
```

### Backend

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your API keys:
```bash
cp .env.example .env
```

Required API keys:
- `OPENAI_API_KEY`: Get from https://platform.openai.com/api-keys
- `TAVILY_API_KEY`: Get from https://tavily.com

4. Start backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

## API Endpoints

- `POST /api/analysis/analyze` - Analyze a problem discovery
- `GET /api/analysis/health` - Health check
- `GET /api/health` - Server health check

## Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Zustand

**Backend:**
- Node.js + Express
- TypeScript
- OpenAI GPT-4
- Tavily AI (Web Research)
- Zod (Validation)

## Development

Run both frontend and backend concurrently:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd server && npm run dev
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
```

### Backend (server/.env)
```
OPENAI_API_KEY=your_openai_api_key
TAVILY_API_KEY=your_tavily_api_key
PORT=3001
NODE_ENV=development
```
