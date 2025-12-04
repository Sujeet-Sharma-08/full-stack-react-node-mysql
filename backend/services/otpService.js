import connection from "../config/db.js";
import {otpModel } from "../models/otpModel.js";
import {queries} from '../models/userModel.js'
import bcrypt from "bcryptjs";

export const forgotPasswordService = async ({ email }) => {
    if (!email) {
        throw new Error("Email is required!");
    }

    const [rows] = await connection.execute(queries.findByEmail, [email]);

    if (rows.length === 0) {
        throw new Error("User with this email does not exist!");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await connection.execute(otpModel.generateOtp, [otp, email]);

    return otp;
}


export const otpVerifyService = async ({  resetEmail , otp }) => {

    const [rows] = await connection.execute(otpModel.findOtp, [resetEmail, otp]);
    // Check if OTP exists in DB
    if (rows.length === 0) {
        throw new Error("OTP not found or invalid!");
    }

    const otpData = rows[0];
    
    // OTP match check
    if (otpData.otp !== otp) {
        throw new Error("Provided OTP doesn't match!");
    }

    const currentTime = new Date();
    const createdAt = new Date(otpData.created_at);  // Convert string → Date object

    // Time difference in minutes
    const timeDifference =
        (currentTime.getTime() - createdAt.getTime()) / (1000 * 60);

    if (timeDifference > 2){
        throw new Error("OTP has expired");
    }

    return true;
};


export const resetPasswordService = async ({ resetEmail, resetOtp, newPassword }) => {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const [updateResult] = await connection.execute(
            'UPDATE users SET password = ? WHERE email = ?',
            [hashedPassword, resetEmail]
        );

        if (updateResult.affectedRows === 0) {
            throw new Error("Failed to update password. User not found.");
        }

        // Delete used OTP
        await connection.execute(otpModel.deleteOtp, [resetEmail, resetOtp]);
        console.log("hello from reset password service", )

        return true;

    } catch (error) {
        throw new Error(`Password reset failed: ${error.message}`);
    }
};