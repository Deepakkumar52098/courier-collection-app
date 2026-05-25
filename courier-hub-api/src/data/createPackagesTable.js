import pool from "../config/db.js";

const createPackagesTable = async () => {
const query = `
  CREATE TABLE IF NOT EXISTS packages (

    id UUID PRIMARY KEY,

    tracking_id UUID UNIQUE NOT NULL,

    sender_name VARCHAR(100) NOT NULL,
    sender_phone_number VARCHAR(20),
    sender_address TEXT NOT NULL,

    receiver_name VARCHAR(100) NOT NULL,
    receiver_phone_number VARCHAR(20),
    receiver_address TEXT NOT NULL,

    weight DECIMAL(10,2) NOT NULL,

    current_status package_status NOT NULL DEFAULT 'TO_BE_PICKED_UP',

    current_region VARCHAR(100),

    bag_id VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `;

  await pool.query(query);
};

export default createPackagesTable;
