import { AnalysisMode } from '@prisma/client';
import { openai } from '../config/openai';
import { env } from '../config/env';
import { buildPrompt } from '../utils/prompts';
import { AnalysisResult } from '../types/analysis.types';

export class OpenAIService {
  async analyze(mode: AnalysisMode, inputText: string): Promise<AnalysisResult> {
    const start = Date.now();
    const prompt = buildPrompt(mode, inputText);

    const response = await openai.chat.completions.create({
      model: env.OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1500,
      temperature: 0.3,
    });

    const processingMs = Date.now() - start;
    const text = response.choices[0]?.message?.content ?? '';
    const tokensUsed = response.usage?.total_tokens ?? 0;

    return { text, tokensUsed, processingMs };
  }
}
