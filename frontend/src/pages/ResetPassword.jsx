import React, { useState } from 'react';
import apiConnector from '../api/ApiConnector';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearForgotPasswordEmail, clearForgotPasswordOtp } from '../redux/slices/userSlice';


const ResetPassword = () => {

    const [formData, setFormData] = useState({ newPassword: "" });

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const resetEmail = useSelector((state) => state.user.forgotPasswordEmail);
    const resetOtp = useSelector((state) => state.user.forgotPasswordOtp);


    console.log("printing the resetEmail and resetOtp", resetEmail, resetOtp)

    const handleChangePassword = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const { newPassword } = formData;

        if (!newPassword) {
            toast.error("Password is required");
            return;
        }

        if (!resetEmail || !resetOtp) {
            toast.error("Session expired. Please request OTP again.");
            navigate('/forgot-password');
            return;
        }

        try {
            const response = await apiConnector.post('/user/v1/reset-password', { newPassword, resetEmail, resetOtp })
            setFormData({ newPassword : "" })
            toast.success(response.data.message || "password reset successful!")

            dispatch(clearForgotPasswordEmail());
            dispatch(clearForgotPasswordOtp())
            navigate('/login')
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!")
        }
    };

    return (
        <div className=" py-40 flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center italic mb-6 text-gray-800">
                    Enter your new password
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmitForm}>
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="New Password"
                        value={formData.newPassword}
                        onChange={handleChangePassword}
                        className="w-full p-3 border border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl shadow-md transition"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
