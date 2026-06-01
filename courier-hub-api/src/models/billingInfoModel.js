import pool from "../config/db.js";

export const addBillingInfoDetails = async (
  client,
  billingDetails,
  id,
  packageId,
) => {
  const {
    billingName,
    billingAddress,
    paymentMode,
    shippingCharges,
    packageCharges,
    totalAmount,
  } = billingDetails;
  const result = await client.query(
    `INSERT INTO billingInfo (
        id,
        package_id,
        billing_name,
        billing_address,
        payment_mode, 
        shipping_charges,
        package_charges,
        total_amount
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      id,
      packageId,
      billingName,
      billingAddress,
      paymentMode,
      shippingCharges,
      packageCharges,
      totalAmount,
    ],
  );
  return result.rows[0];
};

export const getBillingInfoByPackageId = async (packageId) => {
  const result = await pool.query(
    "SELECT * FROM billingInfo WHERE package_id = $1",
    [packageId],
  );
  return result.rows[0];
};
