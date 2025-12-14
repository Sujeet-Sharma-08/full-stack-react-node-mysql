import express from 'express';
import { createIdeaController, getAllIdeaController, deleteIdeaController } from '../controllers/ideaController.js';
const router = express.Router();

router.post('/create-idea', createIdeaController);
router.get('/get-idea', getAllIdeaController);
router.delete('/delete-idea/:id', deleteIdeaController)


export default router;
