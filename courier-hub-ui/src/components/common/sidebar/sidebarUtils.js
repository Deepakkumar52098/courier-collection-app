import {
  Dashboard,
  Inventory2,
  LocalShipping,
  TrackChanges,
} from "@mui/icons-material";

export const sidebarItems = [
  {
    title: "Dashboard",
    icon: Dashboard,
    path: "/dashboard",
  },
  {
    title: "Create Courier",
    icon: LocalShipping,
    path: "/create-courier",
  },
  {
    title: "Packages",
    icon: Inventory2,
    path: "/packages",
  },
    {
    title: "Track Courier",
    icon: TrackChanges,
    path: "/courier-tracking",
  },
];

