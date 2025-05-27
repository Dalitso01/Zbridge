import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const internships = [
  {
    id: 1,
    company: "ZamTech Solutions",
    title: "Frontend Developer Intern",
    description: "Work on real React projects for Zambian clients.",
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    company: "Copperbelt Finance",
    title: "Finance Analyst Intern",
    description: "Analyze financial data and create reports.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  }
];

const StudentDashboard = () => {
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    setAvailable(internships);
  }, []);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Internships
      </Typography>
      <Grid container spacing={4}>
        {available.map((intern) => (
          <Grid item xs={12} sm={6} md={4} key={intern.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="140"
                image={intern.image}
                alt={intern.title}
              />
              <CardContent>
                <Typography variant="h6">{intern.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {intern.company}
                </Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                  {intern.description}
                </Typography>
                <Button
                  component={Link}
                  to="/simulation"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Start Simulation
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StudentDashboard;