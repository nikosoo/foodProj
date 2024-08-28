import Collection from "../models/Collection.js";
import stripe from "../config/stripe.js";

export const createCollection = async (req, res) => {
  const { id, title, description, price, category, img } = req.body;

  try {
    const newCollection = new Collection({
      id,
      title,
      description,
      price,
      category,
      img,
    });
    await newCollection.save();
    res.status(201).json(newCollection);
  } catch (error) {
    console.error("Error creating collection:", error);
    res.status(500).json({ error: "Failed to create collection" });
  }
};

// Similar approach for update, delete, fetch etc.

export const createPaymentIntent = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).json({ error: "Failed to create PaymentIntent" });
  }
};
