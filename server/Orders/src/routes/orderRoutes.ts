import express from "express";
import { createOrder, getOrder, cancelOrder, getUserOrders } from "../controller/ordercontroller";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/create", verifyToken, createOrder);
router.get("/:id", verifyToken, getOrder);
router.delete("/:id", verifyToken, cancelOrder);
router.get("/user/:id", verifyToken, getUserOrders);

export default router;
