import { AnalysisMode } from '@prisma/client';
import { OpenAIService } from './openai.service';
import { UsageService } from './usage.service';
import { AnalysisRepository } from '../repositories/analysis.repository';
import { env } from '../config/env';
import { AppError } from '../utils/errors';

export class AnalysisService {
  constructor(
    private openaiService: OpenAIService,
    private usageService: UsageService,
    private analysisRepo: AnalysisRepository
  ) {}

  async analyze(userId: string, text: string, mode: AnalysisMode) {
    if (text.length > env.MAX_TEXT_LENGTH) {
      throw new AppError(
        `Texto muito longo. Máximo ${env.MAX_TEXT_LENGTH} caracteres.`,
        400
      );
    }

    const { allowed, remaining } = await this.usageService.canAnalyze(userId);
    if (!allowed) {
      throw new AppError(
        'Limite diário atingido. Faça upgrade para o plano Premium.',
        429
      );
    }

    const result = await this.openaiService.analyze(mode, text);
    await this.usageService.recordUsage(userId);

    const analysis = await this.analysisRepo.create({
      userId,
      originalText: text,
      resultText: result.text,
      mode,
      characterCount: text.length,
      tokensUsed: result.tokensUsed,
      processingMs: result.processingMs,
    });

    return { analysis, remaining: remaining - 1 };
  }

  async getHistory(userId: string, page = 1, limit = 20) {
    return this.analysisRepo.findByUser(userId, page, limit);
  }

  async getById(id: string, userId: string) {
    const analysis = await this.analysisRepo.findById(id, userId);
    if (!analysis) throw new AppError('Análise não encontrada.', 404);
    return analysis;
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.analysisRepo.delete(id, userId);
  }
}
