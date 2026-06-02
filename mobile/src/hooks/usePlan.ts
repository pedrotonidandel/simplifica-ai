import { useAuthStore } from '../store/auth.store';
import { MODES } from '../constants/modes';
import { AnalysisMode } from '../types/analysis.types';

export function usePlan() {
  const { plan, dailyRemaining } = useAuthStore();
  const isPremium = plan === 'PREMIUM';

  const canUseMode = (mode: AnalysisMode): boolean => {
    const config = MODES.find((m) => m.id === mode);
    if (!config) return false;
    if (config.premium && !isPremium) return false;
    return true;
  };

  const canAnalyze = isPremium || dailyRemaining > 0;

  return { isPremium, dailyRemaining, canUseMode, canAnalyze };
}
