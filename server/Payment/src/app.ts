import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import paymentRoutes from "./routes/paymentRoutes";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (_, res) => res.json({ status: "healthy", timestamp: Date.now() }));
app.use("/payments", paymentRoutes);
app.use(errorHandler);

export default app;
