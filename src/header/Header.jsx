import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/fast-food-pin-svgrepo-com.svg";

function Header({ userEmail, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center bg-gradient-to-r from-gray-800 to-gray-600">
      <nav className="w-full max-w-screen-lg flex flex-col items-center justify-between px-5 xl:px-12 py-6 md:flex-row">
        <Link
          to="/"
          className="text-3xl font-bold font-heading mb-4 md:mb-0 text-white"
        >
          <img src={logo} width="60px" alt="logo" />
        </Link>

        <div className="flex items-center space-x-5 md:hidden">
          <button
            onClick={toggleDropdown}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-5`}
        >
          <li>
            <Link
              to="/"
              className="hover:text-gray-200 text-white"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-gray-200 text-white"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-gray-200 text-white"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="hover:text-gray-200 text-white"
              onClick={() => setIsOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
          </li>
        </ul>
        <ul className="md:flex items-center space-x-5 md:space-x-8">
          {userEmail && (
            <>
              <li className="hover:text-gray-200 text-white">
                Logged in as: {userEmail}
              </li>
              <li>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}

          {/* Separate ul for login and register */}
          <ul className="md:flex items-center space-x-5 md:space-x-8">
            {!userEmail && (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-gray-200 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-gray-200 text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
