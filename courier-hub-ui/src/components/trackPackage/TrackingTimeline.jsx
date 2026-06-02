import {
  Box,
  Card,
  CardContent,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CopyIconTooltip from "../common/CopyIconTooltip";
import { getFormattedDate } from "../common/utils";

const steps = [
  "TO_BE_PICKED_UP",
  "PICKED_UP",
  "ADDED_TO_BAG",
  "EN_ROUTE_TO_REGION",
  "ARRIVED_AT_REGION",
  "SCHEDULED_FOR_DELIVERY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const formatStepLabel = (step) => {
  return step
    ?.split("_")
    .map((word) => word[0] + word.slice(1).toLowerCase())
    .join(" ");
};

const TrackingTimeline = ({ trackingData }) => {
  if (!trackingData) return null;

  const { package: packageData, history } = trackingData;

  const message = history[history.length - 1]?.remarks;

  const currentStepIndex = steps.findIndex(
    (step) => step === packageData?.status,
  );

  return (
    <Card
      elevation={3}
      sx={{
        mt: 4,
        borderRadius: 3,
        width: "75%",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          Tracking Information
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
            marginBottom: "16px",
          }}
        >
          <Typography>Tracking ID</Typography>
          <CopyIconTooltip
            trackingId={packageData?.trackingId}
            trimTrackingId={false}
          />
        </Box>
        <Box></Box>
        <Box
          mt={2}
          sx={{
            height: "100px",
            backgroundColor: "#DBEAFE",
            color: "#0369A1",
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: "16px" }}>
            {formatStepLabel(packageData?.status)}
          </Typography>
          <Typography>{message}</Typography>
        </Box>
        <Stepper activeStep={currentStepIndex} alternativeLabel>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{formatStepLabel(step)}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box
          elevation={1}
          sx={{
            width: "40%",
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 8,
              margin: '16px'
            }}
          >
            <Typography>Current Region</Typography>
            <Typography>{packageData?.currentRegion}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 8,
              margin: '16px'
            }}
          >
            <Typography>BAG ID</Typography>
            <Typography>{packageData?.bagId || "BAG-102"}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 8,
              margin: '16px'
            }}
          >
            <Typography>Last Updated</Typography>
            <Typography>{getFormattedDate(packageData?.updatedAt)}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrackingTimeline;
