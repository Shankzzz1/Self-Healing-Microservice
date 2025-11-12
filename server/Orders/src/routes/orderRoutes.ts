import express from "express";
import {
  createOrder,
  getOrder,
  getUserOrders,
  cancelOrder,
} from "../controller/ordercontroller";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/:id", getOrder);
router.get("/user/:id", getUserOrders);
router.delete("/:id", cancelOrder);

export default router;
