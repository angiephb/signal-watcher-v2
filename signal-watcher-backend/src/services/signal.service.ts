import prisma from '../config/database';
import { AIService } from './ai.service';

export class SignalService {
  static async getAll() {
    return await prisma.signal.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  static async create(data: { originalText: string; correlationId: string }) {

    const aiAnalysis = await AIService.analyzeSignal(data.originalText);

    return await prisma.signal.create({
      data: {
        originalText: data.originalText,
        correlationId: data.correlationId,
        severity: aiAnalysis.severity,
        aiSummary: aiAnalysis.aiSummary,
        suggestedAction: aiAnalysis.suggestedAction,
      },
    });
  }

  static async getById(id: string) {
    return await prisma.signal.findUnique({
      where: { id },
    });
  }
}
