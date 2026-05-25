import pool from "../config/db.js";

const createPackageStatusEnum = async () => {
  const query = `
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1
        FROM pg_type
        WHERE typname = 'package_status'
      ) THEN

        CREATE TYPE package_status AS ENUM (
          'TO_BE_PICKED_UP',
          'PICKED_UP',
          'ADDED_TO_BAG',
          'EN_ROUTE_TO_REGION',
          'ARRIVED_AT_REGION',
          'SCHEDULED_FOR_DELIVERY',
          'OUT_FOR_DELIVERY',
          'DELIVERED'
        );

      END IF;
    END
    $$;
  `;

  await pool.query(query);

};

export default createPackageStatusEnum;
