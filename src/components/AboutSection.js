import React from "react";
import { Box, Typography } from "@mui/material";

export default function AboutSection() {
  return (
    <Box sx={{ background: "#fff", py: 6, px: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4, color: "#1976d2", fontWeight: 700 }}>
        About ZBRIDGE
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 800, mx: "auto", textAlign: "center", color: "#0d2343" }}>
        ZBRIDGE is a career-readiness platform that transforms education into action. Through industry-inspired simulations and guided reflections, we help students and young professionals build real skills, explore career paths, and stand out in a competitive world , all before their first job.

Whether you're preparing for your future or sharpening your edge, ZBRIDGE bridges the gap between what you know and what the world expects.

Learn by doing. Grow with confidence. Enter the world ready.
      </Typography>
    </Box>
  );
}