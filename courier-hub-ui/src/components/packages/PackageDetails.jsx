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
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchPackages } from "../../store/slices/packageSlice";
import { API_CONSTANTS } from "../../api/API_CONSTANTS";
import CustomPagination from "../common/CustomPagination";
import { packagesListDataKeys, packagesListHeader } from "./packagesUtils";
import CopyIconTooltip from "../common/CopyIconTooltip";
import TableHeaders from "../common/TableHeaders";
import { getFormattedDate } from "../common/utils";

const PackageDetails = () => {
  const dispatch = useDispatch();

  const { allPackages } = useSelector((state) => state.packageDetails);
  const paginationData = allPackages?.data?.pagination;

  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);

  const ROWS_PER_PAGE = 20;
  const totalPages = Math.ceil(
    Number(paginationData?.totalRows) / ROWS_PER_PAGE,
  );

  useEffect(() => {
    dispatch(
      fetchPackages({
        method: API_CONSTANTS.GET_PACKAGES_API,
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

  const handlePageChange = (event, pageNumber) => {
    setPage(pageNumber);
    setPageInput(pageNumber);
    dispatch(
      fetchPackages({
        method: API_CONSTANTS.GET_PACKAGES_API,
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
          method: API_CONSTANTS.GET_PACKAGES_API,
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

  const showData = (data, keyName) => {
    if (keyName === "tracking_id") {
      return <CopyIconTooltip trackingId={data[keyName]} />;
    }
    if (keyName === "created_at") {
      return getFormattedDate(data[keyName]);
    }
    if (keyName === "actions") {
      return (
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
      );
    }
    return data[keyName];
  };

  return (
    <Grid item container>
      <Grid item container size={12}>
        <TableHeaders title="Package Details" />
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: "75vh",
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "lightblue",
              borderRadius: 4,
            },
          }}
        >
          <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {packagesListHeader?.map((headerName) => (
                  <TableCell
                    sx={{ fontWeight: 600, backgroundColor: "#1976d2" }}
                    key={headerName}
                  >
                    {headerName}
                  </TableCell>
                ))}
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
                  {packagesListDataKeys?.map((keyName) => (
                    <TableCell key={keyName} sx={{ p: 1 }}>
                      {showData(data, keyName)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <CustomPagination
          page={page}
          pageInput={pageInput}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handleGoToPageChange={handleGoToPageChange}
          handleGoToPageEnter={handleGoToPageEnter}
        />
      </Grid>
    </Grid>
  );
};

export default PackageDetails;
