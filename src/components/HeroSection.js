import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function HeroSection({ heroImage, isLoggedIn, onStartSimulation, featuredSimulations }) {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(13,35,67,0.85), rgba(25,118,210,0.7)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: { xs: 8, md: 12 },
        color: "#fff",
        textAlign: "center",
        width: "100%",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2, color: "#fff", textShadow: "2px 2px 8px #1976d2" }}>
          Welcome to ZBRIDGE
        </Typography>
      </motion.div>
      <Typography variant="h5" sx={{ mb: 2, color: "#1976d2", textShadow: "1px 1px 6px #0d2343" }}>
        Experience. Grow. Excel.
      </Typography>
      <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", color: "#e3f2fd", fontSize: 20 }}>
        ZBRIDGE empowers Africa’s next generation of professionals through immersive, real-world simulations in business, technology, and creative industries. Build practical skills, connect with peers and mentors, and prepare for a successful career.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          mt: 5,
          background: "#1976d2",
          color: "#fff",
          fontWeight: "bold",
          px: 5,
          py: 1.5,
          fontSize: 20,
          borderRadius: 3,
          boxShadow: 3,
          "&:hover": { background: "#115293" },
        }}
        onClick={() => {
          if (!isLoggedIn) {
            window.location.href = "/login";
          } else if (onStartSimulation) {
            onStartSimulation(featuredSimulations[0]?.id);
          }
        }}
      >
        Get Started
      </Button>
    </Box>
  );
}