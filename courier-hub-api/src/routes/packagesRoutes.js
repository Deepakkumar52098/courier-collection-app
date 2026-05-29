import express from "express";
import { createPackagesService, getAllPackagesService, getPackageByIdService } from "../controllers/packagesController.js";

const router = express.Router();

router.post("/createPackage", createPackagesService);
router.get("/packagesList", getAllPackagesService);
router.get("/:id", getPackageByIdService);



export default router;
