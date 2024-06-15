import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import logo from "../../assets/images/fast-food-pin-svgrepo-com.svg";

function Footer() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <section className="bg-gradient-to-r from-gray-800 to-gray-600">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: Logo with Description */}
          <div className="md:text-left">
            <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
            <p className="text-white  text-sm">
              Delicious food, delivered fast!
            </p>
          </div>

          {/* Column 2: Pages Navigation */}
          <div className="text-center md:text-left">
            <nav className="space-y-4">
              <h2 className="text-3xl text-white">PAGES</h2>
              <Link
                to="/"
                className="text-white hover:text-gray-900 block text-base leading-6"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-white hover:text-gray-900 block text-base leading-6"
              >
                Menu
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-gray-900 block text-base leading-6"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl text-white">Get in Touch</h2>
              <p className="text-white">Email: info@tastehaven.com</p>
              <p className="text-white">Phone: +1-123-456-7890</p>
              <div className="flex justify-center md:justify-start space-x-6 mt-4">
                <a
                  href="https://twitter.com/bos_nikos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://github.com/nikosoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © 2024 TasteHaven, Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;
