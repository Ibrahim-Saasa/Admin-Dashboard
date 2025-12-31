import React, { useContext, useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import logo1 from "../../assets/l.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Pie,
  PieChart,
} from "recharts";
import { MyContext } from "../../App";
import { postData } from "../../api";

const Login = () => {
  const navigate = useNavigate();

  const [chart1Data, setChart1Data] = useState([
    {
      name: "January",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Febuary",
      uv: 2500,
      pv: 1500,
      amt: 500,
    },
    {
      name: "March",
      uv: 3000,
      pv: 1598,
      amt: 110,
    },
    {
      name: "April",
      uv: 1000,
      pv: 2300,
      amt: 2400,
    },
    {
      name: "May",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "June",
      uv: 6000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "July",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "August",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "September",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "October",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "November",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "December",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
  ]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const context = useContext(MyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await postData("/api/admin/login", {
      email,
      password,
    });

    console.log("ADMIN LOGIN RESPONSE:", res);

    // ✅ THIS is the correct check
    if (res.success === true && res.token) {
      localStorage.setItem("adminToken", res.token);
      localStorage.setItem("admin", JSON.stringify(res.admin));
      context.setIsLogin(true);
      navigate("/dashboard");
    } else {
      alert(res.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen metal-bg flex flex-col items-center justify-center bg-cover bg-center">
      <div>
        <h1 className="font-semibold text-[30px] text-center text-[var(--gunmetal)] tracking-wide">
          Join Us Today. Get Exclusive Access.
        </h1>
      </div>
      <div className="flex gap-5 items-start">
        <div className="card shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-2xl p-4 glass border-1 border-[#9ec49e] mt-20">
          <BarChart width={500} height={300} data={chart1Data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="pv" stackId="a" fill="#8d99ae" />
            <Bar dataKey="uv" stackId="a" fill="#edf2f4" />
          </BarChart>
          <h1 className="font-bold mb-5 text-[30px] text-center bg-gradient-to-r from-[var(--slate)] via-[var(--gunmetal)] to-[var(--slate)] bg-clip-text text-transparent">
            Get Accurate Infographics.
          </h1>
        </div>
        <div className="w-full max-w-md glass shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-2xl p-8 border-2 border-[#9ec49e]">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-30 h-24 overflow-hidden rounded-full">
              {" "}
              <img src={logo1} alt="" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl mb-2 font-bold bg-gradient-to-r from-[var(--slate)] via-[var(--gunmetal)] to-[var(--slate)] bg-clip-text text-transparent">
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
              className="w-full input-metal px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // 👈 toggle type
                placeholder="Password"
                className="w-full input-metal px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
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
              <Link to="/forgotPassword">Forgot password?</Link>
            </div>

            <button
              type="submit"
              className="w-full titanium-btn-btn py-2 cursor-pointer transition-colors rounded-lg"
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
            <button className="flex items-center gap-2 border rounded-lg px-4 py-2 social">
              <FaGoogle className=" " /> Google
            </button>
            <button className="flex items-center gap-2 border rounded-lg px-4 py-2 social1">
              <FaApple className="text-black" /> Apple
            </button>
          </div>
        </div>
        <div className="card shadow-[0_0_15px_rgba(0,0,0,0.1)] rounded-2xl p-4 glass border-1 border-[#9ec49e] mt-20">
          <LineChart
            width={500}
            height={300}
            data={chart1Data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" ticket={{ fontsize: 12 }} />
            <YAxis yAxisId="left" ticket={{ fontsize: 12 }} />
            {/* <YAxis yAxisId="right" orientation="right" /> */}
            <Tooltip />
            {/* <Legend /> */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="pv"
              stroke="#e5e7eb"
              strokeWidth={4}
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="uv"
              stroke="#8d99ae"
              strokeWidth={4}
            />
          </LineChart>
          <h1 className="font-bold mb-5 text-[30px] text-center bg-gradient-to-r from-[var(--slate)] via-[var(--gunmetal)] to-[var(--slate)] bg-clip-text text-transparent">
            For Easier Understanding.
          </h1>
        </div>
      </div>

      <Link to="/">
        <Button className="!fixed !bottom-4 !left-4 !text-[#000] !px-4 !py-2 !rounded-lg">
          <FaArrowLeftLong className="mr-3" /> Back To Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default Login;
