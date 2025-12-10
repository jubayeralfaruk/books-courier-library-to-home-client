import { useState } from "react";
import {
  Box,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router";
import { Outlet } from 'react-router';
// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt"; // My Orders
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // ⭐ Profile icon
import HistoryIcon from "@mui/icons-material/History"; // ⭐ Order History icon

const drawerWidth = 240;

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar />
      <Divider />

      <List>
        {[
          { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
        //   { text: "Orders", path: "/orders", icon: <ShoppingCartIcon /> },
          { text: "My Orders", path: "my-orders", icon: <ListAltIcon /> },
          { text: "Payment History", path: "order-history", icon: <HistoryIcon /> },
        //   { text: "Products", path: "/products", icon: <InventoryIcon /> },
        //   { text: "Customers", path: "/customers", icon: <PeopleIcon /> },
          { text: "Profile", path: "/myProfile", icon: <AccountCircleIcon /> }
        ].map((item) => (
          <ListItem
            key={item.text}
            disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
  {[
    { text: "Settings", path: "/settings", icon: <SettingsIcon /> },
    { text: "Logout", path: "/logout", icon: <LogoutIcon /> },
  ].map((item) => (
    <ListItem key={item.text} disablePadding>
      <ListItemButton component={Link} to={item.path}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  ))}
</List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", bgcolor: "#f5f6fa", minHeight: "100vh" }}>
      <CssBaseline />

      {/* TOP APP BAR */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: "#1e1e2f",
        }}>
        <Toolbar>
          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            noWrap
            component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* LEFT SIDEBAR */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {/* MOBILE DRAWER */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>

        {/* DESKTOP DRAWER */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              background: "#fff",
              borderRight: "1px solid #e0e0e0",
            },
          }}
          open>
          {drawer}
        </Drawer>
      </Box>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: "100%",
        }}>
        {/* <Typography
          variant="h4"
          sx={{ mb: 2 }}>
          Welcome Back 👋
        </Typography>

        <Typography sx={{ mb: 3, maxWidth: 800 }}>
          This area is fully responsive. Add your dashboard charts, cards,
          analytics, tables, and pages here. The layout adjusts beautifully for
          mobiles, tablets, and desktops.
        </Typography> */}

        {/* Example content box */}
        {/* <Box
          sx={{
            bgcolor: "#fff",
            p: 3,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            maxWidth: 700,
          }}>
          <Typography>
            Replace this box with your real dashboard widgets.
          </Typography>
        </Box> */}
        <Outlet />
      </Box>
    </Box>
  );
}
