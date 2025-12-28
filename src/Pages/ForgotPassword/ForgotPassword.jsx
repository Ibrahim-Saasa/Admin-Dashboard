import { useContext, useState } from "react";
import logo1 from "../../assets/l.png";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";
import bgImage from "../../assets/titanium.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(MyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
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
            Forgot Password?
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Access your admin dashboard securely
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />{" "}
            </div>

            <Link to="/verify">
              <button
                type="submit"
                className="w-full titanium !text-black cursor-pointer py-2 rounded-lg transition-colors"
              >
                Send Code
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
