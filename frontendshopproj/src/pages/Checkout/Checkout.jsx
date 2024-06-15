import React, { useState } from "react";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    // Example: Call API to process order and payment
    // await fetch('/api/checkout', { method: 'POST', body: JSON.stringify(formData) });
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <div>
            {/* Add more fields like payment method, card details */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Place Order
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          {/* Display order summary here */}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
