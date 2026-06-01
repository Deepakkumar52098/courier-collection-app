import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CopyIconTooltip from "./CopyIconTooltip";
import { getFormattedDate } from "./utils";

const DashboardTable = ({ columsToBeMapped, tableData }) => {
  const showData = (keyName, data) => {
    if (keyName === "tracking_id") {
      return <CopyIconTooltip trackingId={data[keyName]} />;
    }
    if (["updated_at", "created_at"].includes(keyName)) {
      return getFormattedDate(data[keyName]);
    }
    return data[keyName];
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#1976d2",
            }}
          >
            {Object.values(columsToBeMapped)?.map((header) => (
              <TableCell sx={{ p: 1, fontWeight: 600 }} key={header}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((data) => (
            <TableRow key={data?.tracking_id}>
              {Object.keys(columsToBeMapped)?.map((keyName) => (
                <TableCell sx={{ p: 1 }} key={keyName}>
                  {showData(keyName, data)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DashboardTable;
