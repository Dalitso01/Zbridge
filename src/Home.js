import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Button, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Student Dashboard",
    description: "Simulate real internships, build skills, and track your journey.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80", // Try this image
    link: "/dashboard"
  },
  {
    title: "Employer Dashboard",
    description: "Design virtual work experiences and discover emerging talent.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    link: "/employer"
  },
  {
    title: "Podcast",
    description: "Hear from Zambia’s industry giants and innovators.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    link: "/podcast"
  },
  {
    title: "Profile",
    description: "Showcase your professional journey and achievements.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    link: "/profile"
  }
];

const quotes = [
  {
    text: "The education of the youth is the foundation of any nation.",
    author: "Kenneth Kaunda"
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela"
  },
  {
    text: "We must become the change we want to see.",
    author: "Kenneth Kaunda"
  }
];

const Home = () => (
  <Box
    sx={{
      minHeight: "100vh",
      position: "relative",
      py: 8,
      px: { xs: 2, md: 8 },
      background: "linear-gradient(135deg, #1a237e 60%, #ffd600 100%)"
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(26,35,126,0.7)",
        zIndex: 0
      }}
    />
    <Box sx={{ position: "relative", zIndex: 1 }}>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{
          color: "#fff",
          fontWeight: 700,
          letterSpacing: 2,
          mb: 2
        }}
      >
        Z-Bridge: Zambia’s Virtual Internship Platform
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="#ffd600"
        paragraph
        sx={{ mb: 6, fontWeight: 400 }}
      >
        Empowering Africa’s next generation of professionals through real-world experience, mentorship, and inspiration.
      </Typography>
      <Grid container spacing={5} justifyContent="center">
        {sections.map((section) => (
          <Grid item key={section.title} xs={12} sm={6} md={3}>
            <Card
              elevation={6}
              sx={{
                borderRadius: 4,
                background: "#fff",
                minHeight: 380,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={section.image}
                alt={section.title}
                sx={{ objectFit: "cover", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                  {section.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {section.description}
                </Typography>
                <Button
                  component={Link}
                  to={section.link}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: 2 }}
                  fullWidth
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ maxWidth: 700, mx: "auto", mt: 8 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 4,
            textAlign: "center"
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "primary.main", fontWeight: 700 }}>
            Inspiration
          </Typography>
          {quotes.map((q, idx) => (
            <Typography
              key={idx}
              variant="h6"
              align="center"
              sx={{ fontStyle: "italic", mb: 2, color: "text.secondary" }}
            >
              "{q.text}"<br />— {q.author}
            </Typography>
          ))}
        </Paper>
      </Box>
    </Box>
  </Box>
);

export default Home;