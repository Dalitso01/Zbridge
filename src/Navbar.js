import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => (
  <AppBar position="static" color="success">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Z-Bridge
      </Typography>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/dashboard">Student</Button>
      <Button color="inherit" component={Link} to="/employer">Employer</Button>
      <Button color="inherit" component={Link} to="/podcast">Podcast</Button>
      <Button color="inherit" component={Link} to="/profile">Profile</Button>
      <Button color="inherit" component={Link} to="/library">Library</Button>
      <Button color="inherit" component={Link} to="/admin">Admin</Button>
      <Button color="inherit" component={Link} to="/forum">Forum</Button>
    </Toolbar>
  </AppBar>
);

export default Navbar;