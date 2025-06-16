import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import simulations from "./Simulations";

export default function SimulationsList({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleStart = (simId) => {
    if (!isLoggedIn) {
      // Redirect to login or signup page
      navigate("/login");
    } else {
      navigate(`/simulation/${simId}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Simulations
      </Typography>
      {simulations.map((sim) => (
        <Paper key={sim.id} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6">{sim.title}</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {sim.description}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleStart(sim.id)}
          >
            Start Simulation
          </Button>
        </Paper>
      ))}
    </Box>
  );
}