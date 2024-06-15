import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutPage = ({ products }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const stripe = useStripe();
  const elements = useElements();

  const calculateTotalPrice = () => {
    let total = 0;

    if (!Array.isArray(products)) {
      console.error("products is not an array:", products);
      return total;
    }

    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      if (typeof item.price !== "number" || typeof item.quantity !== "number") {
        console.error("Invalid item data:", item);
        continue;
      }
      total += item.price * item.quantity;
    }

    return total;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: calculateTotalPrice() * 100,
            currency: "usd",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { clientSecret } = await response.json();

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              line1: formData.address,
            },
          },
        },
      });

      if (error) {
        console.error("Payment failed:", error);
      } else {
        console.log("Payment successful");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Customer Information
              </h2>
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
              <CardElement className="w-full p-2 border border-gray-300 rounded" />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <div className="space-y-2">
              {products.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <p>{item.title}</p>
                  <p>
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
              ))}
              <p className="text-lg font-semibold mt-2">
                Total: ${calculateTotalPrice().toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
