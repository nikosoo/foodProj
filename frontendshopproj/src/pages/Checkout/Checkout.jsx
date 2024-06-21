import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import emailjs from "emailjs-com";

const CheckoutPage = ({ products }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const stripe = useStripe();
  const elements = useElements();

  const calculateTotalPrice = () => {
    let subtotal = 0;

    if (!Array.isArray(products)) {
      console.error("products is not an array:", products);
      return subtotal;
    }

    // Calculate subtotal
    for (let i = 0; i < products.length; i++) {
      const item = products[i];
      if (typeof item.price !== "number" || typeof item.quantity !== "number") {
        console.error("Invalid item data:", item);
        continue;
      }
      subtotal += item.price * item.quantity;
    }

    // Add shipping cost
    const shippingCost = 10; // $10 flat shipping cost
    const total = subtotal >= 60 ? subtotal : subtotal + shippingCost;

    return total;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailSend = (orderDetails) => {
    const emailParamsCustomer = {
      name: formData.name,
      email: formData.email,
      address: formData.address,
      order: orderDetails
        .map(
          (item) =>
            `${item.quantity} x ${item.title} at $${item.price.toFixed(2)}`
        )
        .join(", "),
      shipping: calculateTotalPrice() >= 60 ? "Free Shipping" : "$10 Shipping",
    };

    const emailParamsOwner = {
      customer_name: formData.name,
      customer_email: formData.email,
      customer_address: formData.address,
      order: orderDetails
        .map(
          (item) =>
            `${item.quantity} x ${item.title} at $${item.price.toFixed(2)}`
        )
        .join(", "),
      shipping: calculateTotalPrice() >= 60 ? "Free Shipping" : "$10 Shipping",
    };

    // Send email to customer
    emailjs
      .send(
        "service_scppvll", // Replace with your EmailJS service ID
        "template_9i51izo", // Replace with your EmailJS customer template ID
        emailParamsCustomer,
        "eoHa082tV_n8Rec-B" // Replace with your EmailJS user ID
      )
      .then((response) => {
        console.log(
          "Customer email successfully sent!",
          response.status,
          response.text
        );
      })
      .catch((err) => {
        console.error("There was an error sending the customer email:", err);
      });

    // Send email to owner
    emailjs
      .send(
        "service_mcrcdwd", // Replace with your EmailJS service ID
        "template_onnaeq8", // Replace with your EmailJS owner template ID
        emailParamsOwner,
        "Wmt-u9dXDhD5Ua8qr" // Replace with your EmailJS user ID
      )
      .then((response) => {
        console.log(
          "Owner email successfully sent!",
          response.status,
          response.text
        );
      })
      .catch((err) => {
        console.error("There was an error sending the owner email:", err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await fetch(
        "https://food-proj-nine.vercel.app/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: calculateTotalPrice() * 100, // Convert to cents
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

        // Send email with order details
        handleEmailSend(products);

        // Show alert for successful order
        alert("Your order has been successfully placed!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="max-w-md w-full p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-orange-700">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-orange-700">
                Customer Information
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-2 border border-orange-300 rounded"
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
                className="w-full p-2 border border-orange-300 rounded"
                required
              />
            </div>
            <div>
              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleFormChange}
                className="w-full p-2 border border-orange-300 rounded"
                required
              ></textarea>
            </div>
            <div>
              <CardElement className="w-full p-2 border border-orange-300 rounded" />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-orange-700">
              Order Summary
            </h2>
            <div className="space-y-2">
              {products.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <p>{item.title}</p>
                  <p>
                    {item.quantity} x ${item.price.toFixed(2)}
                  </p>
                </div>
              ))}
              <p className="text-lg font-semibold mt-2 text-orange-700">
                Shipping: {calculateTotalPrice() >= 60 ? "Free" : "$10"}
              </p>
              <p className="text-lg font-semibold mt-2 text-orange-700">
                Total: ${calculateTotalPrice().toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4"
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
