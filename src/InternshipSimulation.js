import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box, TextField, LinearProgress } from "@mui/material";
import firebase from "firebase/compat/app";
import app from "./firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const tasks = [
  { id: 1, title: "Introduction & Onboarding", description: "Read the onboarding materials and introduce yourself." },
  { id: 2, title: "First Task", description: "Complete your first real-world assignment." },
  { id: 3, title: "Feedback & Reflection", description: "Reflect on your experience and submit feedback." }
];

const InternshipSimulation = () => {
  const [completed, setCompleted] = useState({});
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState({});
  const [internships, setInternships] = useState([]);

  const handleInput = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleComplete = async (id) => {
    setSaving({ ...saving, [id]: true });
    try {
      await addDoc(collection(db, "submissions"), {
        taskId: id,
        answer: answers[id],
        timestamp: serverTimestamp(),
      });
      setCompleted({ ...completed, [id]: true });
    } catch (error) {
      alert("Error saving submission: " + error.message);
    }
    setSaving({ ...saving, [id]: false });
  };

  // Fetch internships from Firestore
 const fetchInternships = async () => {
  const snapshot = await getDocs(collection(db, "internships"));
  setInternships(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
};
  // Call fetchInternships on component mount
  useEffect(() => {
    fetchInternships();
  }, []);

  // Progress calculation
  const progress = (Object.keys(completed).length / tasks.length) * 100;

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Virtual Internship Simulation
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ mb: 4, height: 10, borderRadius: 5 }} />
      <Typography variant="body1" sx={{ mb: 4 }}>
        Progress: {Math.round(progress)}%
      </Typography>
      {tasks.map(task => (
        <Card key={task.id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">{task.title}</Typography>
            <Typography variant="body2" color="text.secondary">{task.description}</Typography>
            {!completed[task.id] ? (
              <>
                <TextField
                  label="Your Response"
                  multiline
                  minRows={2}
                  fullWidth
                  sx={{ mt: 2 }}
                  value={answers[task.id] || ""}
                  onChange={e => handleInput(task.id, e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleComplete(task.id)}
                  disabled={!answers[task.id] || saving[task.id]}
                >
                  {saving[task.id] ? "Submitting..." : "Submit Task"}
                </Button>
              </>
            ) : (
              <Typography sx={{ mt: 2, color: "green" }}>
                Task submitted!
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default InternshipSimulation;