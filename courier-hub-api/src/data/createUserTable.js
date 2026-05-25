import pool from "../config/db.js";

const createUserTable = async () => {
  const queryText = `
        CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        emailId VARCHAR(100) UNIQUE NOT NULL,
        password TEXT,
        role VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW()
      )
        `;

  try {
    await pool.query(queryText);
  } catch (err) {
    console.error(err.message);
  }
};

export default createUserTable;
