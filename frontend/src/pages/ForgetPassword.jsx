import React, { useState } from 'react';
import apiConnector from '../api/apiConnector';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setForgotPasswordEmail} from '../redux/slices/userSlice.js';


const ForgetPassword = () => {

    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const [emailData, setEmailData] = useState({ email: "" });

    const changeHandler = (e) => {
        setEmailData({
            ...emailData,
            [e.target.name]: e.target.value
        });
    };

    const emailHandler = async (e) => {
    e.preventDefault();

    const { email } = emailData;

    dispatch(setForgotPasswordEmail(email));

    // note: api hit hone se pahle email check kar len ki email empty to nahi hai so that our api call waste na jaaye

    // ⭐ FRONTEND VALIDATION — IMPORTANT
    if (!email || email.trim() === "") {
        toast.error("Email is required!");
        return;
    }

    try {
        const response = await apiConnector.post('/user/v1/forget-password', { email });

        toast.success(response.data.message);

        setEmailData({ email: "" });

        navigate('/verify-otp');

    } catch (error) {
        toast.error(error.response?.data?.error || "Failed to send OTP");
    }
};


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

                {/* Title */}
                <p className="text-lg italic font-semibold text-center text-gray-700 mb-4">
                    Enter your registered email — we will send you an OTP!
                </p>

                {/* Card */}
                <form onSubmit={emailHandler}>
                    
                    <p className="text-xl font-semibold text-center text-gray-800 mb-4">
                        Enter Your Email
                    </p>

                    <input
                        type="email"
                        name="email"
                        value={emailData.email}
                        onChange={changeHandler}
                        placeholder="example@gmail.com"
                        className="w-full p-3 border border-gray-400 rounded-lg text-gray-700
                                   focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />

                    <button
                        type="submit"
                        className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black
                                   font-semibold py-3 rounded-xl shadow-md transition"
                    >
                        Send OTP
                    </button>

                </form>

            </div>
        </div>
    );
};

export default ForgetPassword;
