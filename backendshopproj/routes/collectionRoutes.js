import express from "express";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  fetchCollections,
  createPaymentIntent,
} from "../controllers/collectionController.js";

const router = express.Router();

router.post("/", createCollection);
router.put("/:id", updateCollection);
router.delete("/:id", deleteCollection);
router.get("/", fetchCollections);
router.post("/create-payment-intent", createPaymentIntent);

export default router;
