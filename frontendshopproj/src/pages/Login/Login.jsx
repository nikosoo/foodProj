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
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
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
    <div className="flex justify-center py-20">
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src={bowlImage}
            alt="Placeholder"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* Remember Me Checkbox */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-500"
              />
              <label htmlFor="remember" className="text-gray-600 ml-2">
                Remember Me
              </label>
            </div>
            {/* Forgot Password Link */}
            <div className="mb-6 text-orange-500">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>
          {/* Sign up Link */}
          <div className="mt-6 text-orange-500 text-center">
            <Link to="/register" className="hover:underline">
              Sign up Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
