import express from "express";

import {updateProfileController} from '../controllers/profileController.js'
import {verifyToken} from '../middleware/authMiddleware.js'

const router = express.Router();

router.put('/update-profile', verifyToken, updateProfileController);

export default router;