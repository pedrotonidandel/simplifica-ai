import { AnalysisMode } from '../types/analysis.types';

export interface ModeConfig {
  id: AnalysisMode;
  label: string;
  description: string;
  icon: string;
  premium: boolean;
  color: string;
}

export const MODES: ModeConfig[] = [
  {
    id: 'CHILD',
    label: 'Explique para mim',
    description: 'Como se eu tivesse 12 anos',
    icon: '🧒',
    premium: false,
    color: '#6C63FF',
  },
  {
    id: 'SUMMARY',
    label: 'Resumo rápido',
    description: 'O essencial em 5 frases',
    icon: '⚡',
    premium: false,
    color: '#4CAF50',
  },
  {
    id: 'KEY_POINTS',
    label: 'Pontos importantes',
    description: 'Lista dos pontos-chave',
    icon: '📌',
    premium: false,
    color: '#FF9800',
  },
  {
    id: 'RISKS',
    label: 'Riscos e armadilhas',
    description: 'O que pode te prejudicar',
    icon: '⚠️',
    premium: false,
    color: '#F44336',
  },
  {
    id: 'HIDDEN',
    label: 'O que está escondido?',
    description: 'Segredos que o texto oculta',
    icon: '🔍',
    premium: true,
    color: '#FFD700',
  },
];
