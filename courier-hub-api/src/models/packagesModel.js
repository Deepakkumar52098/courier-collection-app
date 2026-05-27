import pool from "../config/db.js";

export const createPackages = async (packagesData, packageId, trackingId) => {
  const {
    senderName,
    senderPhone,
    senderAddress,
    senderState,
    senderCity,
    senderPincode,
    receiverName,
    receiverPhone,
    receiverAddress,
    receiverState,
    receiverCity,
    receiverPincode,
    weight,
    region,
    packageType,
  } = packagesData;

  const result = await pool.query(
    `INSERT INTO packages (
    id,
    tracking_id,
    sender_name,
    sender_phone,
    sender_address,
    sender_state,
    sender_city,
    sender_pincode,
    receiver_name,
    receiver_phone,
    receiver_address,
    receiver_state,
    receiver_city,
    receiver_pincode,
    weight,
    region,
    package_type
  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
  RETURNING *`,
    [
      packageId,
      trackingId,
      senderName,
      senderPhone,
      senderAddress,
      senderState,
      senderCity,
      senderPincode,
      receiverName,
      receiverPhone,
      receiverAddress,
      receiverState,
      receiverCity,
      receiverPincode,
      weight,
      region,
      packageType
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
