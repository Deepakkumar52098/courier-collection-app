import pool from "../config/db.js";

export const createPackages = async (
  client,
  packagesData,
  packageId,
  trackingId,
) => {
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

  const result = await client.query(
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
      packageType,
    ],
  );
  return result.rows[0];
};

export const getAllPackages = async (limit, offset) => {
  const [data, count] = await Promise.all([
    pool.query(
      "SELECT * FROM packages ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset],
    ),
    pool.query("SELECT COUNT(*) AS total FROM packages"),
  ]);
  return {
    totalCount: count.rows[0].total,
    packagesData: data.rows,
  };
};

export const getPackageById = async (id) => {
  const result = await pool.query("SELECT * FROM packages WHERE id = $1", [id]);
  return result.rows[0];
};

export const getPackageByTrackingId = async (id) => {
  const result = await pool.query(
    "SELECT * FROM packages WHERE tracking_id = $1",
    [id],
  );
  return result.rows[0];
};

export const updatePackageStatus = async (
  client,
  id,
  status,
  region,
  bagId,
) => {
  const result = await client.query(
    "UPDATE packages SET current_status=$1, region=$2, bag_id=$3, updated_at = CURRENT_TIMESTAMP WHERE tracking_id=$4 RETURNING *",
    [status, region, bagId, id],
  );
  return result.rows[0];
};
