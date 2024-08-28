import express from "express";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getAllCollections,
  createPaymentIntent,
} from "../controllers/collectionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route without middleware
router.get("/collections", getAllCollections);

// Apply middleware to specific routes
router.use(authMiddleware);

router.post("/collections", createCollection);
router.put("/collections/:id", updateCollection);
router.delete("/collections/:id", deleteCollection);
router.post("/create-payment-intent", createPaymentIntent);

export default router;
