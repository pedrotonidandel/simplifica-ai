import { api } from './api';
import { AnalyzeResponse, Analysis, AnalysisMode, HistoryResponse } from '../types/analysis.types';

export const analysisService = {
  analyze: async (text: string, mode: AnalysisMode): Promise<AnalyzeResponse> => {
    const { data } = await api.post<AnalyzeResponse>('/analyses', { text, mode });
    return data;
  },

  getHistory: async (page = 1, limit = 20): Promise<HistoryResponse> => {
    const { data } = await api.get<HistoryResponse>('/analyses', {
      params: { page, limit },
    });
    return data;
  },

  getById: async (id: string): Promise<Analysis> => {
    const { data } = await api.get<Analysis>(`/analyses/${id}`);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/analyses/${id}`);
  },
};
