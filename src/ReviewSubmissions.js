import React from "react";
import { Box, Typography } from "@mui/material";
import { ZB_COLORS } from "./theme";

export default function ReviewSubmissions() {
  return (
    <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Typography sx={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: ZB_COLORS.gold, fontWeight: 600, mb: 1, fontFamily: "'Space Grotesk', sans-serif" }}>Admin</Typography>
      <Typography variant="h4" sx={{ color: "#14110f", mb: 2 }}>Review submissions</Typography>
      <Box sx={{ background: ZB_COLORS.navyMid, border: `2px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 4, textAlign: "center" }}>
        <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>No submissions to review at this time.</Typography>
      </Box>
    </Box>
  );
}
