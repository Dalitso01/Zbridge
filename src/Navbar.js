import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Student", to: "/dashboard" },
  { label: "Employer", to: "/employer" },
  { label: "Podcast", to: "/podcast" },
  { label: "Profile", to: "/profile" },
  { label: "Library", to: "/library" },
  { label: "Admin", to: "/admin" },
  { label: "Forum", to: "/forum" }
];

const Navbar = ({ profile, onProfileClick }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="static" color="success">
      <Toolbar>
        <Box sx={{ display: { xs: "block", md: "none" }, mr: 2 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <img src="/logo.png" alt="ZBridge Logo" style={{ height: 40, marginRight: 16 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Z-Bridge
        </Typography>
        {/* Desktop Nav */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {navLinks.map(link => (
            <Button
              key={link.to}
              color="inherit"
              component={Link}
              to={link.to}
              sx={{ ml: 1 }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
        {/* Profile Section */}
        {profile && (
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Typography sx={{ mr: 1 }}>{profile.name}</Typography>
            <Avatar
              src={profile.avatarUrl}
              alt={profile.name}
              sx={{ width: 40, height: 40, cursor: "pointer" }}
              onClick={onProfileClick}
            >
              {profile.name ? profile.name[0] : ""}
            </Avatar>
          </Box>
        )}
        {/* Mobile Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <Box sx={{ width: 220 }} role="presentation" onClick={() => setDrawerOpen(false)}>
            <List>
              {navLinks.map(link => (
                <ListItem button component={Link} to={link.to} key={link.to}>
                  <ListItemText primary={link.label} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;