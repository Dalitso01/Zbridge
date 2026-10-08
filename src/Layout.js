import React from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import ZBridgeGuide from "./components/ZBridgeGuide";
import { ZB_COLORS } from "./theme";

const Layout = ({ children, user, onLogout }) => (
  <Box sx={{ minHeight: "100vh", background: "transparent", display: "flex", flexDirection: "column" }}>
    <Navbar user={user} onLogout={onLogout} />
    <Box sx={{ flexGrow: 1 }}>
      {children}
    </Box>
    <Box component="footer" sx={{ background: ZB_COLORS.ink, color: ZB_COLORS.paper, mt: 4 }}>
      {/* Bauhaus colour stripe */}
      <Box sx={{ display: "flex", height: 10 }}>
        <Box sx={{ flex: 3, background: ZB_COLORS.cobalt }} />
        <Box sx={{ flex: 1, background: ZB_COLORS.sun }} />
        <Box sx={{ flex: 2, background: ZB_COLORS.vermilion }} />
        <Box sx={{ flex: 1, background: ZB_COLORS.emerald }} />
      </Box>
      <Box
        sx={{
          py: 3.5, px: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 1.5, fontSize: "0.85rem",
        }}
      >
        <Box component="span" sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem" }}>ZBRIDGE</Box>
        <Box component="span" sx={{ opacity: 0.7 }}>© 2025 ZBRIDGE. All rights reserved.</Box>
        <Box sx={{ display: "flex", gap: 2.5, "& a": { color: "inherit", textDecoration: "none", fontWeight: 600 }, "& a:hover": { color: ZB_COLORS.sun } }}>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/contact">Contact</a>
        </Box>
      </Box>
    </Box>

    {/* Floating AI assistant on every page */}
    <ZBridgeGuide profile={user} />
  </Box>
);

export default Layout;
