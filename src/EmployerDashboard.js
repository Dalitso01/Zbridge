import React, { useState } from "react";
import {
  Box, Typography, Paper, TextField, Button, List, ListItem, ListItemText, Chip, Avatar, Divider, Dialog, DialogTitle, DialogContent, DialogActions,
} from "@mui/material";
import Grid from "./components/Grid";
import { ZB_COLORS } from "./theme";

const SectionCard = ({ title, children }) => (
  <Box sx={{ background: ZB_COLORS.navyMid, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 3, mb: 2 }}>
    {title && <Typography sx={{ fontFamily: "Sora", fontWeight: 600, color: "#fff", mb: 2 }}>{title}</Typography>}
    {children}
  </Box>
);

const EmployerDashboard = () => {
  const [company, setCompany] = useState({ name: "", description: "", logo: "" });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [applicants] = useState([
    { id: 1, studentName: "Mutale Phiri", status: "Pending" },
    { id: 2, studentName: "Grace Mwale", status: "Approved" },
  ]);
  const [submissions] = useState([
    { taskId: "fintech1", answer: "Our value proposition focuses on serving the unbanked...", studentName: "Mutale Phiri", fileName: "proposal.pdf" },
  ]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setEditing(false); setSaving(false); }, 800);
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Typography sx={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: ZB_COLORS.gold, fontWeight: 600, mb: 1, fontFamily: "DM Sans" }}>Employer</Typography>
      <Typography variant="h4" sx={{ color: "#fff", mb: 4 }}>Employer dashboard</Typography>

      {/* Company profile */}
      <SectionCard>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, mb: editing ? 3 : 0, flexWrap: "wrap" }}>
          <Avatar src={company.logo} sx={{ width: 60, height: 60, background: ZB_COLORS.blue, fontSize: "1.5rem" }}>🏢</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontFamily: "Sora", fontWeight: 600, color: "#fff", fontSize: "1.1rem" }}>{company.name || "Your Company"}</Typography>
            <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "DM Sans", fontSize: "0.875rem" }}>{company.description || "No description set."}</Typography>
          </Box>
          <Button onClick={() => setEditing(!editing)} sx={{ color: ZB_COLORS.gold, border: `0.5px solid rgba(255,214,0,0.3)`, borderRadius: "8px", px: 2, fontSize: "0.875rem" }}>
            {editing ? "Cancel" : "Edit profile"}
          </Button>
        </Box>
        {editing && (
          <Box>
            <TextField label="Company name" fullWidth sx={{ mb: 2 }} value={company.name} onChange={e => setCompany({ ...company, name: e.target.value })} />
            <TextField label="Description" fullWidth multiline minRows={2} sx={{ mb: 2 }} value={company.description} onChange={e => setCompany({ ...company, description: e.target.value })} />
            <TextField label="Logo URL" fullWidth sx={{ mb: 2 }} value={company.logo} onChange={e => setCompany({ ...company, logo: e.target.value })} placeholder="Paste image URL" />
            <Button variant="contained" onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
          </Box>
        )}
      </SectionCard>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SectionCard title="Applicants">
            {applicants.length === 0 ? (
              <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "DM Sans" }}>No applicants yet.</Typography>
            ) : (
              applicants.map((app, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5, pb: 1.5, borderBottom: i < applicants.length - 1 ? `0.5px solid ${ZB_COLORS.border}` : "none" }}>
                  <Box>
                    <Typography sx={{ color: "#fff", fontFamily: "DM Sans", fontSize: "0.9rem" }}>{app.studentName}</Typography>
                    <Chip
                      label={app.status}
                      size="small"
                      sx={{
                        mt: 0.5,
                        background: app.status === "Approved" ? "rgba(76,175,80,0.15)" : app.status === "Rejected" ? "rgba(244,67,54,0.15)" : "rgba(255,214,0,0.12)",
                        color: app.status === "Approved" ? "#4caf50" : app.status === "Rejected" ? "#f44336" : ZB_COLORS.gold,
                        fontFamily: "DM Sans", fontSize: "0.7rem",
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 0.75 }}>
                    <Button size="small" sx={{ color: "#4caf50", fontSize: "0.75rem", border: "0.5px solid rgba(76,175,80,0.3)", borderRadius: "6px", px: 1 }}>Approve</Button>
                    <Button size="small" sx={{ color: "#f44336", fontSize: "0.75rem", border: "0.5px solid rgba(244,67,54,0.3)", borderRadius: "6px", px: 1 }}>Reject</Button>
                  </Box>
                </Box>
              ))
            )}
          </SectionCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionCard title="Submissions">
            {submissions.length === 0 ? (
              <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "DM Sans" }}>No submissions yet.</Typography>
            ) : (
              submissions.map((sub, i) => (
                <Box key={i} sx={{ mb: 1.5, cursor: "pointer", p: 1.5, borderRadius: "8px", border: `0.5px solid ${ZB_COLORS.border}`, "&:hover": { background: ZB_COLORS.cardBg } }} onClick={() => setSelectedSubmission(sub)}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ color: "#fff", fontFamily: "DM Sans", fontSize: "0.875rem" }}>{sub.studentName}</Typography>
                    {sub.fileName && <Chip label={sub.fileName.split(".").pop().toUpperCase()} size="small" sx={{ background: "rgba(33,150,243,0.15)", color: "#2196f3", fontFamily: "DM Sans", fontSize: "0.7rem" }} />}
                  </Box>
                  <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "DM Sans", fontSize: "0.78rem", mt: 0.5 }}>
                    {sub.answer?.slice(0, 60)}…
                  </Typography>
                </Box>
              ))
            )}
          </SectionCard>
        </Grid>
      </Grid>

      <Dialog open={!!selectedSubmission} onClose={() => setSelectedSubmission(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { background: ZB_COLORS.navyMid, border: `0.5px solid ${ZB_COLORS.border}` } }}>
        <DialogTitle sx={{ color: "#fff", fontFamily: "Sora" }}>Submission details</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "DM Sans", fontSize: "0.875rem", mb: 1 }}>Student: {selectedSubmission?.studentName}</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.85)", fontFamily: "DM Sans" }}>{selectedSubmission?.answer}</Typography>
        </DialogContent>
        <DialogActions><Button onClick={() => setSelectedSubmission(null)} sx={{ color: ZB_COLORS.textMuted }}>Close</Button></DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployerDashboard;
