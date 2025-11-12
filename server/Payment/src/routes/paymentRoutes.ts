import express from "express";
import { createPayment, verifyPayment } from "../controller/paymentController";

const router = express.Router();

router.post("/create", createPayment);
router.post("/verify", verifyPayment);

export default router;
