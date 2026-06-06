import React, { useState } from "react";
import { Box, Typography, Button, TextField, Avatar, Chip, Divider, Stack, Snackbar } from "@mui/material";
import Grid from "./components/Grid";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import simulations from "./simulationsData";
import mentors from "./Mentors";
import resources from "./ResourceLibrary";
import { ZB_COLORS } from "./theme";

const CYAN = ZB_COLORS.cyan;
const LIME = "#9dff00";
const MAGENTA = "#ff2d78";
const GLOW = ZB_COLORS.cyanGlow;

const Mono = ({ children, sx }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", ...sx }}>{children}</Typography>
);

const events = [
  { title: "Hackathon 2025", date: "June 20, 2025", description: "Showcase your skills at our annual hackathon.", link: "https://example.com/hackathon" },
  { title: "Leadership Webinar", date: "July 15, 2025", description: "Learn leadership skills from industry experts.", link: "https://example.com/webinar" },
];

// XP / level system
const LEVELS = [
  { name: "Rookie", min: 0 },
  { name: "Apprentice", min: 100 },
  { name: "Pro", min: 300 },
  { name: "Expert", min: 600 },
  { name: "Master", min: 1000 },
];
const getLevel = (xp) => {
  let lvl = LEVELS[0], next = LEVELS[1];
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].min) { lvl = LEVELS[i]; next = LEVELS[i + 1] || null; }
  }
  return { lvl, next };
};

