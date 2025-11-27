import express from 'express'
import {forgotPasswordController, otpVerifyController, resetPasswordController} from '../controllers/forgotPasswordController.js';
const router = express.Router();


router.post('/forget-password', forgotPasswordController)
router.post('/verify-otp', otpVerifyController)
router.post('/reset-password', resetPasswordController)


export default router;