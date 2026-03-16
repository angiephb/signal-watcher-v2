import express, { type Request, type Response, type NextFunction } from 'express';

export class AppError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    correlationId: req.headers['x-correlation-id'],
  });
};
