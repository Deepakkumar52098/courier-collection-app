import { Box, Grid } from "@mui/material";
import CustomCard from "../common/CustomCard";
import DashboardTable from "../common/DashboardTable";
import TableHeaders from "../common/TableHeaders";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../store/slices/packageSlice";
import { API_CONSTANTS } from "../../api/API_CONSTANTS";
import {
  activeDeliveriesMapping,
  delayedPackagesMapping,
  deliveredPackagesMapping,
  pendingPickupMapping,
} from "./dashboardUtils";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { dashboardData } = useSelector((state) => state.packageDetails);

  const { recentlyCreated, activeDeliveries, delivered } = dashboardData.data;

  const cardsData = dashboardData?.data?.counts;

  console.log("cardsData", cardsData);

  useEffect(() => {
    dispatch(
      fetchDashboardData({
        method: API_CONSTANTS.DASHBOARD_API,
      }),
    );
  }, [dispatch]);

  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      <Grid item size={12}>
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
          {cardsData?.map((item) => (
            <CustomCard
              key={item.title}
              title={item.title}
              totalCount={item.count}
            />
          ))}
        </Box>
      </Grid>

      <Grid container item size={12} sx={{ mt: 3 }}>
        <Grid container item size={12} sx={{ mt: 3 }}>
          <Grid size={6} sx={{ mr: 8 }}>
            <TableHeaders title="Pending Pickup" actionName="VIEW ALL" />
            <DashboardTable
              columsToBeMapped={pendingPickupMapping}
              tableData={recentlyCreated}
            />
          </Grid>
          <Grid size={5}>
            <TableHeaders title="Active Deliveries" actionName="VIEW ALL" />
            <DashboardTable
              columsToBeMapped={activeDeliveriesMapping}
              tableData={activeDeliveries}
            />
          </Grid>
        </Grid>
        <Grid container item size={12} sx={{ mt: 3 }}>
          <Grid size={6} sx={{ mr: 8 }}>
            <TableHeaders title="Delayed Packages" actionName="VIEW ALL" />
            <DashboardTable
              columsToBeMapped={delayedPackagesMapping}
              tableData={delivered}
            />
          </Grid>
          <Grid size={5}>
            <TableHeaders title="Delivered" actionName="VIEW ALL" />
            <DashboardTable
              columsToBeMapped={deliveredPackagesMapping}
              tableData={delivered}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
