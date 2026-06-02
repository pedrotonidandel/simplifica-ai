import { PrismaClient } from '@prisma/client';

export class UsageRepository {
  constructor(private prisma: PrismaClient) {}

  async getTodayCount(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const log = await this.prisma.usageLog.findUnique({
      where: { userId_date: { userId, date: today } },
    });
    return log?.count ?? 0;
  }

  async increment(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const log = await this.prisma.usageLog.upsert({
      where: { userId_date: { userId, date: today } },
      create: { userId, date: today, count: 1 },
      update: { count: { increment: 1 } },
    });
    return log.count;
  }
}
