import express from 'express';
import { createIdeaController, getAllIdeaController } from '../controllers/ideaController.js';
const router = express.Router();

router.post('/create-idea', createIdeaController);
router.get('/get-idea', getAllIdeaController);


export default router;
