// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import client from "prom-client";
// import orderRoutes from "./routes/orderRoutes.js";
// import {  register } from "prom-client";

// const app = express();
// app.use(express.json());
// app.use(cors());
// app.use(morgan("dev"));

// // Prometheus metrics
// const collectDefaultMetrics = client.collectDefaultMetrics;
// collectDefaultMetrics({ register });

// const orderCount = new client.Counter({
//   name: "order_total_created",
//   help: "Total number of created orders",
// });

// app.get("/metrics", async (req, res) => {
//   res.set("Content-Type", client.register.contentType);
//   res.end(await client.register.metrics());
// });

// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "healthy", timestamp: Date.now() });
// });

// // Fault injection endpoint (for anomaly detection testing)
// app.get("/fault", (req, res) => {
//   if (Math.random() < 0.2) process.exit(1); // 20% chance of crash
//   res.send("Order Service stable ✅");
// });

// app.use("/orders", orderRoutes);

// export default app;
