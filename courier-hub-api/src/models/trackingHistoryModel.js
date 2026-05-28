import pool from "../config/db.js";

export const createTrackingHistory = async (
  client,
  id,
  packageId,
  status,
  region,
  remarks,
) => {
  const result = await client.query(
    `INSERT INTO tracking_history (
      id,
      package_id,
      status,
      current_region,
      remarks
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [id, packageId, status, region, remarks],
  );

  return result.rows[0];
};

export const getTrackingHistoryByPackageId = async (id) => {
  const result = await pool.query(
    "SELECT * FROM tracking_history WHERE package_id = $1 ORDER BY created_at ASC",
    [id],
  );
  return result.rows;
};

export const updateTrackingHistoryById = async (id, status, location) => {
  const result = await pool.query(
    "UPDATE tracking_history SET status=$1 , location=$2 WHERE id = $3 RETURNING *",
    [status, location, id],
  );
  return result.rows[0];
};
