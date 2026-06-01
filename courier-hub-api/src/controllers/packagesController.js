import { v4 as uuidv4 } from "uuid";
import {
  createPackages,
  getAllPackages,
  getPackageById,
  getPackageByTrackingId,
} from "../models/packagesModel.js";

import pool from "../config/db.js";

import { createTrackingHistory } from "../models/trackingHistoryModel.js";
import {
  addBillingInfoDetails,
  getBillingInfoByPackageId,
} from "../models/billingInfoModel.js";

export const createAndUpdateTrackingHistory = async (
  packagesData,
  billingDetails,
) => {
  const client = await pool.connect();
  const packageId = uuidv4();
  const trackingId = uuidv4();
  const trackingHistoryId = uuidv4();
  const billingInfoId = uuidv4();

  try {
    await client.query("BEGIN");
    // Create package
    const newPackage = await createPackages(
      client,
      packagesData,
      packageId,
      trackingId,
    );

    const result = await addBillingInfoDetails(
      client,
      billingDetails,
      billingInfoId,
      packageId,
    );

    console.log(result);

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
  const { packagesData, billingDetails } = req.body;
  try {
    const newPackage = await createAndUpdateTrackingHistory(
      packagesData,
      billingDetails,
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
  const { limit = 10, offset = 0 } = req.body;
  try {
    const { packagesData, totalCount } = await getAllPackages(limit, offset);
    if (!packagesData) {
      return res.status(500).json({
        status: 500,
        message: "Failed to fetch packages detail.",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "All packages fetched successfuly",
      data: {
        packagesList: packagesData,
        pagination: {
          totalRows: totalCount,
          limit,
          offset,
        },
      },
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
