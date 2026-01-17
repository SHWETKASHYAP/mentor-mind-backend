import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"
import protectedRoutes from "./routes/protectedRoutes.js";
import subjectRoutes from "./routes/subjectRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import planRoutes from "./routes/planRoutes.js";

const app = express();

app.use(cors({
  origin: "*", // temporarily (we'll lock later)
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth",authRoutes);

app.use("/api/protected",protectedRoutes);

app.use("/api/subjects",subjectRoutes);

app.use("/api/availability", availabilityRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/plans", planRoutes);

app.get('/health',(req,res) => {
    console.log("Health route hit");
    res.json({status: "OK"})
})

export default app;