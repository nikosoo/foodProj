import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authMiddleware, register);
router.post("/login", authMiddleware, login);

export default router;
