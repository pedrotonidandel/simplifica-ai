export type AnalysisMode = 'CHILD' | 'SUMMARY' | 'KEY_POINTS' | 'RISKS' | 'HIDDEN';

export interface Analysis {
  id: string;
  originalText: string;
  resultText: string;
  mode: AnalysisMode;
  characterCount: number;
  tokensUsed: number;
  processingMs: number;
  createdAt: string;
}

export interface AnalyzeResponse {
  analysis: Analysis;
  remaining: number;
}

export interface HistoryResponse {
  items: Analysis[];
  total: number;
}
