import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import StudyPlan from "../models/StudyPlan.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const plans = await StudyPlan.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(plans);
});

export default router;
