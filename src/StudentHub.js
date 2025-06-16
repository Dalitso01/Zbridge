import React, { useState } from "react";
import simulations from "./Simulations";
import UserProfile from "./UserProfile";
import { Box, Typography, Paper, Button } from "@mui/material";

const articles = [
  { id: 1, title: "Legal Trends in Zambia", topic: "Law" },
  { id: 2, title: "Finance Tips for Young Professionals", topic: "Finance" },
  // ...more articles
];

const podcasts = [
  { id: 1, title: "Marketing in Africa", topic: "Marketing" },
  { id: 2, title: "Customer Service Excellence", topic: "Customer Service" },
  // ...more podcasts
];

export default function StudentHub() {
  const [profile, setProfile] = useState(null);

  if (!profile) {
    return <UserProfile onSave={setProfile} />;
  }

  // Filter simulations, articles, podcasts by interests
  const recommendedSimulations = simulations.filter(sim =>
    profile.interests.some(interest =>
      sim.title.toLowerCase().includes(interest.toLowerCase())
    )
  );
  const recommendedArticles = articles.filter(article =>
    profile.interests.includes(article.topic)
  );
  const recommendedPodcasts = podcasts.filter(podcast =>
    profile.interests.includes(podcast.topic)
  );

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Welcome, {profile.name}!</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>Recommended Simulations</Typography>
      {recommendedSimulations.map(sim => (
        <Paper key={sim.id} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">{sim.title}</Typography>
          <Typography>{sim.description}</Typography>
          <Button variant="contained" href={`/simulation/${sim.id}`} sx={{ mt: 1 }}>Start</Button>
        </Paper>
      ))}
      <Typography variant="h6" sx={{ mt: 4 }}>Recommended Articles</Typography>
      {recommendedArticles.map(article => (
        <Paper key={article.id} sx={{ p: 2, mb: 2 }}>
          <Typography>{article.title}</Typography>
        </Paper>
      ))}
      <Typography variant="h6" sx={{ mt: 4 }}>Recommended Podcasts</Typography>
      {recommendedPodcasts.map(podcast => (
        <Paper key={podcast.id} sx={{ p: 2, mb: 2 }}>
          <Typography>{podcast.title}</Typography>
        </Paper>
      ))}
    </Box>
  );
}