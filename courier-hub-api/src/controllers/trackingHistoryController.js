import pool from "../config/db.js";
import {
  getPackageByTrackingId,
  updatePackageStatus,
} from "../models/packagesModel.js";
import {
  createTrackingHistory,
  getTrackingHistoryByPackageId,
} from "../models/trackingHistoryModel.js";
import { v4 as uuidv4 } from "uuid";

const updateTrackingHistoryAndPackage = async (tracking_id, body) => {
  const client = await pool.connect();
  const id = uuidv4();
  const { status, region, remarks, bagId = null } = body;
  try {
    await client.query("BEGIN");
    const updatedPackage = await updatePackageStatus(
      client,
      tracking_id,
      status,
      region,
      bagId,
    );
    if (!updatedPackage) {
      throw new Error("Package not found");
    }
    await createTrackingHistory(
      client,
      id,
      updatedPackage.id,
      status,
      region,
      remarks,
    );
    await client.query("COMMIT");
    return updatedPackage;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const updateTrackingHistory = async (req, res, next) => {
  const { tracking_id } = req.params;
  try {
    if (!tracking_id) {
      return res.status(400).json({
        status: 400,
        message: "Tracking ID is required",
      });
    }
    const updatedPackage = await updateTrackingHistoryAndPackage(
      tracking_id,
      req.body,
    );
    if (!updatedPackage) {
      return res.status(400).json({
        status: 400,
        message: "Tracking history update failed.",
      });
    }
    return res.status(200).json({
      status: 200,
      data: updatedPackage,
      message: "Tracking history updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export const getTrackingHistoryById = async (req, res, next) => {
  const { tracking_id } = req.params;

  try {
    if (!tracking_id) {
      return res.status(400).json({
        status: 400,
        message: "Tracking ID is required",
      });
    }

    const packageData = await getPackageByTrackingId(tracking_id);

    if (!packageData) {
      return res.status(404).json({
        status: 404,
        message: "Package not found",
      });
    }

    const trackingHistory = await getTrackingHistoryByPackageId(packageData.id);

    const response = {
      package: {
        trackingId: packageData.tracking_id,
        status: packageData.current_status,
        weight: packageData.weight,
        senderCity: packageData.sender_city,
        receiverCity: packageData.receiver_city,
        updatedAt: packageData.updated_at,
      },
      history: trackingHistory || [],
    };

    return res.status(200).json({
      status: 200,
      message: "Tracking history fetched successfully",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
