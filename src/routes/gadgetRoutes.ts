import express from 'express';
import * as gadgetController from '../controllers/gadgetController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Add middleware to all gadget routes
router.use(authenticate);

router.get('/gadgets', gadgetController.getGadgets);
router.post('/gadgets', gadgetController.createGadget);
router.patch('/gadgets/:id', gadgetController.updateGadget);
router.delete('/gadgets/:id', gadgetController.deleteGadget);
router.post('/gadgets/:id/self-destruct', gadgetController.selfDestruct);

export default router;