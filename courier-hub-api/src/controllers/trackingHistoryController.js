import {
  getPackageById,
  getPackageByTrackingId,
} from "../models/packagesModel.js";
import { getTrackingHistoryByPackageId } from "../models/trackingHistoryModel.js";

export const updateTrackingHistory = async (req, res, next) => {};

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
