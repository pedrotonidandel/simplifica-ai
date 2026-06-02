import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { SubscriptionService } from '../services/subscription.service';

const webhookSchema = z.object({
  provider: z.enum(['google_play', 'apple']),
  payload: z.record(z.unknown()),
});

export class SubscriptionController {
  constructor(private subService: SubscriptionService) {}

  getMySubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sub = await this.subService.getByUserId(req.userId);
      res.json(sub);
    } catch (e) {
      next(e);
    }
  };

  webhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { provider, payload } = webhookSchema.parse(req.body);
      await this.subService.handleWebhook(provider, payload);
      res.json({ received: true });
    } catch (e) {
      next(e);
    }
  };
}
