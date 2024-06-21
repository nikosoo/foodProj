import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare email template parameters
    const templateParams = {
      to_name: "Nikos", // Replace with recipient's name or email
      from_name: formData.name,
      from_email: formData.email,
      reply_to: formData.email,
      phone: formData.phone, // Add telephone parameter
      message: formData.message,
    };

    // Send email using EmailJS
    emailjs
      .send(
        "service_mcrcdwd", // Replace with your EmailJS service ID
        "template_hsjcxjc", // Replace with your EmailJS template ID
        templateParams,
        "Wmt-u9dXDhD5Ua8qr" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          alert("Your message has been sent successfully!");
          console.log("Email sent:", response.status, response.text);
          // Optionally clear the form after successful submission
          setFormData({ name: "", email: "", phone: "", message: "" });
        },
        (error) => {
          alert("Failed to send your message. Please try again later.");
          console.error("Email failed to send:", error);
        }
      );
  };

  return (
    <section className="text-gray-600 body-font relative mt-40 font-poppins">
      <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          {/* Embed Google Map or your preferred map */}
          <iframe
            width="100%"
            height="100%"
            className="absolute inset-0"
            frameBorder="0"
            title="map"
            marginHeight="0"
            marginWidth="0"
            scrolling="no"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48454.30907153811!2d22.904827816347336!3d40.6211851800716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a838f41428e0ed%3A0x9bae715b8d574a9!2sThessaloniki!5e0!3m2!1sen!2sgr!4v1718544816362!5m2!1sen!2sgr"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          ></iframe>
          <div className="bg-white relative flex flex-wrap py-6 px-12 rounded shadow-md ">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">Thessaloniki</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                EMAIL
              </h2>
              <a className="text-red-500 leading-relaxed">
                info@tastehaven.com
              </a>
              <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                PHONE
              </h2>
              <p className="leading-relaxed">123-456-7890</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 className="text-gray-900 text-2xl mb-1 font-medium title-font">
            Contact us
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Have questions or feedback? Fill out the form below, and we'll
            respond promptly. Thank you!
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="font-semibold text-sm mb-1">
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full rounded-lg py-2 px-3 mt-1 border-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold text-sm mb-1">
                Your Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-lg py-2 px-3 border-2 mt-1 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="font-semibold text-sm mb-1">
                Your Number:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone No."
                className="w-full rounded-lg py-2 px-3 border-2 mt-1 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="font-semibold text-sm mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="4"
                className="w-full rounded-lg px-3 border-2 mt-1 text-sm pt-2 outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
