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
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../../store/slices/packageSlice";
import { API_CONSTANTS } from "../../api/API_CONSTANTS";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CustomPagination from "../common/CustomPagination";

const PackageDetails = () => {
  const dispatch = useDispatch();

  const { allPackages } = useSelector((state) => state.packageDetails);
  const paginationData = allPackages?.data?.pagination;

  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);

  const ROWS_PER_PAGE = 10;
  const totalPages = Math.ceil(
    Number(paginationData?.totalRows) / ROWS_PER_PAGE,
  );

  console.log(paginationData);

  useEffect(() => {
    dispatch(
      fetchPackages({
        method: API_CONSTANTS.GET_PACKAGES,
        body: {
          limit: ROWS_PER_PAGE,
          offset: 0,
        },
      }),
    );
  }, [dispatch]);

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

  const handlePageChange = (event, pageNumber) => {
    setPage(pageNumber);
    setPageInput(pageNumber);
    dispatch(
      fetchPackages({
        method: API_CONSTANTS.GET_PACKAGES,
        body: {
          limit: ROWS_PER_PAGE,
          offset: (pageNumber - 1) * ROWS_PER_PAGE,
        },
      }),
    );
  };

  const handleGoToPageEnter = (event) => {
    if (event.key !== "Enter") return;
    if (pageInput >= 1 && pageInput <= totalPages) {
      setPage(pageInput);
      dispatch(
        fetchPackages({
          method: API_CONSTANTS.GET_PACKAGES,
          body: {
            limit: ROWS_PER_PAGE,
            offset: (pageInput - 1) * ROWS_PER_PAGE,
          },
        }),
      );
    } else {
      setPageInput(page);
    }
  };

  const handleGoToPageChange = (event) => {
    const pageNumber =
      event.target.value === "" ? "" : Number(event.target.value);
    setPageInput(pageNumber);
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
                <TableCell colSpan={9} align="center">
                  Package Details
                </TableCell>
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
              {allPackages?.data?.packagesList?.map((data) => (
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
          <CustomPagination
            page={page}
            pageInput={pageInput}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            handleGoToPageChange={handleGoToPageChange}
            handleGoToPageEnter={handleGoToPageEnter}
          />
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default PackageDetails;
