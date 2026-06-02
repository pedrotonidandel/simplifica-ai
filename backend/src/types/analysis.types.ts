import { AnalysisMode } from '@prisma/client';

export interface AnalyzeDTO {
  text: string;
  mode: AnalysisMode;
}

export interface AnalysisResult {
  text: string;
  tokensUsed: number;
  processingMs: number;
}
