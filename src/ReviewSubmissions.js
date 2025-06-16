import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, TextField, Button } from "@mui/material";
import firebase from "firebase/compat/app";
import app from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { db } from "./firebase";

const ReviewSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [saving, setSaving] = useState({});

  const fetchSubmissions = async () => {
    const snapshot = await getDocs(collection(db, "submissions"));
    setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    // Fetch all submissions from Firestore
    const unsubscribe = db.collection("submissions")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubmissions(data);
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleFeedbackChange = (id, value) => {
    setFeedback({ ...feedback, [id]: value });
  };

  const handleFeedbackSubmit = async (id) => {
    setSaving({ ...saving, [id]: true });
    try {
      await db.collection("submissions").doc(id).update({
        feedback: feedback[id] || "",
        feedbackTimestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      setFeedback({ ...feedback, [id]: "" });
    } catch (error) {
      alert("Error saving feedback: " + error.message);
    }
    setSaving({ ...saving, [id]: false });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Review Student Submissions
      </Typography>
      {submissions.length === 0 ? (
        <Typography>No submissions yet.</Typography>
      ) : (
        submissions.map(sub => (
          <Card key={sub.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">Task ID: {sub.taskId}</Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Answer:</strong> {sub.answer}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                <strong>Submitted:</strong> {sub.timestamp?.toDate?.().toLocaleString?.() || "N/A"}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "green" }}>
                <strong>Feedback:</strong> {sub.feedback || "No feedback yet."}
              </Typography>
              <TextField
                label="Leave Feedback"
                multiline
                minRows={2}
                fullWidth
                sx={{ mt: 2 }}
                value={feedback[sub.id] || ""}
                onChange={e => handleFeedbackChange(sub.id, e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => handleFeedbackSubmit(sub.id)}
                disabled={saving[sub.id] || !feedback[sub.id]}
              >
                {saving[sub.id] ? "Saving..." : "Submit Feedback"}
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ReviewSubmissions;