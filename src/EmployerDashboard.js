import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Grid, TextField, Button, List, ListItem, ListItemText, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import firebase from "firebase/compat/app";
import { db, auth } from "./firebase"; // Import Firestore instance and auth from firebase.js
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const EmployerDashboard = () => {
  const [company, setCompany] = useState({ name: "", description: "", logo: "" });
  const [editing, setEditing] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [taskTimes, setTaskTimes] = useState({});

  // Fetch company profile and applicants
  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const fetchCompanyProfile = async () => {
      const companyDoc = await getDoc(doc(db, "companies", userId));
      if (companyDoc.exists()) {
        setCompany(companyDoc.data());
      }
    };

    const fetchApplicants = async () => {
      const applicantsQuery = query(collection(db, "applications"), where("employerId", "==", userId));
      const snapshot = await getDocs(applicantsQuery);
      setApplicants(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchSubmissions = async () => {
      const submissionsQuery = query(collection(db, "submissions"), where("employerId", "==", userId));
      const snapshot = await getDocs(submissionsQuery);
      setSubmissions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchCompanyProfile();
    fetchApplicants();
    fetchSubmissions();
  }, []);

  // Save company profile (with logo)
  const handleSaveProfile = async () => {
    setSaving(true);
    const userId = auth.currentUser?.uid;
    await db.collection("companies").doc(userId).set({
      ...company,
      logo: logoUrl || company.logo || ""
    });
    setCompany({ ...company, logo: logoUrl || company.logo || "" });
    setEditing(false);
    setSaving(false);
  };

  // Approve or reject applicant (example logic)
  const handleApplicantStatus = async (idx, status) => {
    const applicant = applicants[idx];
    // Update status in Firestore (assuming docId is available)
    if (applicant.id) {
      await db.collection("applications").doc(applicant.id).update({ status });
    }
    setApplicants(applicants =>
      applicants.map((a, i) => (i === idx ? { ...a, status } : a))
    );
  };

  // Logo upload (optional, for demo just use URL)
  const handleLogoChange = e => {
    setLogoUrl(e.target.value);
  };

  // Set time allocation for a task
  const handleTimeChange = (taskId, value) => {
    setTaskTimes({ ...taskTimes, [taskId]: value });
  };

  // File type check helper
  const isSupportedFile = (fileName) => {
    return /\.(xlsx?|pptx?|docx?|pdf)$/i.test(fileName);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, p: { xs: 1, md: 2 } }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, mb: 4, background: "#e3f2fd" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={company.logo || logoUrl}
            sx={{ width: 64, height: 64, mr: 2, bgcolor: "primary.main" }}
          >
            <BusinessIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {company.name || "Your Company"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {company.description || "No description set."}
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ ml: "auto" }}
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </Button>
        </Box>
        {editing && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Company Name"
              fullWidth
              sx={{ mb: 2 }}
              value={company.name}
              onChange={e => setCompany({ ...company, name: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              minRows={2}
              sx={{ mb: 2 }}
              value={company.description}
              onChange={e => setCompany({ ...company, description: e.target.value })}
            />
            <TextField
              label="Logo URL"
              fullWidth
              sx={{ mb: 2 }}
              value={logoUrl}
              onChange={handleLogoChange}
              placeholder="Paste a logo image URL"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveProfile}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button sx={{ ml: 2 }} onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </Box>
        )}
      </Paper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3, minHeight: 300 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <GroupIcon color="secondary" sx={{ mr: 1 }} />
              <Typography variant="h6">Applicants</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              {applicants.length === 0 ? (
                <Typography variant="body2">No applicants yet.</Typography>
              ) : (
                applicants.map((app, idx) => (
                  <ListItem
                    key={idx}
                    secondaryAction={
                      <>
                        <Chip
                          label={app.status || "Pending"}
                          color={app.status === "Approved" ? "success" : app.status === "Rejected" ? "error" : "warning"}
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        <Button
                          startIcon={<CheckCircleIcon />}
                          color="success"
                          size="small"
                          sx={{ mr: 1 }}
                          onClick={() => handleApplicantStatus(idx, "Approved")}
                          disabled={app.status === "Approved"}
                        >
                          Approve
                        </Button>
                        <Button
                          startIcon={<CancelIcon />}
                          color="error"
                          size="small"
                          onClick={() => handleApplicantStatus(idx, "Rejected")}
                          disabled={app.status === "Rejected"}
                        >
                          Reject
                        </Button>
                      </>
                    }
                  >
                   <ListItemText
                      primary={app.studentName || app.studentEmail || "Applicant"}
                      secondary={`Status: ${app.status || "Pending"}`}
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3, minHeight: 300 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <AssignmentTurnedInIcon color="info" sx={{ mr: 1 }} />
              <Typography variant="h6">Submissions for Review</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List>
              {submissions.length === 0 ? (
                <Typography variant="body2">No submissions yet.</Typography>
              ) : (
                submissions.map((sub, idx) => (
                  <ListItem
                    key={idx}
                    button
                    onClick={() => setSelectedSubmission(sub)}
                  >
                    <ListItemText
                      primary={
                        <>
                          {`Task ${sub.taskId}: ${sub.answer?.slice(0, 40)}${sub.answer?.length > 40 ? "..." : ""}`}
                          {sub.fileName && isSupportedFile(sub.fileName) && (
                            <Chip
                              icon={<AttachFileIcon />}
                              label={sub.fileName.split(".").pop().toUpperCase()}
                              size="small"
                              color="info"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </>
                      }
                      secondary={
                        <>
                          {`Student: ${sub.studentName || sub.studentEmail || "Unknown"}`}
                          <br />
                          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            <Typography variant="caption" sx={{ mr: 1 }}>
                              Time Allocated:
                            </Typography>
                            <TextField
                              size="small"
                              type="number"
                              value={taskTimes[sub.taskId] || ""}
                              onChange={e => handleTimeChange(sub.taskId, e.target.value)}
                              placeholder="Minutes"
                              sx={{ width: 80 }}
                            />
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
      {/* Submission Detail Dialog */}
      <Dialog
        open={!!selectedSubmission}
        onClose={() => setSelectedSubmission(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Submission Details</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Task ID: {selectedSubmission?.taskId}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {selectedSubmission?.answer}
          </Typography>
          {selectedSubmission?.fileUrl && isSupportedFile(selectedSubmission.fileName) && (
            <Box sx={{ my: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Attached File:{" "}
                <a href={selectedSubmission.fileUrl} target="_blank" rel="noopener noreferrer">
                  {selectedSubmission.fileName}
                </a>
              </Typography>
              {/* Optionally, preview PDF files */}
              {/\.pdf$/i.test(selectedSubmission.fileName) && (
                <iframe
                  src={selectedSubmission.fileUrl}
                  title="PDF Preview"
                  width="100%"
                  height
                  style={{ border: "1px solid #ccc" }}
                />
              )}
            </Box>
          )}
          <Typography variant="body2" color="text.secondary">
            Student: {selectedSubmission?.studentName || selectedSubmission?.studentEmail || "Unknown"}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Time Allocated: {taskTimes[selectedSubmission?.taskId] || "Not set"} minutes
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedSubmission(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployerDashboard;