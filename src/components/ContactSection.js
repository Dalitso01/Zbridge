import React from "react";
import { Box, Typography } from "@mui/material";

export default function ContactSection() {
  return (
    <Box sx={{ background: "#0d2343", py: 6, px: 2, color: "#fff" }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: 700 }}>
        Contact Us
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
        Email: contact@zbridge.com | Phone: +123 456 7890
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center" }}>
        Address: 123 ZBRIDGE Lane, Innovation City, Africa
      </Typography>
    </Box>
  );
}