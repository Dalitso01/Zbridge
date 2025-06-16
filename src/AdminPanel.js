import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import firebase from "firebase/compat/app";
import app from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import 'firebase/compat/auth';
import { db } from "./firebase"; // Import Firestore instance from firebase.js
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const AdminPanel = () => {
  const [internshipCount, setInternshipCount] = useState(0);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [internships, setInternships] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [flaggedPosts, setFlaggedPosts] = useState([]);
  const [user] = useAuthState(firebase.auth());
  const adminEmails = ["youradmin@email.com"]; // Add your admin email(s)

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "simulation" or "event"
  const [formData, setFormData] = useState({ title: "", description: "", date: "", link: "" });

  useEffect(() => {
    // Count internships
    const unsub1 = onSnapshot(collection(db, "internships"), (snapshot) => {
      setInternshipCount(snapshot.size);
      setInternships(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    // Count submissions
    const unsub2 = db.collection("submissions").onSnapshot(snapshot => {
      setSubmissionCount(snapshot.size);
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    // Get flagged posts
    const unsub3 = db.collection("flaggedPosts").onSnapshot(snapshot => {
      setFlaggedPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsub1();
      unsub2();
      unsub3();
    };
  }, []);

  if (!user || !adminEmails.includes(user.email)) {
    return <Typography>You do not have access to this page.</Typography>;
  }

  // Open dialog for adding/editing
  const handleOpenDialog = (type, data = null) => {
    setDialogType(type);
    if (data) {
      setFormData(data);
    } else {
      setFormData({ title: "", description: "", date: "", link: "" });
    }
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ title: "", description: "", date: "", link: "" });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (dialogType === "simulation") {
      if (formData.id) {
        // Edit simulation
        setInternships((prev) =>
          prev.map((sim) => (sim.id === formData.id ? formData : sim))
        );
      } else {
        // Add new simulation
        setInternships((prev) => [
          ...prev,
          { ...formData, id: Date.now() },
        ]);
      }
    } else if (dialogType === "event") {
      if (formData.id) {
        // Edit event
        setSubmissions((prev) =>
          prev.map((event) => (event.id === formData.id ? formData : event))
        );
      } else {
        // Add new event
        setSubmissions((prev) => [
          ...prev,
          { ...formData, id: Date.now() },
        ]);
      }
    }
    handleCloseDialog();
  };

  // Delete item
  const handleDelete = (type, id) => {
    if (type === "simulation") {
      setInternships((prev) => prev.filter((sim) => sim.id !== id));
    } else if (type === "event") {
      setSubmissions((prev) => prev.filter((event) => event.id !== id));
    }
  };

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

  // Delete flagged post
  const handleDeleteFlaggedPost = async (id) => {
    if (window.confirm("Delete this flagged post?")) {
      await db.collection("flaggedPosts").doc(id).delete();
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
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }} color="primary">
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
      {/* Simulations Management */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Manage Simulations
        </Typography>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => handleOpenDialog("simulation")}
        >
          Add New Simulation
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {internships.map((sim) => (
              <TableRow key={sim.id}>
                <TableCell>{sim.title}</TableCell>
                <TableCell>{sim.description}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenDialog("simulation", sim)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDelete("simulation", sim.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Events Management */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Manage Events
        </Typography>
        <Button
          variant="contained"
          sx={{ mb: 2 }}
          onClick={() => handleOpenDialog("event")}
        >
          Add New Event
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDialog("event", event)}>
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => handleDelete("event", event.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Flagged Posts Management */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Flagged Posts
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Post ID</TableCell>
              <TableCell>Flagged At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flaggedPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.postId}</TableCell>
                <TableCell>{post.flaggedAt.toDate().toLocaleString()}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDeleteFlaggedPost(post.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Dialog for Adding/Editing */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {formData.id ? "Edit" : "Add"} {dialogType === "simulation" ? "Simulation" : "Event"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            sx={{ mb: 2 }}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {dialogType === "event" && (
            <>
              <TextField
                label="Date"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
              <TextField
                label="Link"
                fullWidth
                sx={{ mb: 2 }}
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;