import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "../common/Navbar";
import Sidebar from "../common/sidebar/Sidebar";

const navbarHeight = 64;

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: `${navbarHeight}px`,
          height: `calc(100vh - ${navbarHeight}px)`,
          overflowY: "auto",
          overflowX: "hidden",
          p: 3,
          backgroundColor: "#f8fafc",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
