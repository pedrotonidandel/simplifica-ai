import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { analysisService } from '../services/analysis.service';

export function useHistory(page = 1) {
  return useQuery({
    queryKey: ['history', page],
    queryFn: () => analysisService.getHistory(page),
    staleTime: 1000 * 60 * 2,
  });
}

export function useDeleteAnalysis() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => analysisService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
}
