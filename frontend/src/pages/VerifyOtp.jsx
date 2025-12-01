import React, { useState, useRef } from "react";
import apiConnector from "../api/apiConnector";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const [otpData, setOtpData] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d$/.test(value) && value !== "") return;

    const newOtp = [...otpData];
    newOtp[index] = value;
    setOtpData(newOtp);

    if (value && index < otpData.length - 1) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otpData[index] === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const otp = otpData.join("");
      const email = userData.email;

      const response = await apiConnector.post("/user/v1/verify-otp", {
        email,
        otp,
      });

      toast.success(response.data?.message || "OTP Verified successfully");
      setOtpData(["", "", "", "", "", ""]);
      navigate("/reset-password");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white/40 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-md border border-white/30">
        
        <h2 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-blue-700 to-purple-700 text-transparent bg-clip-text">
          Enter OTP
        </h2>
        <p className="text-center text-gray-700 mb-4">
          We sent an OTP to your email:{" "}
          <span className="font-semibold">{userData?.email}</span>
        </p>

        <form>
          <div className="flex justify-center gap-4 mt-8">
            {otpData.map((val, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={val}
                ref={(el) => (inputRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="h-14 w-14 rounded-xl border border-gray-400 bg-white/60 
                           backdrop-blur-md text-center text-2xl font-semibold
                           shadow-md focus:shadow-xl transition-all duration-200
                           focus:border-purple-600 outline-none
                           [appearance:textfield] 
                           [&::-webkit-inner-spin-button]:appearance-none 
                           [&::-webkit-outer-spin-button]:appearance-none"
              />
            ))}
          </div>

          <button
            onClick={handleVerifyOtp}
            className="w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 
                       text-black font-bold text-lg shadow-lg hover:shadow-xl 
                       active:scale-95 transition-all duration-200"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
