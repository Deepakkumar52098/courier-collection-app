import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import FormSection from "../common/FormSection";
import {
  packageFields,
  receiverFields,
  senderFields,
} from "./courierDetailUtils";
import { useDispatch } from "react-redux";
import { createPackage } from "../../store/slices/packageSlice";
import { API_CONSTANTS } from "../../api/API_CONSTANTS";

const CourierDetailsForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    senderState: "",
    senderCity: "",
    senderPincode: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    receiverState: "",
    receiverCity: "",
    receiverPincode: "",
    weight: "",
    region: "",
    packageType: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    dispatch(
      createPackage({
        method: API_CONSTANTS.CREATE_COURIER,
        body: {
          packagesData: { ...formData },
        },
      }),
    );
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <FormSection
            title="Sender Information"
            fields={senderFields}
            formData={formData}
            onChange={handleChange}
          />
        );

      case 2:
        return (
          <FormSection
            title="Receiver Information"
            fields={receiverFields}
            formData={formData}
            onChange={handleChange}
          />
        );

      case 3:
        return (
          <FormSection
            title="Package Details"
            fields={packageFields}
            formData={formData}
            onChange={handleChange}
          />
        );

      case 4:
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 600,
              }}
            >
              Preview Details
            </Typography>

            <Box
              sx={{
                maxHeight: "500px",
                overflowY: "auto",
                pr: 1,

                /* Firefox */
                scrollbarWidth: "thin",
                scrollbarColor: "#1976d2 transparent",

                /* Chrome, Edge, Safari */
                "&::-webkit-scrollbar": {
                  width: "8px",
                },

                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                },

                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#1976d2",
                  borderRadius: "10px",
                },

                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#1565c0",
                },

                /* Remove scrollbar arrows */
                "&::-webkit-scrollbar-button": {
                  display: "none",
                  width: 0,
                  height: 0,
                },
              }}
            >
              {/* Sender Details */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Sender Information
                </Typography>

                <Box sx={{ display: "grid", gap: 1 }}>
                  <Typography>Name: {formData.senderName}</Typography>

                  <Typography>Phone: {formData.senderPhone}</Typography>

                  <Typography>Address: {formData.senderAddress}</Typography>

                  <Typography>State: {formData.senderState}</Typography>

                  <Typography>City: {formData.senderCity}</Typography>

                  <Typography>Pincode: {formData.senderPincode}</Typography>
                </Box>
              </Box>

              {/* Receiver Details */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Receiver Information
                </Typography>

                <Box sx={{ display: "grid", gap: 1 }}>
                  <Typography>Name: {formData.receiverName}</Typography>

                  <Typography>Phone: {formData.receiverPhone}</Typography>

                  <Typography>Address: {formData.receiverAddress}</Typography>

                  <Typography>State: {formData.receiverState}</Typography>

                  <Typography>City: {formData.receiverCity}</Typography>

                  <Typography>Pincode: {formData.receiverPincode}</Typography>
                </Box>
              </Box>

              {/* Package Details */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Package Details
                </Typography>

                <Box sx={{ display: "grid", gap: 1 }}>
                  <Typography>Weight: {formData.weight}</Typography>

                  <Typography>Region: {formData.region}</Typography>

                  <Typography>Package Type: {formData.packageType}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        minHeight: "100%",
        p: 4,
        borderRadius: 3,
        backgroundColor: "#f8fafc",
        boxSizing: "border-box",
      }}
    >
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
            fontSize: "28px",
            fontWeight: 700,
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
          Step {activeStep} of 4
        </Typography>
      </Box>

      {renderStepContent()}

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 5,
        }}
      >
        <Box>
          {activeStep > 1 && (
            <Button
              variant="outlined"
              onClick={handlePrevious}
              sx={{
                textTransform: "none",
                px: 4,
                py: 1,
                borderRadius: "10px",
              }}
            >
              Previous
            </Button>
          )}
        </Box>

        <Box>
          {activeStep < 4 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{
                textTransform: "none",
                px: 4,
                py: 1,
                borderRadius: "10px",
                fontWeight: 600,
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                textTransform: "none",
                px: 4,
                py: 1,
                borderRadius: "10px",
                fontWeight: 600,
              }}
            >
              Create Courier
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default CourierDetailsForm;
