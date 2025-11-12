import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  orderId: string;
  amount: number;
  status: "pending" | "success" | "failed";
  method: string;
}

const paymentSchema = new Schema<IPayment>(
  {
    orderId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    method: { type: String, default: "credit-card" },
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
