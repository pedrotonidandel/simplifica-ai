import { SubscriptionRepository } from '../repositories/subscription.repository';
import { AppError } from '../utils/errors';

export class SubscriptionService {
  constructor(private subRepo: SubscriptionRepository) {}

  async getByUserId(userId: string) {
    const sub = await this.subRepo.findByUserId(userId);
    if (!sub) throw new AppError('Assinatura não encontrada.', 404);
    return sub;
  }

  async activatePremium(userId: string, provider: string, providerId: string, expiresAt: Date) {
    return this.subRepo.upsert({
      userId,
      plan: 'PREMIUM',
      status: 'ACTIVE',
      provider,
      providerId,
      expiresAt,
    });
  }

  async cancelPremium(userId: string) {
    return this.subRepo.upsert({
      userId,
      plan: 'FREE',
      status: 'CANCELLED',
    });
  }

  // Webhook do Google Play / Apple — valida a compra server-side
  async handleWebhook(provider: string, payload: Record<string, unknown>) {
    // TODO: validar assinatura do webhook e processar evento
    console.log(`[Webhook] Provider: ${provider}`, payload);
  }
}
