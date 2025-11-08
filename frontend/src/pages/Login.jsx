import React, { useState } from "react";
import apiConnector from "../api/apiConnector.jsx"
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {


  const [eyeOpen, setEyeOen] = useState(false)

  function changeEyeOpen() {
    setEyeOen(!eyeOpen)
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form reload

    const { email, password } = formData;
    try {
      const response = await apiConnector.post("/user/login", {
        email,
        password,
      });

      toast.success(response.data.message)
      setFormData({
        email: "",
        password: ""
      })

    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="bg-gray-800 shadow-lg rounded-xl max-w-md w-full p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            Login to your account
          </h1>
        </div>

        {/*Form */}
        <form onSubmit={handleLogin} className="space-y-5">
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
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* Password */}
          <div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-200 font-medium mb-2"
            >
              Password
            </label>
            <input
              type={eyeOpen ? "password" : "text"}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          {/* eye button */}
          <div className="absolute -mt-7 ml-84 cursor-pointer text-gray-300" onClick={changeEyeOpen}>{eyeOpen ? < FaRegEyeSlash /> : <FaRegEye />}</div>

          <Link className="text-white ml-54">Forget your password ? </Link>
          </div>

          {/* Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-yellow-500 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-400">
          Don’t have an account?{" "}
          <a href="/register" className="text-yellow-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
