import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import Groq from 'groq-sdk';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Erros da aplicação (AppError)
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  // Erros de validação (Zod)
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Dados inválidos.',
      details: err.flatten().fieldErrors,
    });
    return;
  }

  // Erros JWT
  if (err instanceof TokenExpiredError) {
    res.status(401).json({ error: 'Token expirado. Faça login novamente.' });
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(401).json({ error: 'Token inválido.' });
    return;
  }

  // Erros da API Groq
  if (err instanceof Groq.AuthenticationError) {
    logger.error('Chave da API Groq inválida — verifique o .env (GROQ_API_KEY)');
    res.status(500).json({
      error: 'Serviço de IA indisponível. Verifique a chave da API.',
    });
    return;
  }

  if (err instanceof Groq.RateLimitError) {
    res.status(429).json({
      error: 'Muitas requisições à IA. Tente novamente em alguns segundos.',
    });
    return;
  }

  if (err instanceof Groq.APIError) {
    logger.error({ status: err.status, message: err.message }, 'Erro na API Groq');
    res.status(502).json({
      error: 'Erro ao processar com IA. Tente novamente.',
    });
    return;
  }

  // Erro genérico (log completo)
  logger.error({ err, method: req.method, path: req.path }, 'Erro não tratado');
  res.status(500).json({ error: 'Erro interno do servidor.' });
}
