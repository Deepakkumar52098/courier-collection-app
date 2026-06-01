import express from "express";
import { getDashboardDetails } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", getDashboardDetails);

export default router;
