import express from "express";
import authMiddlware from "../middlewares/authMiddleware.js";

import { setAvailability, getAvailability } from "../controllers/availabilityController.js";

const router = express.Router();

router.use(authMiddlware);

router.post("/", setAvailability);
router.get("/", getAvailability);

export default router;