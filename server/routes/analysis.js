import express from 'express';
import { analyzeDiscovery, generateHMWStatements } from '../services/aiService.js';

const router = express.Router();

// Analyze discovery and perform market research
router.post('/analyze', async (req, res) => {
  try {
    const { discovery } = req.body;

    if (!discovery) {
      return res.status(400).json({ error: 'Discovery data is required' });
    }

    console.log('Analyzing discovery:', discovery.id);
    
    const analysis = await analyzeDiscovery(discovery);
    
    res.json({ 
      success: true,
      analysis 
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze discovery',
      message: error.message 
    });
  }
});

// Generate HMW statements
router.post('/hmw', async (req, res) => {
  try {
    const { discovery, analysis } = req.body;

    if (!discovery || !analysis) {
      return res.status(400).json({ error: 'Discovery and analysis data are required' });
    }

    console.log('Generating HMW statements for discovery:', discovery.id);
    
    const hmwStatements = await generateHMWStatements(discovery, analysis);
    
    res.json({ 
      success: true,
      hmwStatements 
    });
  } catch (error) {
    console.error('HMW generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate HMW statements',
      message: error.message 
    });
  }
});

export default router;
