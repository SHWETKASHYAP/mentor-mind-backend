import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
    res.json({
        message: "Protected route accessed",
        userId: req.user.id,
    });
});

export default router;