import { v4 as uuidv4 } from 'uuid'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../models/userModel.js";


export const createUserService = async (req, res, next) => {
  const { name, emailId, password, role } = req.body;
  const id = uuidv4()
  try {
    const newUser = await createUser(id, name, emailId, password, role);
    if (newUser) {
      res.status(201).json({
        status: 201,
        message: "User added successfuly",
        data: newUser,
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

export const getUserByIdService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    if (user) {
      res.status(200).json({
        status: 200,
        message: "User fetched successfuly",
        data: user,
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
