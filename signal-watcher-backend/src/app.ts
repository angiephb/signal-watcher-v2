import express from 'express';
import cors from 'cors';
import { correlationMiddleware } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import signalRoutes from './routes/signal.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(correlationMiddleware);

app.use('/api/signals', signalRoutes);
app.get('/health', (req, res) => {
  res.json({ status: 'ok', correlationId: req.headers['x-correlation-id'] });
});

app.use(errorHandler);

export default app;
