import { AnalysisMode } from '../types/analysis.types';

export interface ModeConfig {
  id: AnalysisMode;
  label: string;
  description: string;
  abbr: string;
  premium: boolean;
  color: string;
}

export const MODES: ModeConfig[] = [
  {
    id: 'CHILD',
    label: 'Explique para mim',
    description: 'Como se eu tivesse 12 anos',
    abbr: 'EP',
    premium: false,
    color: '#6C63FF',
  },
  {
    id: 'SUMMARY',
    label: 'Resumo rápido',
    description: 'O essencial em 5 frases',
    abbr: 'RS',
    premium: false,
    color: '#4CAF50',
  },
  {
    id: 'KEY_POINTS',
    label: 'Pontos principais',
    description: 'Lista dos pontos-chave',
    abbr: 'PI',
    premium: false,
    color: '#FF9800',
  },
  {
    id: 'RISKS',
    label: 'Riscos e armadilhas',
    description: 'O que pode te prejudicar',
    abbr: 'RI',
    premium: false,
    color: '#F44336',
  },
  {
    id: 'HIDDEN',
    label: 'O que está escondido?',
    description: 'Segredos que o texto oculta',
    abbr: 'SE',
    premium: true,
    color: '#C9A227',
  },
];
