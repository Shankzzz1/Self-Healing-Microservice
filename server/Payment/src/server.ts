import app from "./app";
import connectDB from "./utils/db";

const PORT = 3003;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Payment service running on port ${PORT}`);
});
