import React from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import ZBridgeGuide from "./components/ZBridgeGuide";
import { ZB_COLORS } from "./theme";

const Layout = ({ children, user, onLogout }) => (
  <Box sx={{ minHeight: "100vh", background: ZB_COLORS.navy, display: "flex", flexDirection: "column" }}>
    <Navbar user={user} onLogout={onLogout} />
    <Box sx={{ flexGrow: 1 }}>
      {children}
    </Box>
    <Box
      component="footer"
      sx={{
        py: 3, px: { xs: 2, md: 4 },
        borderTop: `0.5px solid ${ZB_COLORS.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 1,
        fontSize: "0.8rem", color: "rgba(255,255,255,0.3)",
        fontFamily: "DM Sans",
      }}
    >
      <span>© 2025 ZBRIDGE. All rights reserved.</span>
      <Box sx={{ display: "flex", gap: 2 }}>
        <a href="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>Privacy Policy</a>
        <a href="/contact" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
      </Box>
    </Box>

    {/* Floating AI assistant on every page */}
    <ZBridgeGuide profile={user} />
  </Box>
);

export default Layout;
