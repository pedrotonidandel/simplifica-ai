import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import { env } from './config/env';
import { logger } from './utils/logger';
import { connectDatabase, disconnectDatabase } from './config/database';
import router from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

// Segurança
app.use(helmet());
app.use(
  cors({
    origin: env.NODE_ENV === 'production' ? env.ALLOWED_ORIGIN : '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Rate limiting global
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Muitas requisições. Tente novamente em 15 minutos.' },
  })
);

// Rotas
app.use('/api/v1', router);

// Error handler (deve ser último)
app.use(errorMiddleware);

async function bootstrap() {
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    logger.info(`🚀 Servidor rodando na porta ${env.PORT} [${env.NODE_ENV}]`);
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    logger.info(`${signal} recebido. Encerrando servidor...`);
    server.close(async () => {
      await disconnectDatabase();
      logger.info('Servidor encerrado.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error(err, 'Falha ao iniciar o servidor');
  process.exit(1);
});
