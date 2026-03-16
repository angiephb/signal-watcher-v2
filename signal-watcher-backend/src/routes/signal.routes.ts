import { Router } from 'express';
import { SignalController } from '../controllers/signal.controller';

const router = Router();

router.get('/', SignalController.getAll);
router.post('/', SignalController.create);

export default router;
