import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss Z',
    },
  },
});

export const correlationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const correlationId = (req.headers['x-correlation-id'] as string) || uuidv4();

  req.headers['x-correlation-id'] = correlationId;
  res.setHeader('x-correlation-id', correlationId);

  logger.info({
    msg: 'Incoming Request',
    method: req.method,
    url: req.url,
    correlationId,
  });

  next();
};

export default logger;
