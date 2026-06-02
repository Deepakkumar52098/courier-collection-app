import { Box, Button, Chip, Divider, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { resetCreatePackage } from "../../store/slices/packageSlice";
import { initialData } from "./courierDetailUtils";

const TransactionRecipt = ({
  packageData,
  dispatch,
  setActiveStep,
  setFormData,
}) => {
  const {
    tracking_id,
    sender_city,
    receiver_city,
    weight,
    current_status,
    onPrintReceipt = () => {},
  } = packageData;

  const onCreateAnother = () => {
    dispatch(resetCreatePackage());
    setActiveStep(1);
    setFormData(initialData);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        maxWidth: "900px",
        mx: "auto",
        p: 4,
        borderRadius: 4,
        border: "1px solid #e2e8f0",
        backgroundColor: "#f8fafc",
      }}
    >
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#334155",
          mb: 3,
          textTransform: "uppercase",
        }}
      >
        Package Created
      </Typography>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          p: 4,
          border: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 70,
              color: "#22c55e",
            }}
          />
        </Box>
        <Typography
          align="center"
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: "#0f172a",
            mb: 1,
          }}
        >
          Package Created Successfully!
        </Typography>
        <Typography
          align="center"
          sx={{
            fontSize: "13px",
            color: "#64748b",
            mb: 1,
          }}
        >
          Tracking ID
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <Typography
            align="center"
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#16a34a",
              mb: 4,
              wordBreak: "break-word",
            }}
          >
            {tracking_id}
          </Typography>
          <ContentCopyIcon
            fontSize="small"
            onClick={() => {
              navigator.clipboard.writeText(tracking_id);
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: 3,
            mb: 4,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#94a3b8",
                mb: 0.5,
              }}
            >
              From
            </Typography>

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              {sender_city}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#94a3b8",
                mb: 0.5,
              }}
            >
              To
            </Typography>

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              {receiver_city}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#94a3b8",
                mb: 0.5,
              }}
            >
              Weight
            </Typography>

            <Typography
              sx={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#0f172a",
              }}
            >
              {weight} kg
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#94a3b8",
                mb: 0.5,
              }}
            >
              Status
            </Typography>

            <Chip
              label={current_status}
              size="small"
              sx={{
                backgroundColor: "#fff7ed",
                color: "#ea580c",
                fontWeight: 700,
                fontSize: "11px",
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "baseline",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ReceiptLongIcon />}
            onClick={onPrintReceipt}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.2,
              fontWeight: 600,
            }}
          >
            Print Receipt
          </Button>

          <Button
            variant="contained"
            startIcon={<AddCircleOutlinedIcon />}
            onClick={onCreateAnother}
            sx={{
              textTransform: "none",
              borderRadius: "10px",
              px: 3,
              py: 1.2,
              fontWeight: 600,
            }}
          >
            Create Another
          </Button>
        </Box>
      </Paper>
    </Paper>
  );
};

export default TransactionRecipt;
