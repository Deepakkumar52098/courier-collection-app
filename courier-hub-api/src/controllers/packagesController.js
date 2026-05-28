import { v4 as uuidv4 } from "uuid";
import {
  createPackages,
  getAllPackages,
  getPackageById,
} from "../models/packagesModel.js";

import pool from "../config/db.js";

import { createTrackingHistory } from "../models/trackingHistoryModel.js";

export const createAndUpdateTrackingHistory = async (packagesData) => {
  const client = await pool.connect();
  const packageId = uuidv4();
  const trackingId = uuidv4();
  const trackingHistoryId = uuidv4();

  try {
    await client.query("BEGIN");
    // Create package
    const newPackage = await createPackages(
      client,
      packagesData,
      packageId,
      trackingId,
    );

    // Create initial tracking history
    await createTrackingHistory(
      client,
      trackingHistoryId,
      packageId,
      "TO_BE_PICKED_UP",
      packagesData.region,
      "Package created successfully",
    );
    await client.query("COMMIT");
    return newPackage;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const createPackagesService = async (req, res, next) => {
  const { packagesData } = req.body;
  try {
    const newPackage = await createAndUpdateTrackingHistory(packagesData);
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
  const { id } = req.params;
  try {
    const packageData = await getPackageById(id);
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
