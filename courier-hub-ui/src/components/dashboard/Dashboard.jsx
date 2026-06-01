import { Box, Grid } from "@mui/material";
import PackageDetails from "../packages/PackageDetails";
import CustomCard from "../common/CustomCard";

const Dashboard = () => {
  const cardsContent = [
    { title: "Pending Pickup", totalCount: 205 },
    { title: "In Transit", totalCount: 205 },
    { title: "Delayed Packages", totalCount: 205 },
    { title: "Delivered Today", totalCount: 205 },
  ];
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {cardsContent?.map((item) => (
            <CustomCard
              key={item.title}
              title={item.title}
              totalCount={item.totalCount}
            />
          ))}
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <PackageDetails />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
