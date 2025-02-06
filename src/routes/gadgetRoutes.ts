import express from 'express';
import * as gadgetController from '../controllers/gadgetController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/gadgets', authenticate, gadgetController.getGadgets);
router.post('/gadgets', authenticate, gadgetController.createGadget);
router.patch('/gadgets/:id', authenticate, gadgetController.updateGadget);
router.delete('/gadgets/:id', authenticate, gadgetController.deleteGadget);
router.post('/gadgets/:id/self-destruct', authenticate, gadgetController.selfDestruct);

export default router;