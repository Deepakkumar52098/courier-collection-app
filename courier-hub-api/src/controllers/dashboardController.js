import { getDashboardDetailsByStatus } from "../models/packagesModel.js";

const getCountByStatus = (countsResult) => {
  const counts = countsResult.reduce((acc, row) => {
    acc[row.current_status] = Number(row.count);
    return acc;
  }, {});

  const activeDeliveries = Object.entries(counts)
    .filter(([status]) => !["TO_BE_PICKED_UP", "DELIVERED"].includes(status))
    .reduce((sum, [, count]) => sum + count, 0);

  return [
    { title: "Pending Pickup", count: counts.TO_BE_PICKED_UP || 0 },
    { title: "In Transit", count: activeDeliveries },
    { title: "Delayed Packages", count: 10 },
    { title: "Out For Delivery", count: counts.OUT_FOR_DELIVERY || 0 },
    { title: "Delivered Today", count: counts.DELIVERED || 0 },
  ];
};

export const getDashboardDetails = async (req, res, next) => {
  const { countsResult, recentlyCreated, activeDeliveries, delivered } =
    await getDashboardDetailsByStatus();
  const counts = getCountByStatus(countsResult);
  return res.status(200).json({
    status: 200,
    data: {
      counts,
      recentlyCreated,
      activeDeliveries,
      delivered,
    },
    message: "Dashboard data fetched successfully.",
  });
};
