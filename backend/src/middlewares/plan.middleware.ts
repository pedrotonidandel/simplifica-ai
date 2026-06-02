import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { AppError } from '../utils/errors';

export function requirePremium(req: Request, _res: Response, next: NextFunction): void {
  prisma.subscription
    .findUnique({ where: { userId: req.userId } })
    .then((sub) => {
      if (sub?.plan !== 'PREMIUM' || sub?.status !== 'ACTIVE') {
        throw new AppError('Essa funcionalidade requer o plano Premium.', 403);
      }
      next();
    })
    .catch(next);
}
