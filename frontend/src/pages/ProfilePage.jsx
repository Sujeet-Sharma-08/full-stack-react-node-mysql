import React from 'react'
import { FaRegUser } from "react-icons/fa6";

const ProfilePage = () => {
    return (
        <div className="w-full flex justify-center py-10 px-4">
            
            <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Left Section */}
                <div className="w-full md:w-1/3 bg-gradient-to-b from-gray-800 to-gray-600 text-white flex flex-col items-center py-10 px-6">
                    
                    {/* Profile Icon */}
                    <div className="bg-white p-3 rounded-full shadow-md mb-4">
                        <FaRegUser className="text-[6rem] text-gray-700" />
                    </div>

                    {/* Name */}
                    <h2 className="text-2xl mt-5 font-semibold">Sujeet Kumar Sharma</h2>

        
                    <div className="mt-15">
                        <button className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition">
                            Change Photo
                        </button>
                    </div>
                </div>

                {/* Right Section – Profile Form */}
                <div className="w-full md:w-2/3 bg-gray-100 p-8">

                    <h3 className="text-xl font-semibold mb-6 text-gray-800">Profile Information</h3>

                    <form className="grid grid-cols-1 gap-5">

                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullname" className="text-gray-700 font-medium">Full Name</label>
                            <input
                                type="text"
                                id="fullname"
                                placeholder="Enter your full name"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                            />
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label htmlFor="mobile" className="text-gray-700 font-medium">Mobile Number</label>
                            <input
                                type="number"
                                id="mobile"
                                placeholder="Enter your phone number"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                            />
                        </div>

                        {/* Update Button */}
                        <div className="pt-4">
                            <button className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition">
                                Update Profile
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}

export default ProfilePage
