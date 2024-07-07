import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bowlImage from "../../assets/images/large-bowl.avif"; // You can replace this with your desired image
import { Link } from "react-router-dom";

const Login = ({ handleLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://food-proj-nine.vercel.app/api/login",
        {
          email,
          password,
        }
      );
      const token = response.data;
      localStorage.setItem("token", token);
      navigate("/");
      handleLoginSuccess(email);
      console.log("Successful login!");
    } catch (error) {
      setError("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-poppins">
      <div className="bg-gray-100 flex justify-center items-center w-full max-w-7xl mx-auto shadow-lg rounded-lg">
        {/* Left: Image */}
        <div className="w-1/2 h-full hidden lg:block">
          <img
            src={bowlImage}
            alt="Placeholder"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
        {/* Right: Login Form */}
        <div className="lg:p-24 md:p-20 sm:p-16 p-12 w-full lg:w-1/2">
          <h1 className="text-5xl font-semibold mb-10">Login</h1>
          {error && <p className="text-red-500 text-center mb-6">{error}</p>}
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="mb-10">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Input */}
            <div className="mb-10">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md py-3 px-6 w-full"
            >
              Login
            </button>
          </form>
          {/* Sign up Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-orange-500 hover:underline">
                Sign up Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
