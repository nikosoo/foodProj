import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import logo from "../../assets/images/fast-food-pin-svgrepo-com.svg";
import "./Footer.css";

function Footer() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <section className="bg-gradient-to-orange font-poppins">
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Column 1: Logo with Description */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
            <p className="text-white text-sm text-center md:text-left">
              Delicious food, delivered fast!
            </p>
          </div>

          {/* Column 2: Pages Navigation */}
          <div className="text-center md:text-left">
            <nav className="space-y-4">
              <h2 className="text-3xl text-white">Pages</h2>
              <Link
                to="/"
                className="text-white block text-base leading-6 hover:underline"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-white block text-base leading-6 hover:underline"
              >
                Menu
              </Link>
              <Link
                to="/contact"
                className="text-white block text-base leading-6 hover:underline"
              >
                Contact Us
              </Link>
              <Link
                onClick={openModal}
                className="text-white block text-base leading-6 hover:underline"
              >
                Terms and Conditions
              </Link>
            </nav>
          </div>

          {/* Column 3: Get in Touch */}
          <div className="text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl text-white">Get in Touch</h2>
              <p className="text-white">
                Email:{" "}
                <a
                  href="mailto:info@tastehaven.com"
                  className="text-white hover:underline"
                >
                  info@tastehaven.com
                </a>
              </p>
              <p className="text-white">
                Phone:{" "}
                <a
                  href="tel:+11234567890"
                  className="text-white hover:underline"
                >
                  +1-123-456-7890
                </a>
              </p>
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
        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Terms and Conditions"
          className="modal"
          overlayClassName="overlay"
        >
          <div className="modal-content">
            <h2 className="text-2xl mb-4">Terms and Conditions</h2>
            <p className="text-sm text-gray-800">
              {/* Add your terms and conditions text here */}
              Welcome to Taste Haven! By accessing this website, we assume you
              agree to these terms and conditions. Please do not continue to use
              Taste Haven if you do not accept all of the terms and conditions
              stated on this page. Use of Cookies We use cookies on this
              website. By using Taste Haven, you consent to the use of cookies
              in accordance with our privacy policy. Intellectual Property All
              content on Taste Haven is owned by us or our licensors and is
              protected by intellectual property laws. You may view and print
              pages for personal use only. You must not reproduce, duplicate, or
              distribute any content without permission. Links to Other Websites
              Our website may contain links to third-party websites. These links
              are provided for your convenience. We do not endorse the content
              of linked websites and are not responsible for their content or
              privacy practices. Changes to Terms We may update these terms and
              conditions from time to time. Please check this page regularly for
              updates. Continued use of the website after changes constitutes
              your acceptance of the revised terms.
            </p>

            <button
              onClick={closeModal}
              className="bg-gray-800 text-white px-4 py-2 mt-4 hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    </section>
  );
}

export default Footer;
