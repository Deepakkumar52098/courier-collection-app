import { Box, Typography } from "@mui/material";

const TableHeaders = ({ title, actionName, showAction = true }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      {showAction && (
        <Typography
          sx={{
            color: "#1976d2",
            fontWeight: 600,
            fontStyle: "italic",
            fontSize: "12px",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
        >
          {actionName}
        </Typography>
      )}
    </Box>
  );
};

export default TableHeaders;
