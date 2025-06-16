import React, { useMemo } from "react";
import { Box, Button, createTheme, ThemeProvider, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import HeroSection from "./components/HeroSection";
import ContactSection from "./components/ContactSection";
import simulations from "./Simulations";
import GuideAvatar from "./components/GuideAvatar";

const theme = createTheme({
  palette: {
    primary: { main: "#1a237e" }, // Deep blue
    secondary: { main: "#ffd600" }, // Gold accent
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { fontSize: "2rem", "@media (max-width:600px)": { fontSize: "1.3rem" } },
    h5: { fontSize: "1.3rem", "@media (max-width:600px)": { fontSize: "1.1rem" } },
  },
});

const motivationalQuotes = [
  { text: "The more you learn, the more you earn.", author: "Warren Buffett" },
  { text: "The power which establishes a strong career is the same power that builds a strong character.", author: "Kenneth Kaunda" },
  { text: "Commit to lifelong learning. The most valuable asset you'll ever have is your mind and what you put into it.", author: "Brian Tracy" },
];

export default function Home({ isLoggedIn, onStartSimulation }) {
  const featuredSimulations = useMemo(() => simulations.slice(0, 4), [simulations]); // Show 4 simulations

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>ZBRIDGE - Empowering Professionals</title>
      </Helmet>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#0d2343",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: 4,
        }}
      >
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "#ffffff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#1a237e", fontWeight: "bold", marginBottom: "1rem" }}
          >
            Welcome to ZBRIDGE!
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#333", marginBottom: "1rem" }}
          >
            Empowering professionals and students with real-world opportunities.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "0.5rem 2rem", fontWeight: "bold" }}
          >
            Get Started
          </Button>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "#1a237e", // Deep blue background
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "white", fontWeight: "bold" }}
          >
            What's ZBRIDGE About?
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ color: "white", marginBottom: 2 }}
          >
            ZBRIDGE is a platform designed to empower students and professionals by connecting them with real-world
            opportunities. Our mission is to bridge the gap between theoretical knowledge and practical experience,
            enabling individuals to thrive in their careers and personal growth.
          </Typography>
          <Typography variant="body1" align="center" sx={{ color: "white" }}>
            Whether you're looking to enhance your skills, explore new career paths, or simply grow as a person, ZBRIDGE
            offers a range of simulations, resources, and tools to help you achieve your goals. Join us on this journey
            of discovery and transformation.
          </Typography>
        </motion.div>

        {/* Tour Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "#ffffff",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#1a237e", fontWeight: "bold" }}
          >
            Take a Tour of ZBRIDGE
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ color: "#333", marginBottom: 2 }}
          >
            ZBRIDGE is more than just a platform. Here's what you can explore:
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 4,
              marginTop: 2,
            }}
          >
            {/* Simulations */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{
                textAlign: "center",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <img
                src="https://via.placeholder.com/100"
                alt="Simulations"
                style={{ marginBottom: "1rem", borderRadius: "8px", width: "100%" }}
              />
              <Typography variant="h6" sx={{ color: "#1a237e", fontWeight: "bold" }}>
                Simulations
              </Typography>
              <Typography variant="body2" sx={{ color: "#333" }}>
                Dive into real-world scenarios across various fields to gain practical experience.
              </Typography>
            </motion.div>

            {/* Forums */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{
                textAlign: "center",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <img
                src="https://via.placeholder.com/100"
                alt="Forums"
                style={{ marginBottom: "1rem", borderRadius: "8px", width: "100%" }}
              />
              <Typography variant="h6" sx={{ color: "#1a237e", fontWeight: "bold" }}>
                Forums
              </Typography>
              <Typography variant="body2" sx={{ color: "#333" }}>
                Publish articles, engage in open debates, and connect with like-minded professionals.
              </Typography>
            </motion.div>

            {/* Podcasts */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{
                textAlign: "center",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <img
                src="https://via.placeholder.com/100"
                alt="Podcasts"
                style={{ marginBottom: "1rem", borderRadius: "8px", width: "100%" }}
              />
              <Typography variant="h6" sx={{ color: "#1a237e", fontWeight: "bold" }}>
                Podcasts
              </Typography>
              <Typography variant="body2" sx={{ color: "#333" }}>
                Listen to discussions on diverse topics to stay informed and inspired.
              </Typography>
            </motion.div>

            {/* Library */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{
                textAlign: "center",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <img
                src="https://via.placeholder.com/100"
                alt="Library"
                style={{ marginBottom: "1rem", borderRadius: "8px", width: "100%" }}
              />
              <Typography variant="h6" sx={{ color: "#1a237e", fontWeight: "bold" }}>
                Library
              </Typography>
              <Typography variant="body2" sx={{ color: "#333" }}>
                Access a rich catalog of resources to upskill and stay ahead in your career.
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        {/* Words of Wisdom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "#1a237e", // Deep blue background
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "white", fontWeight: "bold" }}
          >
            Words of Wisdom
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            {motivationalQuotes.map((quote, idx) => (
              <Typography
                key={idx}
                variant="body1"
                align="center"
                sx={{
                  color: "white",
                  fontStyle: "italic",
                  maxWidth: "600px",
                  fontWeight: "bold",
                }}
              >
                "{quote.text}" - <strong>{quote.author}</strong>
              </Typography>
            ))}
          </Box>
        </motion.div>

        {/* Contact Section */}
        <ContactSection />

        {/* Guide Avatar */}
        <GuideAvatar />
      </Box>
    </ThemeProvider>
  );
}