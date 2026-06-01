import express from "express";
import { createPackagesService, getAllPackagesService, getPackageByIdService } from "../controllers/packagesController.js";

const router = express.Router();

router.post("/createPackage", createPackagesService);
router.post("/packagesList", getAllPackagesService);
router.get("/:id", getPackageByIdService);

export default router;
