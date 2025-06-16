import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

export default function TeamSim({ simId }) {
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState([{ name: "Team Alpha", members: ["Jane", "John"] }]);
  const [joined, setJoined] = useState(false);

  const handleCreate = () => {
    if (!teamName) return;
    setTeams([...teams, { name: teamName, members: ["You"] }]);
    setJoined(true);
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6">Team Simulations</Typography>
      {joined ? (
        <Typography>You have joined {teamName}!</Typography>
      ) : (
        <>
          <TextField
            label="Team Name"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
            sx={{ mb: 1 }}
          />
          <Button variant="contained" onClick={handleCreate} disabled={!teamName}>
            Create & Join Team
          </Button>
        </>
      )}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Existing Teams:</Typography>
        {teams.map((team, idx) => (
          <Typography key={idx}>{team.name} ({team.members.length} members)</Typography>
        ))}
      </Box>
    </Paper>
  );
}