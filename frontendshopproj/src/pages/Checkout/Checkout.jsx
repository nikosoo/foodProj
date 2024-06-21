import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import emailjs from "emailjs-com";

const CheckoutPage = ({ products }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false); // New state variable

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

  const calculateShippingFee = (total) => {
    return total >= 60 ? 0 : 10;
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
      const total = calculateTotalPrice();
      const shippingFee = calculateShippingFee(total);
      const totalPriceWithShipping = total + shippingFee;

      const response = await fetch(
        "https://food-proj-nine.vercel.app/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalPriceWithShipping * 100,
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

        // Update the order status
        setOrderPlaced(true);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const total = calculateTotalPrice();
  const shippingFee = calculateShippingFee(total);
  const totalPriceWithShipping = total + shippingFee;

  return (
    <div className="flex justify-center my-20">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#ff7f00" }}>
          Checkout
        </h1>
        {orderPlaced ? ( // Conditionally display the confirmation message
          <div className="text-center p-6 bg-green-100 text-green-800 rounded-lg">
            Thank you for your order! Your order has been placed successfully.
          </div>
        ) : (
          <div className="flex flex-wrap md:flex-nowrap">
            <div className="w-full md:w-1/2 md:pr-6">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <h2
                      className="text-lg font-semibold mb-2"
                      style={{ color: "#ff7f00" }}
                    >
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
                    <input
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleFormChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-0">
              <div className="p-4 border border-gray-300 rounded">
                <CardElement className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mt-6">
                <h2
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#ff7f00" }}
                >
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
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>${shippingFee.toFixed(2)}</p>
                  </div>
                  <p
                    className="text-lg font-semibold mt-2"
                    style={{ color: "#ff7f00" }}
                  >
                    Total: ${totalPriceWithShipping.toFixed(2)}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
