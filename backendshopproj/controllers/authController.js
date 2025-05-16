import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const register = async (req, res) => {
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
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send("Invalid email or password");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password");
  }

  // ← embed isAdmin into the token payload
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.header("auth-token", token).send(token);
};