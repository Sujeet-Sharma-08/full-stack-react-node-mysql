import express, { Router } from 'express'
import { refreshAccessToken } from '../controllers/userController.js';

const router = express.Router();

router.post('/refresh', refreshAccessToken);


export default router;