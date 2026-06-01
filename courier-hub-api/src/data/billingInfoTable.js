import pool from "../config/db.js";

const billingInfoTable = async () => {
  const queryText = `
        CREATE TABLE IF NOT EXISTS billingInfo (
        id UUID PRIMARY KEY,
        package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
        billing_name VARCHAR(50) NOT NULL,
        billing_address VARCHAR(100) NOT NULL,
        payment_mode VARCHAR(20) NOT NULL,
        shipping_charges DECIMAL(10,2) NOT NULL,
        package_charges DECIMAL(10,2) NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
        `;

  try {
    await pool.query(queryText);
  } catch (err) {
    console.error(err.message);
  }
};

export default billingInfoTable;
