import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const CustomCard = ({ title, totalCount }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
          {title}
        </Typography>
        <IconButton>
          <LocalShippingOutlinedIcon />
        </IconButton>
        <Typography variant="body2">{totalCount}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View all</Button>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
