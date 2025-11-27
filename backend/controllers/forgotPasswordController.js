import { forgotPasswordService, otpVerifyService, resetPasswordService } from "../services/otpService.js";
import {sendEmail} from "../utils/sendEmail.js";


export const forgotPasswordController = async (req, res) => {
    try {
        const otp = await forgotPasswordService(req.body);

        const subject = "OTP for Password Reset";
        const message = `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`;

        await sendEmail(req.body.email, subject, message);

        return res.status(200).json({
            message: "OTP sent to your email successfully",
            data: otp
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to send OTP",
            error: error.message
        })
    }
}


export const otpVerifyController= async(req,res)=>{
    try {
        const validOtp = await otpVerifyService(req.body)
        return res.status(200).json({
            success: true,
            message:"otp verified successfully!",
        })     
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        }) 
    }
}


export const resetPasswordController = async(req,res)=>{
    try {
        const result = await resetPasswordService(req.body);
        res.status(200).json({
            success:true,
            message:"password updated successfully!",
            data : result
        }) 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal server error!",
            error: error.message 
        })
    }
}