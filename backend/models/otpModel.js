export const otpModel={
    generateOtp : "insert into tbl_otp_verification (otp, email) values(?, ?)",
    findOtp : "SELECT * FROM tbl_otp_verification WHERE email = ? AND otp = ?",
    deleteOtp:"delete from tbl_otp_verification where email = ? and otp = ?"

}