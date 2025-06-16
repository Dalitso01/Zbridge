import React from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function GridSection({ abstractImages }) {
  const titles = ["Collaboration & Teamwork", "Leadership & Innovation", "Professional Growth", "Leadership Development"];

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mb: 5, px: 2, width: "100%" }}>
      <Grid container spacing={3}>
        {abstractImages.map((img, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            {/* Add animation to each card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: 3, background: "#fff", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={img}
                  alt={titles[idx]}
                  sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
                <CardContent>
                  <Typography variant="subtitle1" align="center" sx={{ color: "#1976d2", fontWeight: 600 }}>
                    {titles[idx]}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}