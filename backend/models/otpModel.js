export const otpModel={

    generateOtp : "insert into tbl_otp_verification (otp, email) values(?, ?)",
    findUserByEmail:" select email from tbl_otp_verification where email=?"
}