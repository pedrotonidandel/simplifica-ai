import { Plan, PrismaClient, Subscription, SubscriptionStatus } from '@prisma/client';

export class SubscriptionRepository {
  constructor(private prisma: PrismaClient) {}

  async findByUserId(userId: string): Promise<Subscription | null> {
    return this.prisma.subscription.findUnique({ where: { userId } });
  }

  async upsert(data: {
    userId: string;
    plan: Plan;
    status: SubscriptionStatus;
    provider?: string;
    providerId?: string;
    expiresAt?: Date;
  }): Promise<Subscription> {
    return this.prisma.subscription.upsert({
      where: { userId: data.userId },
      create: data,
      update: data,
    });
  }
}
