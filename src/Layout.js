import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Navbar from "./Navbar";
import ZBridgeGuide from "./components/ZBridgeGuide";
import { FeedbackProvider, useFeedback } from "./components/Feedback";
import { ZB_COLORS } from "./theme";

const { ink, paper, sun } = ZB_COLORS;

// Thin strip above the navbar inviting early testers to share feedback.
function BetaBanner() {
  const { openFeedback } = useFeedback();
  return (
    <Box sx={{ background: ink, color: paper, px: 2, py: 0.75, display: "flex", alignItems: "center", justifyContent: "center", gap: 1.25, flexWrap: "wrap", textAlign: "center" }}>
      <Box component="span" sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.12em", border: `1px solid ${sun}`, color: sun, px: 0.9, py: 0.2, borderRadius: 0.5 }}>
        EARLY ACCESS
      </Box>
      <Typography component="span" sx={{ fontSize: "0.82rem", display: { xs: "none", sm: "inline" } }}>
        You're one of our first users. Tell us what works and what doesn't.
      </Typography>
      <Typography component="span" sx={{ fontSize: "0.82rem", display: { xs: "inline", sm: "none" } }}>
        Help shape ZBRIDGE.
      </Typography>
      <Box component="button" type="button" onClick={() => openFeedback()}
        sx={{ background: "none", border: "none", p: 0, color: sun, font: "inherit", fontSize: "0.82rem", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer" }}>
        Give feedback
      </Box>
    </Box>
  );
}

function Footer() {
  const { openFeedback } = useFeedback();
  const linkSx = { color: "inherit", textDecoration: "none", fontWeight: 500, opacity: 0.85, "&:hover": { color: sun, opacity: 1 } };
  const columns = [
    { title: "Learn", links: [["Simulations", "/simulations"], ["Library", "/library"], ["Podcasts", "/podcast"]] },
    { title: "Community", links: [["Forum", "/forum"], ["For employers", "/employer"], ["About us", "/about"]] },
    { title: "Help", links: [["Contact", "/contact"], ["Privacy policy", "/privacy-policy"]] },
  ];

  return (
    <Box component="footer" sx={{ background: ink, color: paper, mt: 4 }}>
      <Box sx={{ height: 3, background: sun }} />
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, pt: 5, pb: 3 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "1.6fr 1fr 1fr 1fr" }, gap: 4, mb: 4 }}>
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "auto" } }}>
            <Typography sx={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, fontSize: "1.4rem", mb: 1, letterSpacing: "0.02em" }}>ZBRIDGE</Typography>
            <Typography sx={{ opacity: 0.75, fontSize: "0.9rem", maxWidth: 300, mb: 2 }}>
              Practical career simulations for students and young professionals in Zambia.
            </Typography>
            <Box component="button" type="button" onClick={() => openFeedback()}
              sx={{ font: "inherit", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", background: "transparent", color: paper, border: "1px solid rgba(245,247,250,0.4)", borderRadius: "6px", px: 2, py: 0.75, "&:hover": { borderColor: sun, color: sun } }}>
              Share feedback
            </Box>
          </Box>
          {columns.map(col => (
            <Box key={col.title}>
              <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: sun, mb: 1.5 }}>{col.title}</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1, fontSize: "0.9rem" }}>
                {col.links.map(([label, to]) => (
                  <Box key={to} component={Link} to={to} sx={linkSx}>{label}</Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ borderTop: "1px solid rgba(245,247,250,0.15)", pt: 2.5, fontSize: "0.8rem", opacity: 0.65, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
          <span>© {new Date().getFullYear()} ZBRIDGE. All rights reserved.</span>
          <span>Made in Zambia</span>
        </Box>
      </Box>
    </Box>
  );
}

const Layout = ({ children, user, onLogout }) => (
  <FeedbackProvider user={user}>
    <Box sx={{ minHeight: "100vh", background: "transparent", display: "flex", flexDirection: "column" }}>
      <BetaBanner />
      <Navbar user={user} onLogout={onLogout} />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
      <Footer />

      {/* Floating AI assistant on every page */}
      <ZBridgeGuide profile={user} />
    </Box>
  </FeedbackProvider>
);

export default Layout;
