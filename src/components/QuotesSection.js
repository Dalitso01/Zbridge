import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

export default function QuotesSection() {
  const quotes = [
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The purpose of education is to replace an empty mind with an open one.", author: "Kenneth Kaunda" },
    { text: "Leadership does not mean domination. The world is always well supplied with people who wish to rule and dominate others.", author: "Haile Selassie" },
  ];

  return (
    <Box sx={{ background: "#e3f2fd", py: 6, px: 2 }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4, color: "#0d2343", fontWeight: 700 }}>
        Inspirational Quotes
      </Typography>
      <Grid container spacing={3} sx={{ maxWidth: 1200, mx: "auto" }}>
        {quotes.map((quote, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Paper elevation={2} sx={{ p: 3, background: "#fff", borderRadius: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, fontStyle: "italic" }}>
                "{quote.text}"
              </Typography>
              <Typography variant="subtitle2" align="right" sx={{ color: "#0d2343" }}>
                - {quote.author}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}