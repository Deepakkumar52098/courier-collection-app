import { Box, Paper, Typography } from "@mui/material";
import { allFields } from "./courierDetailUtils";

const DetailRow = ({ label, value }) => (
  <Typography>
    <Box
      component="span"
      sx={{
        fontWeight: 600,
        color: "text.primary",
      }}
    >
      {label}:
    </Box>{" "}
    <Box
      component="span"
      sx={{
        color: "text.secondary",
      }}
    >
      {value}
    </Box>
  </Typography>
);

const PreviewDetails = ({ formData }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        Preview Details
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 4,
        }}
      >
        {allFields?.map((section) => (
          <Paper key={section.title} elevation={3} sx={{ borderRadius: 3 }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 600,
                m: 2,
                textAlign: "center",
              }}
            >
              {section?.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "baseline",
                margin: 2,
              }}
            >
              {section?.fields?.map((field) =>
                field?.key === "sameAsSenderAddress" ? null : (
                  <DetailRow label={field.label} value={formData[field.key]} />
                ),
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default PreviewDetails;
