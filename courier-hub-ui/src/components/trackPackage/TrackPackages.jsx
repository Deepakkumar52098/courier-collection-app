import { useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
// import { useDispatch } from "react-redux";

const TrackPackages = () => {
  const [trackingId, setTrackingId] = useState(null);

  // const dispatch = useDispatch()

  const handleTrackPackage = () => {
    if (!trackingId) {
      alert("Please enter Tracking ID");
      return;
    }

    // dispatch()
  };

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 450,
        margin: "auto",
        padding: 4,
        borderRadius: 3,
      }}
    >
      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Tracking ID"
          variant="outlined"
          fullWidth
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />

        <Button
          variant="contained"
          size="large"
          onClick={handleTrackPackage}
          sx={{ marginTop: "8px" }}
        >
          Track Package
        </Button>
      </Box>
    </Paper>
  );
};

export default TrackPackages;
