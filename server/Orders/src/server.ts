import express from "express";
import connectDB from "./utils/db";

const app = express();
app.use(express.json());

app.get("/health", (_, res) => res.send("Orders service is healthy ✅"));

const PORT = 3002;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Orders service running on port ${PORT}`);
});
