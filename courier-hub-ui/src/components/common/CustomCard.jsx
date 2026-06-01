import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const CustomCard = ({ title, totalCount }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 300,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 4
        }}
      >
        <IconButton
          sx={{
            height: "50px",
            width: "50px",
            color: "#1976d2",
            bgcolor: 'lightGreen'
          }}
        >
          <LocalShippingOutlinedIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "",
          }}
        >
          <Typography
            gutterBottom
            sx={{
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            {totalCount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
