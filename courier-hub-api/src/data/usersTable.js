import pool from "../config/db.js";

const usersTable = async () => {
  const queryText = `
        CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email_id VARCHAR(100) UNIQUE NOT NULL,
        password TEXT,
        role VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
        `;

  try {
    await pool.query(queryText);
  } catch (err) {
    console.error(err.message);
  }
};

export default usersTable;
