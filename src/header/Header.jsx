import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex justify-center bg-gray-900 text-white">
      <nav className="w-full max-w-screen-lg flex flex-col items-center justify-between px-5 xl:px-12 py-6 md:flex-row">
        <Link to="/" className="text-3xl font-bold font-heading mb-4 md:mb-0">
          Logo Here.
        </Link>

        <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-5">
          <li>
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-gray-200">
              Menu
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200">
              Contact Us
            </Link>
          </li>
        </ul>

        <div className=" xl:flex items-center space-x-5">
          <Link to="/cart" className="flex items-center hover:text-gray-200">
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
