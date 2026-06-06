import React, { useState } from "react";
import {
  Box, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
} from "@mui/material";
import Grid from "./components/Grid";
import { ZB_COLORS } from "./theme";

const SectionCard = ({ title, children }) => (
  <Box sx={{ background: ZB_COLORS.navyMid, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 3, mb: 3 }}>
    {title && <Typography sx={{ fontFamily: "Sora", fontWeight: 600, color: "#fff", mb: 2 }}>{title}</Typography>}
    {children}
  </Box>
);

const AdminPanel = () => {
  const [simulations, setSimulations] = useState([
    { id: 1, title: "Fintech Startup", description: "Mobile payments simulation in Africa." },
    { id: 2, title: "Agritech Solutions", description: "Smart agriculture consulting scenario." },
  ]);
  const [events, setEvents] = useState([
    { id: 1, title: "Hackathon 2025", date: "June 20, 2025", description: "Annual hackathon." },
  ]);
  const [dialog, setDialog] = useState({ open: false, type: "", data: null });
  const [form, setForm] = useState({ title: "", description: "", date: "" });

  const openDialog = (type, data = null) => {
    setDialog({ open: true, type, data });
    setForm(data || { title: "", description: "", date: "" });
  };

  const handleSave = () => {
    if (dialog.type === "simulation") {
      if (form.id) setSimulations(prev => prev.map(s => s.id === form.id ? form : s));
      else setSimulations(prev => [...prev, { ...form, id: Date.now() }]);
    } else {
      if (form.id) setEvents(prev => prev.map(e => e.id === form.id ? form : e));
      else setEvents(prev => [...prev, { ...form, id: Date.now() }]);
    }
    setDialog({ open: false, type: "", data: null });
  };

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Typography sx={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: ZB_COLORS.gold, fontWeight: 600, mb: 1, fontFamily: "DM Sans" }}>Admin</Typography>
      <Typography variant="h4" sx={{ color: "#fff", mb: 4 }}>Admin panel</Typography>

      {/* Stats */}
      <Grid container spacing={1.5} sx={{ mb: 4 }}>
        {[
          { label: "Simulations", value: simulations.length },
          { label: "Events", value: events.length },
          { label: "Users", value: "—" },
        ].map(s => (
          <Grid item xs={4} key={s.label}>
            <Box sx={{ background: ZB_COLORS.cardBg, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 2.5, textAlign: "center" }}>
              <Typography sx={{ fontFamily: "Sora", fontWeight: 700, fontSize: "1.75rem", color: ZB_COLORS.gold }}>{s.value}</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: ZB_COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", fontFamily: "DM Sans" }}>{s.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Simulations table */}
      <SectionCard title="Manage simulations">
        <Button variant="contained" size="small" onClick={() => openDialog("simulation")} sx={{ mb: 2 }}>+ Add simulation</Button>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {["Title", "Description", "Actions"].map(h => (
                  <TableCell key={h} sx={{ color: ZB_COLORS.textMuted, fontFamily: "DM Sans", fontSize: "0.78rem", borderBottom: `0.5px solid ${ZB_COLORS.border}` }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {simulations.map(s => (
                <TableRow key={s.id}>
                  <TableCell sx={{ color: "#fff", fontFamily: "DM Sans", fontSize: "0.875rem", borderBottom: `0.5px solid ${ZB_COLORS.border}` }}>{s.title}</TableCell>
                  <TableCell sx={{ color: ZB_COLORS.textMuted, fontFamily: "DM Sans", fontSize: "0.8rem", borderBottom: `0.5px solid ${ZB_COLORS.border}` }}>{s.description?.slice(0, 60)}…</TableCell>
                  <TableCell sx={{ borderBottom: `0.5px solid ${ZB_COLORS.border}` }}>
                    <Button size="small" onClick={() => openDialog("simulation", s)} sx={{ color: ZB_COLORS.gold, fontSize: "0.75rem", mr: 1 }}>Edit</Button>
                    <Button size="small" onClick={() => setSimulations(prev => prev.filter(x => x.id !== s.id))} sx={{ color: "#f44336", fontSize: "0.75rem" }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </SectionCard>

      {/* Events table */}
      <SectionCard title="Manage events">
        <Button variant="contained" size="small" onClick={() => openDialog("event")} sx={{ mb: 2 }}>+ Add event</Button>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {["Title", "Date", "Actions"].map(h => (
                  <TableCell key={h} sx={{ color: ZB_COLORS.textMuted, fontFamily: "DM Sans", fontSize: "0.78rem", borderBottom: `0.5px solid ${ZB_COLORS.border}` }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map(e => (
                <TableRow key={e.id}>
                  <TableCell sx={{ color: "#fff", fontFamily: "DM Sans", fontSize: "0.875rem", borderBottom: `0.5px solid ${ZB_COLORS.border}` }}>{e.title}</TableCell>
                  <TableCell sx={{ color: ZB_COLORS.textMuted, fontFamily: "DM Sans", fontSize: "0.8rem", borderBottom: `0.5px solid ${ZB_COLORS.border}` }}>{e.date}</TableCell>
                  <TableCell sx={{ borderBottom: `0.5px solid ${ZB_COLORS.border}` }}>
                    <Button size="small" onClick={() => openDialog("event", e)} sx={{ color: ZB_COLORS.gold, fontSize: "0.75rem", mr: 1 }}>Edit</Button>
                    <Button size="small" onClick={() => setEvents(prev => prev.filter(x => x.id !== e.id))} sx={{ color: "#f44336", fontSize: "0.75rem" }}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </SectionCard>

      <Dialog open={dialog.open} onClose={() => setDialog({ open: false, type: "", data: null })} maxWidth="sm" fullWidth PaperProps={{ sx: { background: ZB_COLORS.navyMid, border: `0.5px solid ${ZB_COLORS.border}` } }}>
        <DialogTitle sx={{ color: "#fff", fontFamily: "Sora" }}>{form.id ? "Edit" : "Add"} {dialog.type}</DialogTitle>
        <DialogContent>
          <TextField label="Title" fullWidth sx={{ mb: 2, mt: 1 }} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <TextField label="Description" fullWidth multiline rows={2} sx={{ mb: 2 }} value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} />
          {dialog.type === "event" && <TextField label="Date" fullWidth sx={{ mb: 2 }} value={form.date || ""} onChange={e => setForm({ ...form, date: e.target.value })} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialog({ open: false })} sx={{ color: ZB_COLORS.textMuted }}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
