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

import InboxIcon from "@mui/icons-material/MoveToInbox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MailIcon from "@mui/icons-material/Mail";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link } from "react-router";
import { Outlet } from 'react-router';
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import useRole from "../hooks/useRole";
import MenuBookIcon from "@mui/icons-material/MenuBook";




const drawerWidth = 240;

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");
  const {role} = useRole();
  console.log(role);
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const menuItems = () => {
  if (role === "admin") {
    return [
      { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
      { text: "Approve Seller", path: "approve-seller", icon: <HowToRegIcon /> },
      { text: "Manage Users", path: "users-management", icon: <ManageAccountsIcon /> },
      { text: "Manage Books", path: "manage-books", icon: <MenuBookIcon /> },
      { text: "Profile", path: "/myProfile", icon: <AccountCircleIcon /> },
    ];
  }

  if (role === "seller") {
    return [
      { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
      { text: "Add Book", path: "add-book", icon: <ShoppingCartIcon /> },
      { text: "My Books", path: "my-books", icon: <ShoppingCartIcon /> },
      { text: "Order Management", path: "order-management", icon: <ListAltIcon /> },
      { text: "My Orders", path: "my-orders", icon: <ShoppingCartIcon /> },
      { text: "Payment History", path: "order-history", icon: <HistoryIcon /> },
      { text: "Profile", path: "/myProfile", icon: <AccountCircleIcon /> },
    ];
  }

  return [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "My Orders", path: "my-orders", icon: <ShoppingCartIcon /> },
    { text: "Payment History", path: "order-history", icon: <HistoryIcon /> },
    { text: "Profile", path: "/myProfile", icon: <AccountCircleIcon /> },
  ];
};

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="h4">User</Typography>
      </Toolbar>
      <Divider />

      <List>
        {menuItems().map((item) => (
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
            <ListItemButton
              component={Link}
              to={"/"}>
              <ListItemText primary={'BooksCourier'} />
            </ListItemButton>
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
        </Typography> */}

        {/* <Typography sx={{ mb: 3, maxWidth: 800 }}>
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
