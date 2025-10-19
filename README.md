# Product Discovery Platform

Enterprise-grade platform for systematic problem discovery and opportunity management.

## Features

- **AI-Powered Analysis**: Claude AI analyzes problems and validates with market research
- **Problem Discovery**: Structured 5-question framework
- **Market Validation**: Automated research and competitor analysis
- **HMW Generation**: AI-generated "How Might We" opportunity statements
- **Practice Guides**: SCS PM SIG educational resources

## Setup

### Prerequisites

- Node.js 18+
- Anthropic API key (Claude AI)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3001
ANTHROPIC_API_KEY=your_claude_api_key_here
PORT=3001
```

Get your Anthropic API key from: https://console.anthropic.com/

### Running the Application

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

The frontend runs on `http://localhost:5173`
The backend API runs on `http://localhost:3001`

## API Endpoints

### POST /api/analysis/analyze
Analyzes problem discovery and performs market research.

**Request:**
```json
{
  "discovery": {
    "id": "string",
    "problemDescription": "string",
    "affectedUsers": "string",
    "evidence": "string",
    "businessImpact": "string",
    "successCriteria": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "rootCauses": ["..."],
    "userPainPoints": ["..."],
    "marketValidation": {...},
    "competitorInsights": ["..."],
    "keyFindings": ["..."],
    "recommendedFocus": "...",
    "confidenceScore": 87
  }
}
```

### POST /api/analysis/hmw
Generates "How Might We" opportunity statements.

**Request:**
```json
{
  "discovery": {...},
  "analysis": {...}
}
```

**Response:**
```json
{
  "success": true,
  "hmwStatements": [
    {
      "statement": "How might we...",
      "rationale": "...",
      "targetOutcome": "...",
      "potentialSolutions": ["..."],
      "priority": "high",
      "feasibility": 8,
      "impact": 9
    }
  ]
}
```

## Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **AI**: Anthropic Claude 3.5 Sonnet
- **State**: Zustand
- **Styling**: Tailwind CSS + Glassmorphism

## Rate Limiting

API endpoints are rate-limited to 10 requests per 15 minutes per IP address.

## Development

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```
