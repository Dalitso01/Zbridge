import React, { useState, useEffect } from "react";
import { Box, Typography, LinearProgress, Chip, Grid, Paper, TextField, Button } from "@mui/material";
import firebase from "firebase/compat/app";
import app from "./firebase";

const db = firebase.firestore();

const StudentDashboard = () => {
  const [progress, setProgress] = useState(0); // percent complete
  const [badges, setBadges] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [reflection, setReflection] = useState("");
  const [saving, setSaving] = useState(false);
  const [recentReflections, setRecentReflections] = useState([]);

  useEffect(() => {
    // Example: Fetch user progress, badges, and recommendations from Firestore
    const userId = firebase.auth().currentUser?.uid;
    if (!userId) return;
    db.collection("users").doc(userId).get().then(doc => {
      const data = doc.data();
      setProgress(data?.progress || 0);
      setBadges(data?.badges || []);
      setRecommended(data?.recommendedInternships || []);
    });

    // Fetch recent reflections
    db.collection("reflections")
      .where("user", "==", userId)
      .orderBy("timestamp", "desc")
      .limit(3)
      .get()
      .then(snapshot => {
        setRecentReflections(snapshot.docs.map(doc => doc.data()));
      });
  }, []);

  const handleReflectionSubmit = async () => {
    setSaving(true);
    const userId = firebase.auth().currentUser?.uid;
    await db.collection("reflections").add({
      user: userId,
      text: reflection,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setReflection("");
    setSaving(false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Student Dashboard</Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Internship Simulation Progress</Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, my: 2 }} />
        <Typography variant="body2">{progress}% Complete</Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Badges Earned:</Typography>
          {badges.length === 0 ? (
            <Typography variant="body2">No badges yet.</Typography>
          ) : (
            badges.map((badge, idx) => (
              <Chip
                key={idx}
                label={badge}
                color="secondary"
                sx={{ mr: 1, mb: 1 }}
                avatar={<img src={`/badges/${badge}.png`} alt={badge} style={{ width: 24, height: 24 }} />}
              />
            ))
          }
        </Box>
      </Paper>
      {progress < 100 && (
        <Paper sx={{ p: 2, mb: 3, background: "#fffde7" }}>
          <Typography variant="body2" color="warning.main">
            You have not completed your internship simulation. <a href="/simulation">Continue now</a>!
          </Typography>
        </Paper>
      )}
      {progress === 100 && (
        <Paper sx={{ p: 2, mb: 3, background: "#e8f5e9" }}>
          <Typography variant="h6" color="success.main">
            🎉 Congratulations! You completed the simulation.
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 1 }}
            href="/certificate"
          >
            View/Download Certificate
          </Button>
        </Paper>
      )}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Recommended Internships</Typography>
        <Grid container spacing={2}>
          {recommended.length === 0 ? (
            <Typography variant="body2" sx={{ m: 2 }}>No recommendations yet.</Typography>
          ) : (
            recommended.map((intern, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1">{intern.title}</Typography>
                  <Typography variant="body2">{intern.company}</Typography>
                </Paper>
              </Grid>
            ))
          }
        </Grid>
      </Paper>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">Reflection & Feedback</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          What did you learn from your last simulation? What would you do differently?
        </Typography>
        <TextField
          label="Your Reflection"
          multiline
          minRows={3}
          fullWidth
          sx={{ mb: 2 }}
          value={reflection}
          onChange={e => setReflection(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleReflectionSubmit}
          disabled={saving || !reflection}
        >
          {saving ? "Submitting..." : "Submit Reflection"}
        </Button>
      </Paper>
      {recentReflections.length > 0 && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Your Recent Reflections</Typography>
          {recentReflections.map((r, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {r.timestamp?.toDate?.().toLocaleString?.() || ""}
              </Typography>
              <Typography variant="body1">{r.text}</Typography>
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default StudentDashboard;