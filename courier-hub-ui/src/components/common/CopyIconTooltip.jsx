import { Box, Tooltip, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyIconTooltip = ({ trackingId }) => {
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
        <Typography variant="body2">{trackingId?.slice(0, 10)}...</Typography>
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
