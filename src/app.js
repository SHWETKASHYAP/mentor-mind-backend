import express from "express";

import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import planRoutes from "./routes/planRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mentormind-delta.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false, // IMPORTANT
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/plans", planRoutes);

// Health check
app.get("/health", (req, res) => {
  console.log("Health route hit");
  res.json({ status: "OK" });
});

export default app;
