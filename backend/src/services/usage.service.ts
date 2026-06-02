import { env } from '../config/env';
import { UsageRepository } from '../repositories/usage.repository';
import { SubscriptionRepository } from '../repositories/subscription.repository';

export class UsageService {
  constructor(
    private usageRepo: UsageRepository,
    private subRepo: SubscriptionRepository
  ) {}

  async canAnalyze(userId: string): Promise<{ allowed: boolean; remaining: number }> {
    const sub = await this.subRepo.findByUserId(userId);
    const isPremium = sub?.plan === 'PREMIUM' && sub?.status === 'ACTIVE';

    if (isPremium) {
      return { allowed: true, remaining: 9999 };
    }

    const count = await this.usageRepo.getTodayCount(userId);
    const remaining = env.FREE_DAILY_LIMIT - count;
    return { allowed: remaining > 0, remaining: Math.max(0, remaining) };
  }

  async recordUsage(userId: string): Promise<void> {
    await this.usageRepo.increment(userId);
  }
}
