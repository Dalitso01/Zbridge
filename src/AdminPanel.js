import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, Button, Divider } from "@mui/material";
import firebase from "firebase/compat/app";
import app from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import 'firebase/compat/auth';

const db = firebase.firestore();

const AdminPanel = () => {
  const [internshipCount, setInternshipCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [internships, setInternships] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [user] = useAuthState(firebase.auth());
  const adminEmails = ["youradmin@email.com"]; // Add your admin email(s)

  useEffect(() => {
    // Count internships
    const unsub1 = db.collection("internships").onSnapshot(snapshot => {
      setInternshipCount(snapshot.size);
      setInternships(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    // Count submissions
    const unsub2 = db.collection("submissions").onSnapshot(snapshot => {
      setSubmissionCount(snapshot.size);
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsub1();
      unsub2();
    };
  }, []);

  if (!user || !adminEmails.includes(user.email)) {
    return <Typography>You do not have access to this page.</Typography>;
  }

  // Delete internship
  const handleDeleteInternship = async (id) => {
    if (window.confirm("Delete this internship?")) {
      await db.collection("internships").doc(id).delete();
    }
  };

  // Delete submission
  const handleDeleteSubmission = async (id) => {
    if (window.confirm("Delete this submission?")) {
      await db.collection("submissions").doc(id).delete();
    }
  };

  // Export internships to CSV
  const exportInternshipsCSV = () => {
    const headers = ["Title", "Company", "Description"];
    const rows = internships.map(i => [i.title, i.company, i.description]);
    let csv = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "internships.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Admin Panel
      </Typography>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Total Internships</Typography>
            <Typography variant="h3" color="secondary">{internshipCount}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6">Total Submissions</Typography>
            <Typography variant="h3" color="secondary">{submissionCount}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        Manage Internships
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mb: 2 }} onClick={exportInternshipsCSV}>
        Export Internships as CSV
      </Button>
      {internships.map((intern) => (
        <Paper key={intern.id} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">{intern.title} ({intern.company})</Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            sx={{ mt: 1 }}
            onClick={() => handleDeleteInternship(intern.id)}
          >
            Delete
          </Button>
        </Paper>
      ))}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        Manage Submissions
      </Typography>
      {submissions.map((sub) => (
        <Paper key={sub.id} elevation={2} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2">Task ID: {sub.taskId}</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>Answer: {sub.answer}</Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDeleteSubmission(sub.id)}
          >
            Delete
          </Button>
        </Paper>
      ))}
    </Box>
  );
};

export default AdminPanel;