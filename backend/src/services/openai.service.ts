import { AnalysisMode } from '@prisma/client';
import { groq } from '../config/anthropic';
import { env } from '../config/env';
import { PROMPTS } from '../utils/prompts';
import { AnalysisResult } from '../types/analysis.types';

export class OpenAIService {
  async analyze(mode: AnalysisMode, inputText: string): Promise<AnalysisResult> {
    const start = Date.now();

    const response = await groq.chat.completions.create({
      model: env.GROQ_MODEL,
      messages: [
        { role: 'system', content: PROMPTS[mode] },
        { role: 'user', content: inputText },
      ],
      max_tokens: 1500,
      temperature: 0.3,
    });

    const processingMs = Date.now() - start;
    const text = response.choices[0]?.message?.content ?? '';
    const tokensUsed = response.usage?.total_tokens ?? 0;

    return { text, tokensUsed, processingMs };
  }
}
