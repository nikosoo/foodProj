import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// 1) Enable CORS globally, exposing your custom auth header
app.use(
  cors({
    origin: "https://food-proj-hwg6.vercel.app",   // your front-end origin
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "auth-token"],
    credentials: true,                              // if you ever send cookies
  })
);

// 2) ALSO explicitly handle preflight OPTIONS requests
app.options("*", cors());

// 3) JSON body parser
app.use(express.json());

// 4) Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { dbName: "test" })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 5) Mount your routes
app.use("/api", authRoutes);
app.use("/api", collectionRoutes);

// 6) Your error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
