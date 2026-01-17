// server.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import app from "./src/app.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env explicitly
dotenv.config({ path: path.resolve(__dirname, ".env") });

const PORT = process.env.PORT || 10000;

// ✅ CORS — SAFE + RENDER COMPATIBLE
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mentor-mind-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // IMPORTANT
  })
);

// DB + Server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });
