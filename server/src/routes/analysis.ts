import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { AnalysisService } from '../services/analysisService.js';

const router = Router();

const discoverySchema = z.object({
  discoveryId: z.string(),
  problemDescription: z.string().min(10),
  affectedUsers: z.string().min(5),
  evidence: z.string().min(10),
  businessImpact: z.string().min(10),
  successCriteria: z.string().min(10)
});

export function createAnalysisRouter(analysisService: AnalysisService) {
  router.post('/analyze', async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = discoverySchema.parse(req.body);

      // Perform analysis
      const analysis = await analysisService.analyzeDiscovery(
        validatedData.discoveryId,
        {
          problemDescription: validatedData.problemDescription,
          affectedUsers: validatedData.affectedUsers,
          evidence: validatedData.evidence,
          businessImpact: validatedData.businessImpact,
          successCriteria: validatedData.successCriteria
        }
      );

      res.json({
        success: true,
        data: analysis
      });
    } catch (error) {
      console.error('Analysis error:', error);

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Invalid request data',
          details: error.errors
        });
      }

      res.status(500).json({
        success: false,
        error: 'Failed to analyze discovery',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  return router;
}
