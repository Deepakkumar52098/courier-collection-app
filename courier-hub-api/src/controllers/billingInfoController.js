import { getBillingInfoByPackageId } from "../models/billingInfoModel.js";
import { getPackageByTrackingId } from "../models/packagesModel.js";

export const getBillingInfoService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const packageDetails = await getPackageByTrackingId(id);
    const billingInfo = await getBillingInfoByPackageId(packageDetails.id);
    return res.status(200).json({
      status: 200,
      data: billingInfo || [],
      message: "BillingInfo details fetched successfully.",
    });
  } catch (err) {
    next(err);
  }
};