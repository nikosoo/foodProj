import express from "express";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getAllCollections,
  createPaymentIntent,
} from "../controllers/collectionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // Import the middleware

const router = express.Router();

// Apply middleware to all routes in this router
router.use(authMiddleware);

router.post("/collections", createCollection);
router.put("/collections/:id", updateCollection);
router.delete("/collections/:id", deleteCollection);
router.get("/collections", getAllCollections);
router.post("/create-payment-intent", createPaymentIntent);

export default router;
