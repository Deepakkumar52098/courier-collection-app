import pool from "../config/db.js";

const trackingHistoryTable = async () => {
  const queryText = `
        CREATE TABLE IF NOT EXISTS tracking_history (
        id UUID PRIMARY KEY,
        package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
        status VARCHAR(50) NOT NULL,
        current_region VARCHAR(100),
        remarks TEXT,
        bag_id VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
        `;

  try {
    await pool.query(queryText);
  } catch (err) {
    console.error(err.message);
  }
};

export default trackingHistoryTable;
