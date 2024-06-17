// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import Stripe from "stripe";

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB using environment variable
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Stripe setup
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27", // Replace with your preferred API version
});

// User model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// Collection model
const CollectionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
});

const Collection = mongoose.model("Collection", CollectionSchema);

// Endpoint to create PaymentIntent with Stripe
app.post("/api/create-payment-intent", async (req, res) => {
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
});

// Endpoint to fetch collections from MongoDB
app.get("/api/collections", async (req, res) => {
  try {
    const collections = await Collection.find({});
    res.json(collections);
  } catch (error) {
    console.error("Error fetching data from MongoDB", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Register endpoint
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });

  try {
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Failed to register user");
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("auth-token", token).send(token);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
