import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, IconButton, Drawer,
  List, ListItem, ListItemText, Box, Avatar, Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";
import { ZB_COLORS } from "./theme";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Simulations", to: "/simulations" },
  { label: "Forum", to: "/forum" },
  { label: "Library", to: "/library" },
  { label: "Podcasts", to: "/podcast" },
  { label: "About", to: "/about" },
];

const Navbar = ({ user, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(5,13,26,0.97)",
        borderBottom: `0.5px solid ${ZB_COLORS.border}`,
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, minHeight: "64px !important" }}>
        {/* Mobile menu */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => setDrawerOpen(true)}
          sx={{ mr: 1, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", mr: 4 }}>
          <Box
            sx={{
              width: 32, height: 32, borderRadius: "8px",
              background: ZB_COLORS.cyan, boxShadow: "0 0 16px rgba(0,229,255,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              mr: 1.5,
            }}
          >
            <Typography sx={{ color: "#060b1a", fontWeight: 800, fontSize: "0.9rem", fontFamily: "Space Grotesk" }}>Z</Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Space Grotesk", fontWeight: 700, fontSize: "1.2rem",
              color: "#fff", letterSpacing: "-0.02em",
            }}
          >
            ZBRIDGE
          </Typography>
        </Box>

        {/* Desktop nav links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, flexGrow: 1 }}>
          {navLinks.map(link => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              sx={{
                color: location.pathname === link.to ? ZB_COLORS.gold : "rgba(255,255,255,0.65)",
                fontSize: "0.875rem",
                fontWeight: location.pathname === link.to ? 600 : 400,
                fontFamily: "DM Sans",
                px: 1.5,
                "&:hover": { color: "#fff", background: "rgba(255,255,255,0.06)" },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Right side */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto" }}>
          {user ? (
            <>
              <Avatar
                src={user.avatarUrl}
                component={Link}
                to="/profile"
                sx={{
                  width: 34, height: 34,
                  background: ZB_COLORS.blue,
                  border: `2px solid ${ZB_COLORS.gold}`,
                  cursor: "pointer", fontSize: "0.85rem", fontWeight: 700,
                }}
              >
                {user.name?.[0] || "U"}
              </Avatar>
              <Button
                onClick={onLogout}
                size="small"
                sx={{
                  color: "rgba(255,255,255,0.5)", fontSize: "0.8rem",
                  display: { xs: "none", md: "block" },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "rgba(255,255,255,0.7)", fontSize: "0.875rem",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/profile"
                variant="contained"
                size="small"
                sx={{ fontFamily: "DM Sans", fontWeight: 600, fontSize: "0.875rem", px: 2 }}
              >
                Get started
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: ZB_COLORS.navyMid,
            borderRight: `0.5px solid ${ZB_COLORS.border}`,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontFamily: "Sora", fontWeight: 700, color: "#fff" }}>ZBRIDGE</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "rgba(255,255,255,0.6)" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: ZB_COLORS.border }} />
        <List sx={{ pt: 1 }}>
          {navLinks.map(link => (
            <ListItem
              button
              component={Link}
              to={link.to}
              key={link.to}
              onClick={() => setDrawerOpen(false)}
              sx={{
                borderRadius: "8px", mx: 1, mb: 0.5,
                background: location.pathname === link.to ? "rgba(255,214,0,0.1)" : "transparent",
                "&:hover": { background: "rgba(255,255,255,0.06)" },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontFamily: "DM Sans",
                  color: location.pathname === link.to ? ZB_COLORS.gold : "rgba(255,255,255,0.8)",
                  fontWeight: location.pathname === link.to ? 600 : 400,
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: ZB_COLORS.border, mt: 1 }} />
        <Box sx={{ p: 2 }}>
          {user ? (
            <Button fullWidth onClick={onLogout} sx={{ color: "rgba(255,255,255,0.6)" }}>Logout</Button>
          ) : (
            <Button
              fullWidth variant="contained" component={Link} to="/profile"
              onClick={() => setDrawerOpen(false)}
              sx={{ mt: 1 }}
            >
              Get started free
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
