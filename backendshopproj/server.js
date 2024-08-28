import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "https://food-proj-hwg6.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// Connect to MongoDB using environment variable
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "test",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use("/api", authRoutes);
app.use("/api", collectionRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
