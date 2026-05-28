import express from "express";
import { getTrackingHistoryById, updateTrackingHistory } from "../controllers/trackingHistoryController.js";

const router = express.Router();

router.post("/:id", updateTrackingHistory);
router.get("/:tracking_id", getTrackingHistoryById);

export default router;
