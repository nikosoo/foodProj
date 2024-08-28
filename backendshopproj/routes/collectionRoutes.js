import express from "express";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  fetchCollections,
  createPaymentIntent,
} from "../controllers/collectionController.js";

const router = express.Router();

router.post("/collections", authMiddleware, createCollection);
router.put("/collections/:id", authMiddleware, updateCollection);
router.delete("/collections/:id", authMiddleware, deleteCollection);
router.get("/collections", authMiddleware, fetchCollections);
router.post("/create-payment-intent", authMiddleware, createPaymentIntent);

export default router;
