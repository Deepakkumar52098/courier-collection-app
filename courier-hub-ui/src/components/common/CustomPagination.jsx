import { Box, Pagination, TextField } from "@mui/material";

const CustomPagination = ({
  page,
  pageInput,
  totalPages,
  handlePageChange,
  handleGoToPageChange,
  handleGoToPageEnter,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px",
        width: '100%',
        marginTop: '8px'
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        boundaryCount={2}
        onChange={handlePageChange}
      />

      <TextField
        type="number"
        label="Go to page"
        size="small"
        value={pageInput}
        onChange={handleGoToPageChange}
        onKeyDown={handleGoToPageEnter}
        sx={{ width: 120 }}
      />
    </Box>
  );
};

export default CustomPagination;
