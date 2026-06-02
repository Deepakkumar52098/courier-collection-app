import { Box, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyIconTooltip = ({ trackingId, trimTrackingId = true }) => {
  const getTrackingId = () => {
    return trimTrackingId ? `${trackingId?.slice(0, 10)}...` : trackingId;
  };
  return (
    <Tooltip title={trackingId} arrow>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
      >
        <Typography variant="body2">{getTrackingId()}</Typography>
        <ContentCopyIcon
          fontSize="small"
          onClick={() => {
            navigator.clipboard.writeText(trackingId);
          }}
          sx={{
            fontSize: 16,
            "&:hover": {
              cursor: "pointer",
              color: "#1976d2",
            },
          }}
        />
      </Box>
    </Tooltip>
  );
};

export default CopyIconTooltip;