const StatCard = ({ label, value, accent }) => (
  <Box sx={{ background: ZB_COLORS.cardBg, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 2.5, textAlign: "center" }}>
    <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: accent || CYAN, textShadow: `0 0 14px ${accent ? accent + "66" : GLOW}` }}>{value}</Typography>
    <Mono sx={{ fontSize: "0.66rem", color: ZB_COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", mt: 0.25 }}>{label}</Mono>
  </Box>
);

const SectionCard = ({ title, children, action }) => (
  <Box sx={{ background: ZB_COLORS.bgMid, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 3, mb: 2 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
      <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "1rem" }}>{title}</Typography>
      {action}
    </Box>
    {children}
  </Box>
);

export default function StudentDashboard({ profile }) {
  const [completed, setCompleted] = useState([]);
  const [reflection, setReflection] = useState("");
  const [reflections, setReflections] = useState([]);
  const [posts, setPosts] = useState([
    { user: "Jane Banda", text: "The Fintech simulation is really eye-opening!", timestamp: new Date() },
  ]);
  const [message, setMessage] = useState("");
  const [snack, setSnack] = useState(false);

  const xp = completed.length * 120 + reflections.length * 30;
  const { lvl, next } = getLevel(xp);
  const levelProgress = next ? Math.round(((xp - lvl.min) / (next.min - lvl.min)) * 100) : 100;

  const progress = simulations.length === 0 ? 0 : Math.round((completed.length / simulations.length) * 100);
  const recommended = simulations.filter(s => !completed.some(c => c.id === s.id)).slice(0, 3);

  const handlePost = () => {
    if (!message.trim()) return;
    setPosts([...posts, { user: profile?.name || "You", text: message, timestamp: new Date() }]);
    setMessage("");
  };

  const handleReflection = () => {
    if (!reflection.trim()) return;
    setReflections([{ text: reflection, timestamp: new Date() }, ...reflections]);
    setReflection("");
    setSnack(true);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      {/* Header with XP/level */}
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Box sx={{
          background: "rgba(0,229,255,0.05)", border: `0.5px solid ${ZB_COLORS.borderBright}`,
          borderRadius: "16px", p: { xs: 2.5, md: 4 }, mb: 4,
          display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap",
          position: "relative", overflow: "hidden",
        }}>
          <Box sx={{ position: "absolute", top: "-60%", right: "-5%", width: 300, height: 300, background: `radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)`, pointerEvents: "none" }} />
          <Avatar src={profile?.avatarUrl} sx={{ width: 68, height: 68, background: ZB_COLORS.bgMid, fontSize: "1.5rem", fontWeight: 700, color: CYAN, border: `2px solid ${CYAN}`, boxShadow: `0 0 20px ${GLOW}`, position: "relative" }}>
            {profile?.name?.[0] || "S"}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 200, position: "relative" }}>
            <Typography variant="h4" sx={{ color: "#fff", fontSize: { xs: "1.4rem", md: "1.8rem" } }}>
              Welcome back, {profile?.name || "Student"}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
              <Chip label={lvl.name} size="small" sx={{ background: "rgba(0,229,255,0.12)", color: CYAN, border: `0.5px solid ${ZB_COLORS.borderBright}`, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem" }} />
              <Mono sx={{ fontSize: "0.72rem", color: ZB_COLORS.textMuted }}>{xp} XP{next ? ` · ${next.min - xp} to ${next.name}` : " · max level"}</Mono>
            </Box>
            {/* XP bar */}
            <Box sx={{ mt: 1, maxWidth: 260, height: 5, background: "rgba(0,229,255,0.1)", borderRadius: 3, overflow: "hidden" }}>
              <Box sx={{ width: `${levelProgress}%`, height: "100%", background: `linear-gradient(90deg, ${CYAN}, ${LIME})`, borderRadius: 3, transition: "width 0.6s ease", boxShadow: `0 0 10px ${GLOW}` }} />
            </Box>
          </Box>
          <Button component={Link} to="/simulations" variant="contained" sx={{ whiteSpace: "nowrap", position: "relative" }}>
            Browse simulations
          </Button>
        </Box>
      </motion.div>

      {/* Stats */}
      <Grid container spacing={1.5} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}><StatCard label="Completed" value={completed.length} /></Grid>
        <Grid item xs={6} sm={3}><StatCard label="Available" value={simulations.length} accent="rgba(230,247,255,0.85)" /></Grid>
        <Grid item xs={6} sm={3}><StatCard label="Progress" value={`${progress}%`} /></Grid>
        <Grid item xs={6} sm={3}><StatCard label="Reflections" value={reflections.length} accent={LIME} /></Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <SectionCard title="Your progress">
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Mono sx={{ fontSize: "0.72rem", color: ZB_COLORS.textMuted }}>{completed.length} of {simulations.length} simulations</Mono>
              <Mono sx={{ fontSize: "0.72rem", color: CYAN }}>{progress}%</Mono>
            </Box>
            <Box sx={{ height: 8, background: "rgba(0,229,255,0.1)", borderRadius: 4, overflow: "hidden" }}>
              <Box sx={{ width: `${progress}%`, height: "100%", background: CYAN, borderRadius: 4, transition: "width 0.5s ease", boxShadow: `0 0 12px ${GLOW}` }} />
            </Box>
          </SectionCard>

          <SectionCard title="Recommended for you">
            {recommended.length === 0 ? (
              <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>You've completed all available simulations.</Typography>
            ) : (
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 1.5 }}>
                {recommended.map(sim => (
                  <Box key={sim.id} sx={{ background: ZB_COLORS.cardBg, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "10px", p: 2, display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "0.875rem", mb: 0.75 }}>{sim.title}</Typography>
                    <Typography sx={{ fontSize: "0.76rem", color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 1.5, flexGrow: 1 }}>{sim.description.slice(0, 55)}…</Typography>
                    <Button component={Link} to={`/Simulation/${sim.id}`} variant="contained" size="small" fullWidth sx={{ fontSize: "0.76rem" }}>Start</Button>
                  </Box>
                ))}
              </Box>
            )}
          </SectionCard>

          <SectionCard title="Community forum">
            <Box sx={{ maxHeight: 200, overflowY: "auto", mb: 2 }}>
              {posts.map((p, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Mono sx={{ fontSize: "0.68rem", color: CYAN }}>{p.user} · {p.timestamp.toLocaleTimeString()}</Mono>
                  <Typography sx={{ color: "rgba(230,247,255,0.85)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem" }}>{p.text}</Typography>
                  <Divider sx={{ borderColor: ZB_COLORS.border, mt: 1 }} />
                </Box>
              ))}
            </Box>
            <Stack direction="row" spacing={1}>
              <TextField placeholder="Share a thought…" value={message} onChange={e => setMessage(e.target.value)} fullWidth size="small" />
              <Button variant="contained" onClick={handlePost} disabled={!message.trim()} sx={{ whiteSpace: "nowrap" }}>Post</Button>
            </Stack>
          </SectionCard>

          <SectionCard title="Reflection & feedback">
            <Typography sx={{ fontSize: "0.875rem", color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 2 }}>
              What did you learn from your last simulation? What would you do differently? (+30 XP)
            </Typography>
            <TextField label="Write your reflection" multiline minRows={3} fullWidth value={reflection} onChange={e => setReflection(e.target.value)} sx={{ mb: 2 }} />
            <Button variant="contained" onClick={handleReflection} disabled={!reflection.trim()}>Submit reflection</Button>
            {reflections.length > 0 && (
              <Box sx={{ mt: 3 }}>
                {reflections.map((r, i) => (
                  <Box key={i} sx={{ background: ZB_COLORS.cardBg, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "8px", p: 2, mb: 1.5 }}>
                    <Mono sx={{ fontSize: "0.68rem", color: ZB_COLORS.textMuted, mb: 0.5 }}>{r.timestamp.toLocaleString()}</Mono>
                    <Typography sx={{ color: "rgba(230,247,255,0.8)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem" }}>{r.text}</Typography>
                  </Box>
                ))}
              </Box>
            )}
          </SectionCard>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <SectionCard title="Resources for you">
            {resources.length === 0 ? (
              <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>No resources yet.</Typography>
            ) : (
              resources.map((res, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Box component="a" href={res.url} target="_blank" rel="noopener noreferrer" sx={{ color: CYAN, fontSize: "0.875rem", fontFamily: "'Space Grotesk', sans-serif", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}>
                    {res.title}
                  </Box>
                  <Mono sx={{ fontSize: "0.68rem", color: ZB_COLORS.textMuted }}>{res.type}</Mono>
                </Box>
              ))
            )}
          </SectionCard>

          <SectionCard title="Mentors">
            {mentors.length === 0 ? (
              <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>No mentors available yet.</Typography>
            ) : (
              mentors.map((m, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "0.9rem" }}>{m.name}</Typography>
                  <Typography sx={{ fontSize: "0.8rem", color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 0.75 }}>{m.bio}</Typography>
                  <Button href={`mailto:${m.email}`} size="small" sx={{ color: CYAN, fontSize: "0.76rem", p: 0, fontFamily: "'JetBrains Mono', monospace" }}>request feedback →</Button>
                  {i < mentors.length - 1 && <Divider sx={{ borderColor: ZB_COLORS.border, mt: 1.5 }} />}
                </Box>
              ))
            )}
          </SectionCard>

          <SectionCard title="Upcoming events">
            {events.map((ev, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "0.875rem" }}>{ev.title}</Typography>
                <Chip label={ev.date} size="small" sx={{ background: "rgba(0,229,255,0.1)", color: CYAN, border: `0.5px solid ${ZB_COLORS.borderBright}`, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.64rem", my: 0.75 }} />
                <Typography sx={{ fontSize: "0.8rem", color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 0.5 }}>{ev.description}</Typography>
                <Button href={ev.link} target="_blank" size="small" sx={{ color: CYAN, fontSize: "0.76rem", p: 0, fontFamily: "'JetBrains Mono', monospace" }}>learn more →</Button>
                {i < events.length - 1 && <Divider sx={{ borderColor: ZB_COLORS.border, mt: 1.5 }} />}
              </Box>
            ))}
          </SectionCard>
        </Grid>
      </Grid>

      <Snackbar open={snack} autoHideDuration={3000} onClose={() => setSnack(false)} message="Reflection saved · +30 XP" />
    </Box>
  );
}
