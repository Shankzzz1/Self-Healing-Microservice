import express from "express";
import cors from "cors";
import morgan from "morgan";
import client from "prom-client";
import orderRoutes from "./routes/orderRoutes";
import connectDB from "./utils/db";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
const register = client.register;
collectDefaultMetrics({ register });

const orderCount = new client.Counter({
  name: "order_total_created",
  help: "Total number of created orders",
});

// Routes
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.get("/health", (_, res) =>
  res.status(200).json({ status: "healthy", timestamp: Date.now() })
);

app.get("/fault", (_, res) => {
  if (Math.random() < 0.2) process.exit(1); // 20% chance of crash
  res.send("Order Service stable ✅");
});

app.use("/orders", orderRoutes);

// Database connection + server start
const PORT = 3002;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Orders service running on port ${PORT}`);
});
