import React, { useState } from "react";
import apiConnector from "../api/apiConnector";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);

    try {
      const { username, email, password, mobile } = formData;

      if(password.length <= 6 || password.length >= 12){
        toast.error("paasword length can't be less than 6 character and more than 12")
        return;
      }


      if(mobile.length < 10 || mobile.length > 10){
        toast.error("enter a valid mobile number")
        return;
      }

      const response = await apiConnector.post("/user/register", {
        name: username,
        email,
        password,
        mobile
      },{withCredentials: true});
      toast.success(response.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
        mobile: ""
      })
      navigate('/login')

    } catch (error) {
      toast.error(error.response?.data?.error || "User register failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 shadow-lg rounded-xl max-w-md w-full p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            Create Account
          </h1>
          <p className="text-gray-300">Please fill in the form to register</p>
        </div>

        <form className="space-y-5" onSubmit={handleRegisterSubmit}>
          {/* Name */}
          <div>
            <label
              htmlFor="username"
              className="block text-gray-200 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="username"
              required
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-200 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-200 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-gray-200 font-medium mb-2"
            >
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              required
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-500 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
