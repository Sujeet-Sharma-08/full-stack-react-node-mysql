import connection from "../config/db";
import { otpModel } from "../models/otpModel";

export const handleForgotPasswordService = async ({ email }) => {
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