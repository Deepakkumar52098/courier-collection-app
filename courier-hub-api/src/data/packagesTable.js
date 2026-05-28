import pool from "../config/db.js";

const packagesTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS packages (

    id UUID PRIMARY KEY,
    tracking_id UUID UNIQUE NOT NULL,
    sender_name VARCHAR(100) NOT NULL,
    sender_phone VARCHAR(15) NOT NULL,
    sender_address TEXT NOT NULL,
    sender_city VARCHAR(100) NOT NULL,
    sender_state VARCHAR(100) NOT NULL,
    sender_pincode VARCHAR(10) NOT NULL,
    receiver_name VARCHAR(100) NOT NULL,
    receiver_phone VARCHAR(15) NOT NULL,
    receiver_address TEXT NOT NULL,
    receiver_city VARCHAR(100) NOT NULL,
    receiver_state VARCHAR(100) NOT NULL,
    receiver_pincode VARCHAR(10) NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    region VARCHAR(50) NOT NULL,
    package_type VARCHAR(50) NOT NULL,
    current_status VARCHAR(50) NOT NULL DEFAULT 'TO_BE_PICKED_UP',
    bag_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `;

  await pool.query(query);
};

export default packagesTable;
