import React, { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import logo1 from "../../assets/logo1.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#9ec49e]">
      <div className="w-full max-w-md bg-[#fff0f5] shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-2xl p-8 border-2 border-[#9ec49e]">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 overflow-hidden rounded-full">
            {" "}
            <img src={logo1} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
          Sign in with email
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Access your admin dashboard securely
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // 👈 toggle type
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <a href="#" className="hover:text-green-600">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
          >
            Get Started
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-sm text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Logins */}
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100">
            <FaGoogle className="text-red-500" /> Google
          </button>
          <button className="flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-100">
            <FaApple className="text-black" /> Apple
          </button>
        </div>
      </div>

      <Link to="/">
        <Button className="!fixed !bottom-4 !left-4 !text-[#fff0f5] !px-4 !py-2 !rounded-lg">
          <FaArrowLeftLong className="mr-3" /> Back To Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default Login;
