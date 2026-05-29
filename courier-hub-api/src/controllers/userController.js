import { v4 as uuidv4 } from "uuid";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUserService = async (req, res, next) => {
  const { name, emailId, password, role } = req.body;
  const id = uuidv4();
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await createUser(id, name, emailId, hashedPassword, role);
    if (newUser) {
      res.status(201).json({
        status: 201,
        message: "User added successfuly",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getAllUsersService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getAllUsers();
    if (user) {
      res.status(200).json({
        status: 200,
        message: "All users fetched successfuly",
        data: user,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getUserByEmailIdService = async (req, res, next) => {
  const { emailId, password } = req.body;
  try {
    const user = await getUser(emailId);
    const isValidUser = await bcrypt.compare(password, user.password);
    if (isValidUser) {
      const token = jwt.sign(
        {
          emailId: user.emailId,
          userId: user.id,
        },
        "Thisismysecretkey",
        { expiresIn: "1h" },
      );

      const userData = {
        userId: user.id,
        userName: user.name,
        emailId: user.email_id,
      };

      return res.status(200).json({
        status: 200,
        data: userData,
        token,
        message: "User logged in successfully.",
      });
    }
  } catch (err) {
    next(err);
  }
};

export const updateUserByIdService = async (req, res, next) => {
  const { id } = req.params;
  const { name, emailId, role } = req.body;
  try {
    const updatedUser = await updateUser(name, emailId, role, id);
    if (updatedUser) {
      res.status(200).json({
        status: 200,
        message: "User updated successfuly",
        data: updatedUser,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUserByIdService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await deleteUser(id);
    if (user) {
      res.status(200).json({
        status: 200,
        message: "User deleted successfuly",
        data: user,
      });
    }
  } catch (err) {
    next(err);
  }
};
