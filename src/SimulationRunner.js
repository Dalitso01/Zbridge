import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Button, TextField } from "@mui/material";
import { simulations } from "./simulations";

export default function SimulationRunner() {
  const { simId } = useParams();
  const sim = simulations.find(s => s.id === simId);
  const [answers, setAnswers] = useState({});
  const [files, setFiles] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!sim) return <Typography>Simulation not found.</Typography>;

  const handleAnswer = (taskId, value) => {
    setAnswers({ ...answers, [taskId]: value });
  };

  const handleFile = (taskId, file) => {
    setFiles({ ...files, [taskId]: file });
  };

  const handleSubmit = () => {
    // Here you would upload answers/files to Firestore/Storage
    setSubmitted(true);
  };

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>{sim.title}</Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>{sim.description}</Typography>
        {sim.tasks.map(task => (
          <Box key={task.id} sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>{task.question}</Typography>
            <TextField
              label="Your Answer"
              fullWidth
              multiline
              minRows={2}
              sx={{ mb: 1 }}
              value={answers[task.id] || ""}
              onChange={e => handleAnswer(task.id, e.target.value)}
            />
            <input
              type="file"
              accept={task.fileType.split(",").map(type => "." + type).join(",")}
              onChange={e => handleFile(task.id, e.target.files[0])}
            />
          </Box>
        ))}
        <Button
          variant="contained"
          color="success"
          onClick={handleSubmit}
          disabled={submitted}
        >
          {submitted ? "Submitted!" : "Submit Simulation"}
        </Button>
      </Paper>
    </Box>
  );
}