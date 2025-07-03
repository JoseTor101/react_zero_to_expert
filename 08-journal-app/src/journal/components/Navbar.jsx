import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { Grid, AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth";

const Navbar = ({ drawerWidth }) => {
  
  const dispatch = useDispatch();

  const onLogoutUser = () => {
    dispatch(logoutUser());
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth})px` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Grid container alignItems="center">
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuOutlined />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, ml:30 }}>
            Journal App
          </Typography>
          <IconButton color="error" onClick={onLogoutUser}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;