import pool from "../config/db.js";

export const createPackages = async (packagesData, packageId, trackingId) => {
  const {
    senderName,
    senderPhoneNumber,
    senderAddress,
    receiverName,
    receiverPhoneNumber,
    receiverAddress,
    weight,
    currentRegion,
  } = packagesData;

  const result = await pool.query(
    `INSERT INTO packages (
    id,
    tracking_id,
    sender_name,
    sender_phone_number,
    sender_address,
    receiver_name,
    receiver_phone_number,
    receiver_address,
    weight,
    current_region
  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
  RETURNING *`,
    [
      packageId,
      trackingId,
      senderName,
      senderPhoneNumber,
      senderAddress,
      receiverName,
      receiverPhoneNumber,
      receiverAddress,
      weight,
      currentRegion,
    ],
  );
  return result.rows[0];
};

export const getAllPackages = async () => {
  const result = await pool.query("SELECT * FROM packages");
  return result.rows;
};

export const getPackageById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM packages WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
