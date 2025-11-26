import connection from "../config/db";
import { otpModel } from "../models/otpModel";

export const forgotPasswordService = async ({ email }) => {
    if (!email) {
        throw new Error("Email is required!");
    }

    const [rows] = await connection.execute(otpModel.findUserByEmail, [email]);

    if (rows.length === 0) {
        throw new Error("User with this email does not exist!");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    await connection.execute(otpModel.generateOtp, [otp, email]);

    return otp;
}



export const otpVerifyService = async ({ otp }) => {

    const [otpFromDB] = await connection.execute(otpModel.findOtp,[otp]);

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
        // Input validation
        if (!email || !email.includes('@')) {
            throw new Error("Valid email is required!");
        }

        if (!otp || otp.toString().length !== 6) {
            throw new Error("Valid 6-digit OTP is required!");
        }

        if (!newPassword || newPassword.length < 6) {
            throw new Error("Password must be at least 6 characters long!");
        }

        // Verify OTP and get the record
        const [otpRecords] = await connection.execute(otpModel.findOtp, [otp]);
        
        if (!otpRecords || otpRecords.length === 0) {
            throw new Error("Invalid OTP");
        }

        const otpRecord = otpRecords[0];

        // Verify OTP belongs to the requesting email
        if (otpRecord.email !== email) {
            throw new Error("OTP does not match the provided email");
        }

        // Check OTP expiry (10 minutes)
        const currentTime = new Date();
        const createdAt = new Date(otpRecord.created_at);
        const timeDifference = (currentTime - createdAt) / (1000 * 60);
        
        if (timeDifference > 10){
            // Clean up expired OTP
            await connection.execute(otpModel.deleteOtp, [otp]);
            throw new Error("OTP has expired. Please request a new one.");
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        const [updateResult] = await connection.execute(
            'UPDATE users SET password = ? WHERE email = ?',
            [hashedPassword, email]
        );

        if (updateResult.affectedRows === 0) {
            throw new Error("Failed to update password. User not found.");
        }

        // Delete used OTP
        await connection.execute(otpModel.deleteOtp, [otp]);

        return true;

    } catch (error) {
        throw new Error(`Password reset failed: ${error.message}`);
    }
};