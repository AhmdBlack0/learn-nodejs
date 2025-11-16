import express from "express";
import connectDB from "./db/connectDB.js";
import productRoutes from "./routes/products.route.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
const PORT = 5000;

// routes
app.use("/api/products/", productRoutes);
app.use("/api/auth/", authRoutes);

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();
