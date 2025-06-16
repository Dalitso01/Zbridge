import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button, Grid, Paper } from "@mui/material";
import simulations from "./Simulations";
import Forum from "./Forum";
import TeamSim from "./TeamSim";
import PeerReview from "./PeerReview";

export default function SimulationsPage() {
  const [selectedSim, setSelectedSim] = useState(null);

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        All Simulations
      </Typography>
      <Grid container spacing={3}>
        {simulations.map(sim => (
          <Grid item xs={12} sm={6} md={4} key={sim.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{sim.title}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {sim.description}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setSelectedSim(sim)}
                  sx={{ mt: 1 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedSim && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {selectedSim.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedSim.description}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Tasks:
          </Typography>
          <ul>
            {selectedSim.tasks.map(task => (
              <li key={task.id}>{task.question}</li>
            ))}
          </ul>
          {/* Community & Collaboration Features */}
          <Forum simId={selectedSim.id} />
          <TeamSim simId={selectedSim.id} />
          <PeerReview simId={selectedSim.id} />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setSelectedSim(null)}
          >
            Back to All Simulations
          </Button>
        </Paper>
      )}
    </Box>
  );
}