import express from "express";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getAllCollections,
  createPaymentIntent,
} from "../controllers/collectionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/auth.js"; // ← import your admin guard

const router = express.Router();

// Public: anyone can list
router.get("/collections", getAllCollections);

// Protected: any authenticated user can create a payment intent
router.post(
  "/create-payment-intent",
  authMiddleware,
  createPaymentIntent
);

// Admin-only: apply authMiddleware first, then requireAdmin
router.post(
  "/collections/update",
  authMiddleware,
  requireAdmin,
  createCollection
);

router.put(
  "/collections/:id",
  authMiddleware,
  requireAdmin,
  updateCollection
);

router.delete(
  "/collections/:id",
  authMiddleware,
  requireAdmin,
  deleteCollection
);

export default router;
