import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSubject);

router.get("/", getSubjects);

router.put("/:id", updateSubject);

router.delete("/:id", deleteSubject);

export default router;
