import React, { useEffect } from "react";
import contactImg from "../../assets/images/worst-food-for-arteries-according-to-cardiologists.jpg";

const Contact = () => {
  const contactPlace = () => {
    alert("Your form has been submitted");
    window.location.reload();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="font-[sans-serif] mb-10">
      <div className="bg-gradient-to-r from-blue-700 to-blue-300 w-full h-48">
        <img
          src={contactImg}
          alt="Banner Image"
          className="w-full h-full object-cover"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </div>
      <div className="-mt-24 mb-6 px-4">
        <div className="mx-auto max-w-lg shadow-lg py-6 px-4 relative bg-white rounded">
          <h2 className="text-lg text-[#333] font-bold">Contact us</h2>
          <form className="mt-4 flex flex-col gap-4">
            <div>
              <label className="font-semibold text-sm mb-1">Your Name:</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full rounded-lg py-2 px-3 mt-1 border-2 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-semibold text-sm mb-1">Your Email:</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-lg py-2 px-3 border-2 mt-1 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-semibold text-sm mb-1">Your Number:</label>
              <input
                type="text"
                placeholder="Phone No."
                className="w-full rounded-lg py-2 px-3 border-2 mt-1 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="font-semibold text-sm mb-1">Message</label>
              <textarea
                placeholder="Message"
                rows="4"
                className="w-full rounded-lg px-3 border-2 mt-1 text-sm pt-2 outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <button
              onClick={contactPlace}
              type="button"
              className="text-white bg-red-500 hover:bg-red-600 font-semibold rounded-lg text-sm px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
