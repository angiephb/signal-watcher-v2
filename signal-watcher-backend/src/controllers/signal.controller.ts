import { Request, Response, NextFunction } from 'express';
import { SignalService } from '../services/signal.service';
import { AppError } from '../middlewares/error.middleware';

export class SignalController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const signals = await SignalService.getAll();
      res.json(signals);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { originalText } = req.body;
      const correlationId = (req.headers['x-correlation-id'] as string) || `REQ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      if (!originalText) {
        throw new AppError(400, 'originalText is required');
      }

      const newSignal = await SignalService.create({
        originalText,
        correlationId,
      });


      res.status(201).json(newSignal);
    } catch (error) {
      next(error);
    }
  }
}
