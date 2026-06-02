import { Box, Typography } from "@mui/material";

const FormHeader = ({ activeStep }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#1976d2",
        }}
      >
        Create Courier
      </Typography>

      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 500,
          color: "#64748b",
        }}
      >
        Step {activeStep} of 5
      </Typography>
    </Box>
  );
};

export default FormHeader;
