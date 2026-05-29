import { useEffect, useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrackingHistory,
  resetTrackingHistory,
} from "../../store/slices/trackingHistorySlice";
import { API_CONSTANTS } from "../../api/API_CONSTANTS";
import TrackingTimeline from "./TrackingTimeline";

const TrackPackages = () => {
  const [trackingId, setTrackingId] = useState(null);
  const trackingData = useSelector(
    (state) => state.trackingHistory?.trackingData,
  );

  const dispatch = useDispatch();

  console.log("trackingData", trackingData);

  useEffect(() => {
    return () => {
      dispatch(resetTrackingHistory());
    };
  }, [dispatch]);

  const handleTrackPackage = () => {
    if (!trackingId) {
      alert("Please enter Tracking ID");
      return;
    }

    dispatch(
      getTrackingHistory({
        method: API_CONSTANTS.TRACKING_HISTORY,
        trackingId,
      }),
    );
  };

  return (
    <Box>
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
      {trackingData?.data?.history?.length > 0 && (
        <TrackingTimeline trackingData={trackingData?.data} />
      )}
    </Box>
  );
};

export default TrackPackages;
