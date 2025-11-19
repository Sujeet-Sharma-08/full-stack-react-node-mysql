import { handleForgotPasswordService } from "../services/otpService";
import sendEmail from "../utils/sendEmail.js";


export const handleForgotPasswordController = async (req, res) => {

    try {

        const otp = await handleForgotPasswordService(req.body);

        const subject = "OTP for Password Reset";
        const message = `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`;

        sendEmail(req.body.email, subject, message);

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