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



export const otpVerifyService = async ({ email, otp }) => {

    const [otpFromDB] = await connection.execute(otpModel.findOtp,[email,otp]);

    if (!otpFromDB || otpFromDB.length === 0) {
        throw new Error("No otp in DB");
    }

    const currentTime = new Date();

    const createdAt = otpFromDB.created_at;

    const timeDifference = (currentTime - createdAt) / (1000 * 60); // Convert to minutes
    
    if (timeDifference > 10) {
        throw new Error("OTP has expired");
    }

   return true;
};


export const resetPasswordService = async ({ email, otp, newPassword }) => {

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const [updateResult] = await connection.execute(
            'UPDATE users SET password = ? WHERE email = ?',
            [hashedPassword, email]
        );

        if (updateResult.affectedRows === 0) {
            throw new Error("Failed to update password. User not found.");
        }

        // Delete used OTP
        await connection.execute(otpModel.deleteOtp, [email, otp]);

        return true;

    } catch (error) {
        throw new Error(`Password reset failed: ${error.message}`);
    }
};