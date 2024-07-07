import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import burgerImage from "../../assets/images/burger-with-melted-cheese.webp"; // You can replace this with your desired image

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://food-proj-nine.vercel.app/api/register", {
        email,
        password,
      });
      setSuccess("User registered successfully");
      setError("");
    } catch (error) {
      setError("Error registering user");
      setSuccess("");
      console.error("Error registering user:", error.response.data);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-poppins">
      <div className="bg-gray-100 flex justify-center items-center w-full max-w-7xl mx-auto shadow-lg rounded-lg">
        {/* Left: Image */}
        <div className="w-1/2 h-full hidden lg:block">
          <img
            src={burgerImage}
            alt="Placeholder"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>
        {/* Right: Register Form */}
        <div className="lg:p-24 md:p-20 sm:p-16 p-12 w-full lg:w-1/2">
          <h1 className="text-4xl font-semibold mb-8">Register</h1>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}
          <form onSubmit={handleRegister}>
            {/* Email Input */}
            <div className="mb-8">
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
            <div className="mb-8">
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
            {/* Register Button */}
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md py-3 px-6 w-full"
            >
              Register
            </button>
          </form>
          {/* Sign in Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 hover:underline">
                Sign in Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
