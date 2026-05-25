const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const initializeDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        emailId VARCHAR(100),
        password TEXT,
        role VARCHAR(100)
      )
    `);

    const result = await pool.query("SELECT * FROM users");

    if (result.rows.length === 0) {
      await pool.query(
        `
        INSERT INTO users(name, emailId, password, role)
        VALUES ($1, $2, $3, $4)
      `,
        ["Test", "test@gmail.com", "test", "executive"],
      );
    }

    console.log("Database initialized");
  } catch (err) {
    console.error(err);
  }
};

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Database error",
    });
  }
});

initializeDb().then(() => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
