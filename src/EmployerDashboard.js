import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Box, TextField, Button, Grid, Paper } from "@mui/material";
import firebase from "firebase/compat/app";
import app from "./firebase";

const db = firebase.firestore();

const abstractImages = [
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
];

const EmployerDashboard = () => {
  const [internships, setInternships] = useState([]);
  const [form, setForm] = useState({
    company: "",
    title: "",
    description: ""
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch internships from Firestore
  useEffect(() => {
    const unsubscribe = db.collection("internships")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInternships(data);
      });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await db.collection("internships").add({
        ...form,
        image: abstractImages[Math.floor(Math.random() * abstractImages.length)],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      setForm({ company: "", title: "", description: "" });
      setMessage("Internship posted!");
    } catch (error) {
      setMessage("Error posting internship: " + error.message);
    }
    setSaving(false);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Employer Dashboard
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Post a New Internship
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="company"
            label="Company Name"
            value={form.company}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="title"
            label="Internship Title"
            value={form.title}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="description"
            label="Description"
            value={form.description}
            onChange={handleChange}
            required
            fullWidth
            multiline
            minRows={2}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={saving}>
            {saving ? "Posting..." : "Post Internship"}
          </Button>
          {message && (
            <Typography sx={{ mt: 2, color: message.startsWith("Error") ? "red" : "green" }}>{message}</Typography>
          )}
        </Box>
      </Paper>
      <Typography variant="h5" gutterBottom>
        Posted Internships
      </Typography>
      <Grid container spacing={4}>
        {internships.map((intern) => (
          <Grid item xs={12} sm={6} md={4} key={intern.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={intern.image}
                alt={intern.title}
                sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />
              <CardContent>
                <Typography variant="h6">{intern.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {intern.company}
                </Typography>
                <Typography variant="body2" sx={{ my: 1 }}>
                  {intern.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EmployerDashboard;