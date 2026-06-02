import { Box, Paper, Typography } from "@mui/material";
import FormSection from "../common/FormSection";
import { billingFields } from "./courierDetailUtils";

const BillingDetails = ({ formData, handleChange }) => {
  const updatedBillingFields = billingFields.map((field) => {
    if (field.key === "billingAddress") {
      return {
        ...field,
        disabled: formData.sameAsSenderAddress,
      };
    }

    return field;
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <FormSection
        title="Billing Details"
        fields={updatedBillingFields}
        formData={formData}
        onChange={handleChange}
      />
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            mb: 2,
          }}
        >
          Charges Summary
        </Typography>

        <Box sx={{ display: "grid", gap: 1 }}>
          <Typography>Shipping Charges: ₹{formData.shippingCharges}</Typography>

          <Typography>Package Charges: ₹{formData.packageCharges}</Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            Total Amount: ₹{formData.totalAmount}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default BillingDetails;
