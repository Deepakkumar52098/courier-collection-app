import express from "express";
import {
  createUserService,
  deleteUserByIdService,
  getAllUsersService,
  getUserByEmailIdService,
  updateUserByIdService,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signUp", createUserService);
router.post("/login", getUserByEmailIdService);
router.get("/login", getAllUsersService);
router.post("/login/:id", updateUserByIdService);
router.delete("/login/:id", deleteUserByIdService);

export default router;
