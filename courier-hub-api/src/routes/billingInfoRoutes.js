import express from "express";
import { getBillingInfoService } from "../controllers/billingInfoController.js";

const router = express.Router();

router.get("/:id", getBillingInfoService);

export default router;
