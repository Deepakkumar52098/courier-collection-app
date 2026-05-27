import createUserTable from "../data/createUserTable.js";
import createPackagesTable from "../data/createPackagesTable.js";
import createPackageStatusEnum from "../data/packageStatusEnum.js";
import pool from "./db.js";

const initializeDB = async () => {
  try {
    // await pool.query(`DROP TABLE IF EXISTS packages`);
    // await pool.query(`DROP TABLE IF EXISTS users`);

    // await createPackageStatusEnum();

    await createUserTable();

    await createPackagesTable();

    // await createPackageHistoryTable();
  } catch (error) {
    console.error("Database initialization failed");
    console.error(error.message);

    throw error;
  }
};

export default initializeDB;
