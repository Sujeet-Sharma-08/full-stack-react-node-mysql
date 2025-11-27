import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (email, subject, message) => {

  console.log(" user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS," , process.env.EMAIL_USER , process.env.EMAIL_PASS,)
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    });

    return info;
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};
