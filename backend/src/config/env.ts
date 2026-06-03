import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  GROQ_API_KEY: z.string().startsWith('gsk_'),
  GROQ_MODEL: z.string().default('llama-3.3-70b-versatile'),
  FREE_DAILY_LIMIT: z.coerce.number().default(5),
  MAX_TEXT_LENGTH: z.coerce.number().default(10000),
  ALLOWED_ORIGIN: z.string().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Variáveis de ambiente inválidas:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
