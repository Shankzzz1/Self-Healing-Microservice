import express from "express";
import { initiatePayment, confirmPayment, getPaymentStatus } from "../controller/paymentController";

const router = express.Router();

router.post("/initiate", initiatePayment);
router.put("/confirm/:id", confirmPayment);
router.get("/:id", getPaymentStatus);

export default router;
