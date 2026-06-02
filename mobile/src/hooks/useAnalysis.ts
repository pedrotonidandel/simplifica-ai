import { useMutation, useQueryClient } from '@tanstack/react-query';
import { analysisService } from '../services/analysis.service';
import { useAuthStore } from '../store/auth.store';
import { AnalysisMode } from '../types/analysis.types';

export function useAnalysis() {
  const setDailyRemaining = useAuthStore((s) => s.setDailyRemaining);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ text, mode }: { text: string; mode: AnalysisMode }) =>
      analysisService.analyze(text, mode),
    onSuccess: (data) => {
      setDailyRemaining(Math.max(0, data.remaining));
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
}
