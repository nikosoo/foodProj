import express from "express";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  getAllCollections,
  createPaymentIntent,
} from "../controllers/collectionController.js";

const router = express.Router();

router.post("/collections", createCollection);
router.put("/collections/:id", updateCollection);
router.delete("/collections/:id", deleteCollection);
router.get("/collections", getAllCollections);
router.post("/create-payment-intent", createPaymentIntent);

export default router;
