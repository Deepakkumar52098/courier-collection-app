/* eslint-disable react-hooks/set-state-in-effect */
import { Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import FormSection from "../common/FormSection";
import {
  initialData,
  packageFields,
  receiverFields,
  senderFields,
} from "./courierDetailUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  createPackage,
  resetCreatePackage,
} from "../../store/slices/packageSlice";
import { API_CONSTANTS } from "../../api/API_CONSTANTS";
import TransactionRecipt from "./TransactionRecipt";
import PreviewDetails from "./PreviewDetails";
import FooterButtons from "./FooterButtons";
import FormHeader from "./FormHeader";
import BillingDetails from "./BillingDetails";

const CourierDetailsForm = () => {
  const [activeStep, setActiveStep] = useState(1);

  const { createPackageData } = useSelector((state) => state.packageDetails);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialData);

  const getPackageCharges = useCallback(() => {
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
    return {
      packageCharges,
      totalAmount,
    };
  }, [formData.weight, formData.shippingCharges]);

  useEffect(() => {
    const { packageCharges, totalAmount } = getPackageCharges();

    setFormData((prev) => ({
      ...prev,
      packageCharges,
      totalAmount,
    }));

    return () => {
      dispatch(resetCreatePackage());
    };
  }, [dispatch, getPackageCharges]);

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
        method: API_CONSTANTS.CREATE_COURIER_API,
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

      case 4:
        return (
          <BillingDetails formData={formData} handleChange={handleChange} />
        );
      case 5:
        return <PreviewDetails formData={formData} />;
      default:
        return null;
    }
  };

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
      <FormHeader activeStep={activeStep} />
      {renderStepContent()}
      <FooterButtons
        activeStep={activeStep}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
      />
    </Paper>
  );
};

export default CourierDetailsForm;
