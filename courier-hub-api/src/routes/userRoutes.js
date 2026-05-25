import express from "express";
import {
  createUserService,
  deleteUserByIdService,
  getAllUsersService,
  getUserByIdService,
  updateUserByIdService,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", createUserService);
router.get("/login", getAllUsersService);
router.get("/login/:id", getUserByIdService);
router.post("/login/:id", updateUserByIdService);
router.delete("/login/:id", deleteUserByIdService);

export default router;
