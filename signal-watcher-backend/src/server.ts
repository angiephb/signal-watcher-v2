process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import 'dotenv/config';
import app from './app';
import logger from './middlewares/logger.middleware';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`🚀 Server ready at: http://localhost:${PORT}`);
});
