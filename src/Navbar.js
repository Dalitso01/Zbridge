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
        background: "rgba(243,236,223,0.94)",
        borderBottom: `2px solid ${ZB_COLORS.border}`,
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
          <Box sx={{ position: "relative", width: 34, height: 34, mr: 1.5, flexShrink: 0 }}>
            <Box sx={{ position: "absolute", left: 0, top: 0, width: 24, height: 24, borderRadius: "50%", background: ZB_COLORS.cobalt, border: `2px solid ${ZB_COLORS.ink}` }} />
            <Box sx={{ position: "absolute", right: 0, bottom: 0, width: 18, height: 18, background: ZB_COLORS.vermilion, border: `2px solid ${ZB_COLORS.ink}` }} />
            <Box sx={{ position: "absolute", right: 2, top: 1, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: `10px solid ${ZB_COLORS.sun}` }} />
          </Box>
          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem",
              color: ZB_COLORS.ink, letterSpacing: "-0.03em",
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
                color: ZB_COLORS.ink,
                fontSize: "0.9rem",
                fontWeight: location.pathname === link.to ? 700 : 500,
                borderRadius: 999,
                background: location.pathname === link.to ? ZB_COLORS.sun : "transparent",
                border: location.pathname === link.to ? `2px solid ${ZB_COLORS.ink}` : "2px solid transparent",
                fontFamily: "'Space Grotesk', sans-serif",
                px: 1.5,
                "&:hover": { background: location.pathname === link.to ? ZB_COLORS.sun : "rgba(20,17,15,0.07)" },
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
                  color: "rgba(20,17,15,0.5)", fontSize: "0.8rem",
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
                  color: "rgba(20,17,15,0.7)", fontSize: "0.875rem",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                size="small"
                sx={{ fontWeight: 700, fontSize: "0.875rem", px: 2, whiteSpace: "nowrap" }}
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
            borderRight: `2px solid ${ZB_COLORS.border}`,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#14110f" }}>ZBRIDGE</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "rgba(20,17,15,0.6)" }}>
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
                background: location.pathname === link.to ? "rgba(255,194,26,0.1)" : "transparent",
                "&:hover": { background: "rgba(20,17,15,0.06)" },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: location.pathname === link.to ? ZB_COLORS.gold : "rgba(20,17,15,0.8)",
                  fontWeight: location.pathname === link.to ? 600 : 400,
                }}
              />
            </ListItem>
          ))}
        </List>
        <Divider sx={{ borderColor: ZB_COLORS.border, mt: 1 }} />
        <Box sx={{ p: 2 }}>
          {user ? (
            <Button fullWidth onClick={onLogout} sx={{ color: "rgba(20,17,15,0.6)" }}>Logout</Button>
          ) : (
            <Button
              fullWidth variant="contained" component={Link} to="/signup"
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
