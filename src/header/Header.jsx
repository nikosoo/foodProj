import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/fast-food-pin-svgrepo-com.svg";

function Header({ userEmail, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-600">
      <nav className="container mx-auto py-6 px-4 md:px-8">
        <div className="flex items-center justify-between ">
          <Link to="/" className="flex items-center text-white">
            <img src={logo} width="60px" alt="logo" className="mr-2" />
            <span className="text-3xl font-bold font-heading">Taste Haven</span>
          </Link>

          <button
            onClick={toggleDropdown}
            className="md:hidden text-white focus:outline-none"
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

          <ul className="hidden md:flex items-center space-x-8 flex-grow justify-center">
            <li>
              <Link to="/" className="text-white hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-white hover:text-gray-200">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-gray-200">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-white hover:text-gray-200">
                Cart
              </Link>
            </li>
          </ul>

          <ul className="hidden md:flex items-center space-x-8">
            {userEmail ? (
              <>
                <li className="text-white">Logged in as: {userEmail}</li>
                <li>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="border-yellow-500 border hover:border-yellow-600 text-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Mobile Dropdown */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden mt-4 flex flex-col items-center space-y-4`}
        >
          <li>
            <Link
              to="/"
              className="text-white hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="text-white hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-white hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-white hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
          </li>
          {userEmail && (
            <li className="text-white">Logged in as: {userEmail}</li>
          )}
          {userEmail && (
            <li>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
          {!userEmail && (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="border-yellow-500 border hover:border-yellow-600 text-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
