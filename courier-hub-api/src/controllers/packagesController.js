import { v4 as uuidv4 } from "uuid";
import {
  createPackages,
  getAllPackages,
  getPackageById,
} from "../models/packagesModel.js";

export const createPackagesService = async (req, res, next) => {
  const { packagesData } = req.body;
  const packageId = uuidv4();
  const trackingId = uuidv4();
  try {
    const newPackage = await createPackages(
      packagesData,
      packageId,
      trackingId,
    );
    if (!newPackage) {
      return res.status(500).json({
        status: 500,
        message: "Failed to create package",
      });
    }
    res.status(201).json({
      status: 201,
      message: "Package created successfully",
      data: newPackage,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllPackagesService = async (req, res, next) => {
  try {
    const packages = await getAllPackages();
    if (!packages) {
      return res.status(500).json({
        status: 500,
        message: "Failed to fetch packages detail.",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "All packages fetched successfuly",
      data: packages,
    });
  } catch (err) {
    next(err);
  }
};

export const getPackageByIdService = async (req, res, next) => {
  const { tracking_id } = req.params;
  try {
    const packageData = await getPackageById(tracking_id);
    if (!packageData) {
      return res.status(500).json({
        status: 500,
        message: "Package details not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Package details fetched successfuly",
      data: packageData,
    });
  } catch (err) {
    next(err);
  }
};
