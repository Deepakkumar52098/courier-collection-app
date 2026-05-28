import express from "express";
import { createPackagesService, getAllPackagesService, getPackageByIdService } from "../controllers/packagesController.js";

const router = express.Router();

router.post("/createPackage", createPackagesService);
router.get("/getPackages", getAllPackagesService);
router.get("/getPackage/:id", getPackageByIdService);



export default router;
