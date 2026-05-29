import {
  Box,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../../store/slices/packageSlice";
import { API_CONSTANTS } from "../../api/API_CONSTANTS";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const PackageDetails = () => {
  const dispatch = useDispatch();

  const { allPackages } = useSelector((state) => state.packageDetails);

  console.log(allPackages);

  useEffect(() => {
    dispatch(
      fetchPackages({
        method: API_CONSTANTS.GET_PACKAGES,
      }),
    );
  }, []);

  const handleDelete = () => {
    //delete logic
  };

  const getDate = (date) => {
    if (date === "Total") {
      return date;
    }
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Grid
      item
      container
      sx={{
        p: 2,
      }}
    >
      <Grid item container size={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#1976d2",
                }}
              >
                <TableCell colSpan={9} align="center">Package Details</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  backgroundColor: "lightBlue",
                }}
              >
                <TableCell>Tracking ID</TableCell>
                <TableCell>Sender</TableCell>
                <TableCell>Receiver</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Weight (kg)</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allPackages?.data?.map((data) => (
                <TableRow
                  key={data._id}
                  sx={{
                    backgroundColor: data._id === "Total" ? "lightGreen" : null,
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Tooltip title={data?.tracking_id} arrow>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          cursor: "pointer",
                        }}
                      >
                        <Typography variant="body2">
                          {data?.tracking_id?.slice(0, 5)}...
                        </Typography>

                        <ContentCopyIcon
                          fontSize="small"
                          onClick={() => {
                            navigator.clipboard.writeText(data?.tracking_id);
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
                  </TableCell>
                  <TableCell>{data?.sender_name}</TableCell>
                  <TableCell>{data?.receiver_name}</TableCell>
                  <TableCell>{data?.sender_state}</TableCell>
                  <TableCell>{data?.receiver_state}</TableCell>
                  <TableCell>{data?.weight}</TableCell>
                  <TableCell>{data?.current_status}</TableCell>
                  <TableCell>{getDate(data?.created_at)}</TableCell>
                  <TableCell align="center">
                    {data?._id === "Total" ? null : (
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          gap: 1,
                          backgroundColor: "transparent",
                        }}
                      >
                        <IconButton sx={{ p: 0 }}>
                          <DeleteIcon onClick={(e) => handleDelete(e, data)} />
                        </IconButton>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default PackageDetails;
