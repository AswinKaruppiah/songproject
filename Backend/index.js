import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Playlist from "./routes/playlist.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load env vars early

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

// Routes
app.use("/", Playlist);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB, {
      serverSelectionTimeoutMS: 30000, // optional: increase timeout
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if DB connection fails
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected");
});

// Start server **after** DB is connected
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
};

startServer();
