/* eslint-disable react-hooks/set-state-in-effect */
import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import FormSection from "../common/FormSection";
import {
  billingFields,
  initialData,
  packageFields,
  receiverFields,
  senderFields,
} from "./courierDetailUtils";
import { useDispatch, useSelector } from "react-redux";
import { createPackage } from "../../store/slices/packageSlice";
import { API_CONSTANTS } from "../../api/API_CONSTANTS";
import TransactionRecipt from "./TransactionRecipt";

const CourierDetailsForm = () => {
  const [activeStep, setActiveStep] = useState(1);

  const { createPackageData } = useSelector((state) => state.packageDetails);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    const weight = Number(formData.weight);

    let packageCharges = 0;

    if (weight <= 1) {
      packageCharges = 50;
    } else if (weight <= 5) {
      packageCharges = 100;
    } else if (weight > 5) {
      packageCharges = 200;
    }

    const totalAmount = Number(formData.shippingCharges) + packageCharges;

    setFormData((prev) => ({
      ...prev,
      packageCharges,
      totalAmount,
    }));
  }, [formData.weight, formData.shippingCharges]);

  const handleChange = (key, value) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [key]: value,
      };

      if (key === "sameAsSenderAddress") {
        updatedData.billingAddress = value ? prev.senderAddress : "";
      }

      if (key === "senderAddress" && prev.sameAsSenderAddress) {
        updatedData.billingAddress = value;
      }

      return updatedData;
    });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const {
      billingName,
      billingAddress,
      sameAsSenderAddress,
      paymentMode,
      shippingCharges,
      packageCharges,
      totalAmount,
      ...packagesData
    } = formData;

    const billingDetails = {
      billingName,
      billingAddress,
      sameAsSenderAddress,
      paymentMode,
      shippingCharges,
      packageCharges,
      totalAmount,
    };

    dispatch(
      createPackage({
        method: API_CONSTANTS.CREATE_COURIER,
        body: {
          packagesData,
          billingDetails,
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

      case 4: {
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

            {/* Charges Summary */}

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
                <Typography>
                  Shipping Charges: ₹{formData.shippingCharges}
                </Typography>

                <Typography>
                  Package Charges: ₹{formData.packageCharges}
                </Typography>

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
      }
      case 5:
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
                scrollbarWidth: "thin",
                scrollbarColor: "#1976d2 transparent",

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

                "&::-webkit-scrollbar-button": {
                  display: "none",
                  width: 0,
                  height: 0,
                },
              }}
            >
              {/* Sender */}
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

              {/* Receiver */}
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

              {/* Package */}
              <Box sx={{ mb: 4 }}>
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
                  <Typography>Weight: {formData.weight} kg</Typography>

                  <Typography>Region: {formData.region}</Typography>

                  <Typography>Package Type: {formData.packageType}</Typography>
                </Box>
              </Box>

              {/* Billing */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Billing Details
                </Typography>

                <Box sx={{ display: "grid", gap: 1 }}>
                  <Typography>Billing Name: {formData.billingName}</Typography>

                  <Typography>
                    Billing Address: {formData.billingAddress}
                  </Typography>

                  <Typography>Payment Mode: {formData.paymentMode}</Typography>

                  <Typography>
                    Shipping Charges: ₹{formData.shippingCharges}
                  </Typography>

                  <Typography>
                    Package Charges: ₹{formData.packageCharges}
                  </Typography>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "18px",
                    }}
                  >
                    Total Amount: ₹{formData.totalAmount}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  console.log("createPackageData", createPackageData);

  return Object.keys(createPackageData?.data || {}).length > 0 ? (
    <TransactionRecipt
      dispatch={dispatch}
      packageData={createPackageData?.data}
      setActiveStep={setActiveStep}
      setFormData={setFormData}
    />
  ) : (
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
          Step {activeStep} of 5
        </Typography>
      </Box>

      {renderStepContent()}

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
          {activeStep < 5 ? (
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
