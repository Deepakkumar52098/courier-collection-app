import { Box, Button } from "@mui/material";

const FooterButtons = ({
  activeStep,
  handlePrevious,
  handleNext,
  handleSubmit,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mt: 5,
      }}
    >
      <Box>
        {activeStep > 1 && (
          <Button
            variant="outlined"
            onClick={handlePrevious}
            sx={{
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "10px",
            }}
          >
            Previous
          </Button>
        )}
      </Box>

      <Box>
        {activeStep < 5 ? (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "10px",
              fontWeight: 600,
            }}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: "10px",
              fontWeight: 600,
            }}
          >
            Create Courier
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default FooterButtons;
