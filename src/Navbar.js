import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, Button, IconButton, Drawer,
  List, ListItemButton, ListItemText, Box, Avatar, Divider,
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
  const links = user ? [navLinks[0], { label: "My dashboard", to: "/dashboard" }, ...navLinks.slice(1)] : navLinks;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(255,255,255,0.94)",
        borderBottom: `1px solid ${ZB_COLORS.border}`,
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar sx={{ px: { xs: 1.5, md: 4 }, minHeight: "64px !important" }}>
        {/* Mobile menu */}
        <IconButton
          color="inherit"
          edge="start"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
          sx={{ mr: 1, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", mr: { xs: 1, md: 4 }, minWidth: 0 }}>
          <Box sx={{ width: 34, height: 34, mr: 1.25, flexShrink: 0, borderRadius: "8px", background: ZB_COLORS.ink, color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, fontSize: "1.15rem", position: "relative", overflow: "hidden" }}>
            Z
            <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: ZB_COLORS.sun }} />
          </Box>
          <Typography
            sx={{
              fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, fontSize: "1.3rem",
              color: ZB_COLORS.ink, letterSpacing: "0.02em",
            }}
          >
            ZBRIDGE
          </Typography>
        </Box>

        {/* Desktop nav links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, flexGrow: 1 }}>
          {links.map(link => (
            <Button
              key={link.to}
              component={Link}
              to={link.to}
              sx={{
                color: location.pathname === link.to ? ZB_COLORS.cobalt : ZB_COLORS.ink,
                fontSize: "0.9rem",
                fontWeight: location.pathname === link.to ? 700 : 500,
                borderRadius: "6px",
                background: location.pathname === link.to ? ZB_COLORS.tint : "transparent",
                border: "1px solid transparent",
                fontFamily: "'Inter', sans-serif",
                px: 1.5,
                "&:hover": { background: location.pathname === link.to ? ZB_COLORS.tint : "rgba(11,31,58,0.05)" },
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
                  border: `1px solid ${ZB_COLORS.border}`,
                  cursor: "pointer", fontSize: "0.85rem", fontWeight: 700,
                }}
              >
                {user.name?.[0] || "U"}
              </Avatar>
              <Button
                onClick={onLogout}
                size="small"
                sx={{
                  color: "rgba(11,31,58,0.5)", fontSize: "0.8rem",
                  display: { xs: "none", md: "block" },
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "rgba(11,31,58,0.7)", fontSize: "0.875rem",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Log in
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                size="small"
                sx={{ fontWeight: 700, fontSize: "0.875rem", px: { xs: 1.5, sm: 2 }, whiteSpace: "nowrap" }}
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
            borderRight: `1px solid ${ZB_COLORS.border}`,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, color: "#0b1f3a" }}>ZBRIDGE</Typography>
          <IconButton aria-label="Close menu" onClick={() => setDrawerOpen(false)} sx={{ color: "rgba(11,31,58,0.6)" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: ZB_COLORS.border }} />
        <List sx={{ pt: 1 }}>
          {links.map(link => (
            <ListItemButton
              component={Link}
              to={link.to}
              key={link.to}
              onClick={() => setDrawerOpen(false)}
              sx={{
                borderRadius: "8px", mx: 1, mb: 0.5,
                background: location.pathname === link.to ? "rgba(184,137,47,0.1)" : "transparent",
                "&:hover": { background: "rgba(11,31,58,0.06)" },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontFamily: "'Inter', sans-serif",
                  color: location.pathname === link.to ? ZB_COLORS.gold : "rgba(11,31,58,0.8)",
                  fontWeight: location.pathname === link.to ? 600 : 400,
                }}
              />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ borderColor: ZB_COLORS.border, mt: 1 }} />
        <Box sx={{ p: 2 }}>
          {user ? (
            <Button fullWidth onClick={() => { setDrawerOpen(false); onLogout(); }} sx={{ color: "rgba(11,31,58,0.6)" }}>Log out</Button>
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
