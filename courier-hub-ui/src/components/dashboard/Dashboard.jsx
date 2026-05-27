import { Grid } from "@mui/material";
import PackageDetails from "../packages/PackageDetails";

const Dashboard = () => {
  return (
    <Grid item container>
      <Grid item size={8}>
        <PackageDetails />
      </Grid>
      <Grid item size={6}>
        <PackageDetails />
      </Grid>
      <Grid item size={6}>
        <PackageDetails />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
