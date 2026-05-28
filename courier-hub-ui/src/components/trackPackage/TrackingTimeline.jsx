import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

const steps = [
  "TO_BE_PICKED_UP",
  "PICKED_UP",
  "ADDED_TO_BAG",
  "EN_ROUTE",
  "ARRIVED",
  "SCHEDULED_FOR_DELIVERY",
  "OUT_FOR_DELIVERY",
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

  const currentStepIndex = steps.findIndex(
    (step) => step === packageData?.status,
  );

  return (
    <Card
      elevation={3}
      sx={{
        mt: 4,
        borderRadius: 3,
      }}
    >
      {" "}
      <CardContent>
        {" "}
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Package Tracking{" "}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        {/* Package Details */}
        <Box mb={4}>
          <Typography variant="body1">
            <strong>Tracking ID:</strong> {packageData?.trackingId}
          </Typography>

          <Typography variant="body1">
            <strong>From:</strong> {packageData?.senderCity}
          </Typography>

          <Typography variant="body1">
            <strong>To:</strong> {packageData?.receiverCity}
          </Typography>

          <Typography variant="body1">
            <strong>Weight:</strong> {packageData?.weight} KG
          </Typography>

          <Typography variant="body1">
            <strong>Last Updated:</strong>{" "}
            {new Date(packageData?.updatedAt).toLocaleString()}
          </Typography>

          <Box mt={2}>
            <Chip label={formatStepLabel(packageData?.status)} color="primary" />
          </Box>
        </Box>
        {/* Stepper */}
        <Stepper activeStep={currentStepIndex} alternativeLabel>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{formatStepLabel(step)}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* History Timeline */}
        <Box mt={5}>
          <Typography variant="h6" gutterBottom>
            Tracking History
          </Typography>

          {history?.map((item) => (
            <Box
              key={item.id}
              sx={{
                borderLeft: "3px solid #1976d2",
                pl: 2,
                py: 1,
                mb: 2,
              }}
            >
              <Typography fontWeight={600}>
                {formatStepLabel(item.status)}
              </Typography>

              <Typography variant="body2">
                Region: {item.current_region}
              </Typography>

              {item.bag_id && (
                <Typography variant="body2">Bag ID: {item.bag_id}</Typography>
              )}

              <Typography variant="body2">{item.remarks}</Typography>

              <Typography variant="caption" color="text.secondary">
                {new Date(item.created_at).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrackingTimeline;
