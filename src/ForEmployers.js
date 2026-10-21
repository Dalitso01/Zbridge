import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { ZB_COLORS, ART_SHADOW } from "./theme";
import { useFeedback } from "./components/Feedback";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import TuneIcon from "@mui/icons-material/Tune";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const { ink, cobalt } = ZB_COLORS;
const CREAM = ZB_COLORS.cardBg;

const benefits = [
  { icon: <WorkOutlineIcon />, title: "Find work-ready graduates", desc: "See how candidates handle realistic tasks from your industry, not just their grades." },
  { icon: <TuneIcon />, title: "Shape the simulations", desc: "Help design scenarios that reflect the real challenges your team faces." },
  { icon: <TrendingUpIcon />, title: "Build your talent pipeline", desc: "Get to know motivated students before they graduate." },
];

// Employer tools are still being built. For now this page collects interest.
export default function ForEmployers() {
  const { openFeedback } = useFeedback();
  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 7 } }}>
      <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.16em", color: cobalt, mb: 1.5 }}>
        For employers
      </Typography>
      <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" }, lineHeight: 1.02, mb: 2, maxWidth: 720 }}>
        Meet Zambia's next generation of talent
      </Typography>
      <Typography sx={{ color: ZB_COLORS.textMuted, fontSize: "1.1rem", maxWidth: 620, mb: 5 }}>
        We're building tools for employers to discover students who have proven their skills through ZBRIDGE simulations. Register your interest and we'll be in touch as we open them up.
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3, mb: 6 }}>
        {benefits.map(b => (
          <Box key={b.title} sx={{ background: CREAM, border: `1px solid ${ZB_COLORS.border}`, boxShadow: "0 1px 2px rgba(11,31,58,0.06), 0 2px 8px rgba(11,31,58,0.05)", borderRadius: 2, p: 3 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: "10px", background: ZB_COLORS.tint, color: cobalt, display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>{b.icon}</Box>
            <Typography sx={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 700, fontSize: "1.2rem", mb: 1 }}>{b.title}</Typography>
            <Typography sx={{ color: ZB_COLORS.textMuted, fontSize: "0.95rem" }}>{b.desc}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ background: ZB_COLORS.goldTint, border: `1px solid ${ZB_COLORS.border}`, borderLeft: `4px solid ${ZB_COLORS.sun}`, borderRadius: 2, boxShadow: ART_SHADOW, p: { xs: 3, md: 4.5 }, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3, flexWrap: "wrap" }}>
        <Box sx={{ maxWidth: 560 }}>
          <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", md: "1.9rem" }, mb: 1 }}>Interested in partnering?</Typography>
          <Typography>Tell us about your organisation and the roles you hire for.</Typography>
        </Box>
        <Button variant="contained" size="large" onClick={() => openFeedback({ type: "Other", title: "Register employer interest" })}
          sx={{ px: 4, background: ink, color: CREAM, "&:hover": { background: "#14305a" } }}>
          Register interest
        </Button>
      </Box>
    </Box>
  );
}
