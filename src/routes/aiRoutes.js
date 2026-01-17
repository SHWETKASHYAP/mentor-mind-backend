import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { generateStudyPlan } from "../controllers/aiController.js";

const router = express.Router();

router.use(authMiddleware);
router.post("/study-plan", generateStudyPlan);

export default router;
