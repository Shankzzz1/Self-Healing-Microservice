import { Request, Response } from "express";
import { Payment } from "../model/payment";

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const { orderId, amount, method } = req.body;
    const payment = await Payment.create({ orderId, amount, method });
    res.status(201).json(payment);
  } catch (error: any) {
    res.status(500).json({ error: "Payment initiation failed", details: error.message });
  }
};

export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: "success" },
      { new: true }
    );
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (error: any) {
    res.status(500).json({ error: "Payment confirmation failed", details: error.message });
  }
};

export const getPaymentStatus = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ error: "Payment not found" });
    res.json(payment);
  } catch (error: any) {
    res.status(500).json({ error: "Error fetching payment status", details: error.message });
  }
};
