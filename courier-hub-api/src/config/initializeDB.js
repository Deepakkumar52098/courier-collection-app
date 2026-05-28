import usersTable from "../data/usersTable.js";
import packagesTable from "../data/packagesTable.js";
import createPackageStatusEnum from "../data/packageStatusEnum.js";
import pool from "./db.js";
import trackingHistoryTable from "../data/trackingHistoryTable.js";

const initializeDB = async () => {
  try {
    // await pool.query(`DROP TABLE IF EXISTS tracking_history`);
    // await pool.query(`DROP TABLE IF EXISTS packages`);
    // await pool.query(`DROP TABLE IF EXISTS users`);

    // await createPackageStatusEnum();

    await usersTable();

    await packagesTable();

    await trackingHistoryTable();


    // await createPackageHistoryTable();
  } catch (error) {
    console.error("Database initialization failed");
    console.error(error.message);

    throw error;
  }
};

export default initializeDB;
