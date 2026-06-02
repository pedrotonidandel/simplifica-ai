import { Analysis, AnalysisMode, PrismaClient } from '@prisma/client';

export class AnalysisRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: {
    userId: string;
    originalText: string;
    resultText: string;
    mode: AnalysisMode;
    characterCount: number;
    tokensUsed: number;
    processingMs: number;
  }): Promise<Analysis> {
    return this.prisma.analysis.create({ data });
  }

  async findByUser(
    userId: string,
    page: number,
    limit: number
  ): Promise<{ items: Analysis[]; total: number }> {
    const skip = (page - 1) * limit;
    const [items, total] = await this.prisma.$transaction([
      this.prisma.analysis.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.analysis.count({ where: { userId } }),
    ]);
    return { items, total };
  }

  async findById(id: string, userId: string): Promise<Analysis | null> {
    return this.prisma.analysis.findFirst({ where: { id, userId } });
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.prisma.analysis.deleteMany({ where: { id, userId } });
  }
}
