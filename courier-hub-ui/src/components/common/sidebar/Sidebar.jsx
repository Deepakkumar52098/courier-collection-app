import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";

import { useLocation, useNavigate } from "react-router-dom";
import { sidebarItems } from "./sidebarUtils";



const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const renderSidebarItems = (items) => {
    return items.map((item) => {
      const Icon = item.icon;

      const isSelected =
        location.pathname === item.path;

      return (
        <ListItem
          key={item.title}
          disablePadding
        >
          <ListItemButton
            selected={isSelected}
            onClick={() =>
              navigate(item.path)
            }
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: "10px",

              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "#fff",

                "& .MuiListItemIcon-root": {
                  color: "#fff",
                },
              },
            }}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>

            <ListItemText
              primary={item.title}
            />
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <Box
        sx={{
          overflowY: "auto",
          height: "100%",
          py: 2,
        }}
      >
        <List>
          {renderSidebarItems(sidebarItems)}
        </List>

        <Divider sx={{ my: 1 }} />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
