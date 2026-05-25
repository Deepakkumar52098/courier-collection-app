import pool from "../config/db.js";

export const createUser = async (id, name, emailId, password, role) => {
  const result = await pool.query(
    "INSERT INTO users (id, name, emailId, password, role) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [id, name, emailId, password, role],
  );
  return result.rows[0];
};

export const getUser = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateUser = async (name, emailId, role, id) => {
  const result = await pool.query(
    "UPDATE users SET name=$1, emailId=$2, role=$3 WHERE id=$4 RETURNING *",
    [name, emailId, role, id],
  );
  return result.rows[0];
};

export const deleteUser = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};

export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
