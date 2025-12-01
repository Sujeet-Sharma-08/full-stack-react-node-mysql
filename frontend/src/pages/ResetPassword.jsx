import React, { useState } from 'react';

const ResetPassword = () => {

    const [formData, setFormData] = useState({ newpassword: "" });

    const handleChangePassword = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        console.log(formData);
        
        try {
            // api call here
        } catch (error) {

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
                        name="newpassword"
                        id="newpassword"
                        placeholder="New Password"
                        value={formData.newpassword}
                        onChange={handleChangePassword}
                        className="w-full p-3 border border-gray-400 rounded-lg text-gray-700
                                   focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                    />

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full mt-6 bg-yellow-400 hover:bg-yellow-500 text-black
                                   font-semibold py-3 rounded-xl shadow-md transition"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
