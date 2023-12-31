import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  InputBase,
} from "@material-ui/core";
import { ShoppingCart, Search } from "@material-ui/icons";
import { useStyles } from "./AppBarStyle";
import { useNavigate } from "react-router-dom";
import user1 from "../../../src/user.png";

const AppBarComponent = ({ handleSearch, cartItemCount }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const userString = sessionStorage.getItem("user");
  const user = JSON.parse(userString);
  const userName = user?.name;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            E-Commerce
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search products..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <IconButton color="inherit" aria-label="cart">
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            aria-controls="menu-appbar"
            aria-haspopup="true"
          >
            <Avatar alt="User Avatar" src={user1} className={classes.avatar} />
          </IconButton>
          {userName && <Typography variant="body2">{userName}</Typography>}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className={classes.menu}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComponent;
