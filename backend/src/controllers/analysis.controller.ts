import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AnalysisMode } from '@prisma/client';
import { AnalysisService } from '../services/analysis.service';

const analyzeSchema = z.object({
  text: z.string().min(10, 'Texto muito curto.').max(10000, 'Texto muito longo.'),
  mode: z.nativeEnum(AnalysisMode),
});

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export class AnalysisController {
  constructor(private analysisService: AnalysisService) {}

  analyze = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { text, mode } = analyzeSchema.parse(req.body);
      const result = await this.analysisService.analyze(req.userId, text, mode);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, limit } = paginationSchema.parse(req.query);
      const result = await this.analysisService.getHistory(req.userId, page, limit);
      res.json(result);
    } catch (e) {
      next(e);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const analysis = await this.analysisService.getById(req.params.id as string, req.userId);
      res.json(analysis);
    } catch (e) {
      next(e);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.analysisService.delete(req.params.id as string, req.userId);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
}
