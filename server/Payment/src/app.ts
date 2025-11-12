import express from "express";
import cors from "cors";
import morgan from "morgan";
import client from "prom-client";
import paymentRoutes from "./routes/paymentRoutes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const register = client.register;
client.collectDefaultMetrics({ register });

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.get("/health", (_, res) => res.status(200).json({ status: "healthy", timestamp: Date.now() }));

app.use("/payments", paymentRoutes);

export default app;
