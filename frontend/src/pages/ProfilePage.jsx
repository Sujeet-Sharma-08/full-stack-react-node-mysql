import React, { useState, useEffect } from 'react';
import { FaRegUser } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import apiConnector from '../api/ApiConnector';
import { toast } from 'react-toastify';

const ProfilePage = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.userData);

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: ""
    });

    // ✅ Load Redux user into local form state
    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || "",
                email: currentUser.email || "",
                mobile: currentUser.mobile || ""
            });
        }
    }, [currentUser]);

    // ✅ Input change handler
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // ✅ Edit + Save Handler
    const profileEditHandler = async (e) => {
        e.preventDefault();

        // ✅ If already editing → SAVE
        if (isEditing) {
            try {
                const { name, email, mobile } = formData;

                const res = await apiConnector.put(
                    "/user/update-profile",
                    { name, email, mobile }
                );

                // dispatch(setUpdatedUserData(res.data));
                toast.success(res.data.message || "Profile Updated Successfully!");
                setIsEditing(false);

            } catch (error) {
                console.log(error);
                toast.error("Profile Update Failed!");
            }
        } else {
            // Enter edit mode
            setIsEditing(true);
        }
    };

    return (
        <div className="w-full flex justify-center py-20 px-4">
            <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Left Section */}
                <div className="w-full md:w-1/3 bg-gradient-to-b from-gray-800 to-gray-600 text-white flex flex-col items-center py-10 px-6">
                    <div className="bg-white p-3 rounded-full shadow-md mb-4">
                        <FaRegUser className="text-[6rem] text-gray-700" />
                    </div>

                    <h2 className="text-2xl mt-5 text-white font-semibold">
                        {currentUser?.name}
                    </h2>

                    <div className="mt-15">
                        <button className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition">
                            Change Photo
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-full md:w-2/3 bg-gray-100 p-8">
                    <h3 className="text-xl font-semibold mb-6 text-gray-800">
                        Profile Information
                    </h3>

                    <form className="grid grid-cols-1 gap-5">

                        {/* ✅ NAME */}
                        <div>
                            <label className="text-gray-700 font-medium">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mt-1 w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        {/* ✅ MOBILE */}
                        <div>
                            <label className="text-gray-700 font-medium">Mobile Number</label>
                            <input
                                type="number"
                                id="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mt-1 w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        {/* ✅ EMAIL */}
                        <div>
                            <label className="text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className="mt-1 w-full px-4 py-2 border rounded-lg"
                            />
                        </div>

                        {/* ✅ BUTTON */}
                        <div className="pt-4">
                            <button
                                onClick={profileEditHandler}
                                className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition"
                            >
                                {isEditing ? "Save Changes" : "Update Profile"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
