import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/fast-food-pin-svgrepo-com.svg";
import basket from "../../assets/images/basket.svg";
import { logout } from "../../slices/authSlice"; // Make sure the path is correct

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch(); // Hook to dispatch actions

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

 const handleLogout = () => {
  localStorage.removeItem("token"); // clear token from localStorage
  dispatch(logout()); // update redux state
};

  console.log("User:", user);

  return (
    <div className="bg-white font-poppins fixed top-0 left-0 w-full z-10 shadow-md">
      <nav className="container mx-auto py-6 px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center text-gray-800">
            <img src={logo} width="60px" alt="logo" className="mr-2" />
            <span className="text-3xl font-bold font-heading">Taste Haven</span>
          </Link>

          <button
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            className="md:hidden text-gray-800 focus:outline-none"
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
              <Link
                to="/"
                className="text-gray-800 hover:text-gray-600 border-b-2 border-transparent hover:border-gray-800"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="text-gray-800 hover:text-gray-600 border-b-2 border-transparent hover:border-gray-800"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-800 hover:text-gray-600 border-b-2 border-transparent hover:border-gray-800"
              >
                Contact Us
              </Link>
            </li>
          </ul>

          <ul className="hidden md:flex items-center space-x-8 relative">
            <li>
              <Link
                to="/cart"
                className="text-gray-800 hover:text-gray-600 border-b-2 border-transparent hover:border-gray-800 relative"
              >
                <img src={basket} width="30px" alt="basket" />
                {getCartItemsCount() > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
            </li>
            {user ? (
              <>
                <li className="text-gray-800">Logged in as: {user}</li>
                <li>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleLogout} // Call handleLogout on click
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
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
              className="text-gray-800 hover:text-gray-600 border-b-2 border-transparent hover:border-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="text-gray-800 hover:text-gray-600 border-b-2 border-transparent hover:border-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-800 hover:text-gray-600 border-b-2 border-transparent hover:border-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-gray-800 hover:text-gray-600 border-b-2 border-transparent hover:border-gray-800 relative"
              onClick={() => setIsOpen(false)} // Close dropdown on click
            >
              <img src={basket} width="30px" alt="basket" />
              {getCartItemsCount() > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </li>

          {user && <li className="text-gray-800">Logged in as: {user}</li>}
          {user ? (
            <li>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleLogout} // Call handleLogout on click
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
