import React, { useState } from "react";
import { Box, Typography, Button, Chip, TextField, InputAdornment } from "@mui/material";
import Grid from "./components/Grid";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import simulations from "./simulationsData";
import { ZB_COLORS } from "./theme";

const categoryColors = {
  Finance: "#00e5ff", Agriculture: "#9dff00", Healthcare: "#ff2d78",
  Energy: "#ffb300", Education: "#00e5ff", Logistics: "#b388ff",
  Business: "#1de9b6", Banking: "#00e5ff", Accounting: "#1de9b6",
  Mining: "#ff8a00", Marketing: "#ff2d78", Law: "#b388ff",
  "Human Resources": "#9dff00", "Real Estate": "#ffb300", Tourism: "#1de9b6",
};

const leaderboard = [
  { name: "Mwansa C.", sim: "Fintech Startup in Africa", score: 98 },
  { name: "Tembo P.", sim: "Entrepreneurship Bootcamp", score: 95 },
  { name: "Phiri G.", sim: "Healthcare Access Innovation", score: 93 },
  { name: "Banda M.", sim: "Smart Agriculture Solutions", score: 91 },
  { name: "Mutale K.", sim: "Renewable Energy", score: 89 },
];

const Mono = ({ children, sx }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", ...sx }}>{children}</Typography>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function SimulationsList({ isLoggedIn }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", ...Array.from(new Set(simulations.map(s => s.category)))];
  let filtered = filter === "All" ? simulations : simulations.filter(s => s.category === filter);
  if (search) filtered = filtered.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()));

  const handleStart = (simId) => {
    if (!isLoggedIn) navigate("/login");
    else navigate("/Simulation/" + simId);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: ZB_COLORS.cyan, fontWeight: 500, mb: 1 }}>
        {"// explore"}
      </Mono>
      <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#fff", mb: 0.75 }}>All simulations</Typography>
      <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 4, fontSize: "1.02rem", maxWidth: 600 }}>
        {simulations.length} real-world scenarios across African industries. Each includes model answers and AI feedback.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {/* Search */}
          <TextField
            placeholder="Search simulations…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            fullWidth
            size="small"
            sx={{ mb: 2.5 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: ZB_COLORS.cyan, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem" }}>⌕</Box>
                </InputAdornment>
              ),
            }}
          />

          {/* Filters */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {categories.map(cat => (
              <Chip key={cat} label={cat} onClick={() => setFilter(cat)} size="small"
                sx={{
                  cursor: "pointer",
                  background: filter === cat ? "rgba(0,229,255,0.15)" : "rgba(0,229,255,0.03)",
                  border: "0.5px solid " + (filter === cat ? ZB_COLORS.cyan : ZB_COLORS.border),
                  color: filter === cat ? ZB_COLORS.cyan : "rgba(230,247,255,0.6)",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.72rem",
                  boxShadow: filter === cat ? `0 0 12px ${ZB_COLORS.cyanGlow}` : "none",
                  "&:hover": { borderColor: ZB_COLORS.borderBright },
                }}
              />
            ))}
          </Box>

          {/* Results count */}
          <Mono sx={{ fontSize: "0.7rem", color: ZB_COLORS.textMuted, mb: 2 }}>
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </Mono>

          {/* Grid */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
            {filtered.map((sim, i) => {
              const catColor = categoryColors[sim.category] || ZB_COLORS.cyan;
              return (
                <motion.div key={sim.id} {...fadeUp(i * 0.05)} style={{ height: "100%" }}>
                  <Box sx={{
                    background: ZB_COLORS.cardBg,
                    border: "0.5px solid " + ZB_COLORS.border,
                    borderRadius: "12px", p: 2.5,
                    height: "100%", display: "flex", flexDirection: "column",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    "&:hover": { background: ZB_COLORS.cardHover, borderColor: ZB_COLORS.borderBright, transform: "translateY(-3px)", boxShadow: `0 0 24px rgba(0,229,255,0.12)` },
                  }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5, flexWrap: "wrap", gap: 0.75 }}>
                      <Chip label={sim.category} size="small" sx={{ background: catColor + "18", color: catColor, border: "0.5px solid " + catColor + "44", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem" }} />
                      {sim.partner && (
                        <Mono sx={{ fontSize: "0.62rem", color: ZB_COLORS.textMuted, alignSelf: "center", display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: ZB_COLORS.lime }} />
                          {sim.partner}
                        </Mono>
                      )}
                    </Box>
                    <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "1rem", mb: 0.75 }}>
                      {sim.title}
                    </Typography>
                    <Typography sx={{ fontSize: "0.84rem", color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.55, flexGrow: 1, mb: 2 }}>
                      {sim.description.slice(0, 95)}…
                    </Typography>
                    <Box sx={{ height: "0.5px", background: ZB_COLORS.border, mb: 1.5 }} />
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", gap: 1.5 }}>
                        <Mono sx={{ fontSize: "0.68rem", color: ZB_COLORS.textMuted }}>
                          {sim.tasks.length} tasks
                        </Mono>
                        <Mono sx={{ fontSize: "0.68rem", color: ZB_COLORS.textMuted }}>
                          {sim.duration}
                        </Mono>
                      </Box>
                      <Button variant="contained" size="small" onClick={() => handleStart(sim.id)} sx={{ fontSize: "0.76rem", px: 2, py: 0.6 }}>
                        Start →
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              );
            })}
          </Box>

          {filtered.length === 0 && (
            <Box sx={{ textAlign: "center", py: 6, border: `0.5px dashed ${ZB_COLORS.border}`, borderRadius: "12px" }}>
              <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>
                No simulations match your search.
              </Typography>
            </Box>
          )}
        </Grid>

        {/* Leaderboard sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ background: ZB_COLORS.bgMid, border: "0.5px solid " + ZB_COLORS.border, borderRadius: "12px", p: 3, position: { md: "sticky" }, top: 88 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Box sx={{ fontSize: "1.1rem", color: ZB_COLORS.cyan, textShadow: `0 0 12px ${ZB_COLORS.cyanGlow}` }}>◆</Box>
              <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff" }}>
                Leaderboard
              </Typography>
            </Box>
            <Mono sx={{ fontSize: "0.68rem", color: ZB_COLORS.textMuted, mb: 2.5, letterSpacing: "0.05em" }}>
              TOP PERFORMERS · THIS MONTH
            </Mono>
            {leaderboard.map((entry, i) => (
              <Box key={i} sx={{
                display: "flex", alignItems: "center", gap: 1.5, mb: 1.5,
                pb: 1.5, borderBottom: i < leaderboard.length - 1 ? "0.5px solid " + ZB_COLORS.border : "none",
              }}>
                <Box sx={{
                  width: 28, height: 28, borderRadius: "6px",
                  background: i === 0 ? "rgba(0,229,255,0.18)" : i === 1 ? "rgba(157,255,0,0.12)" : i === 2 ? "rgba(255,45,120,0.12)" : "rgba(255,255,255,0.04)",
                  border: i < 3 ? `0.5px solid ${i === 0 ? ZB_COLORS.cyan : i === 1 ? ZB_COLORS.lime : ZB_COLORS.magenta}44` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.72rem", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                  color: i === 0 ? ZB_COLORS.cyan : i === 1 ? ZB_COLORS.lime : i === 2 ? ZB_COLORS.magenta : ZB_COLORS.textMuted,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography sx={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}>{entry.name}</Typography>
                  <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.7rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entry.sim}</Typography>
                </Box>
                <Mono sx={{ color: ZB_COLORS.cyan, fontWeight: 500, fontSize: "0.85rem", flexShrink: 0, textShadow: `0 0 10px ${ZB_COLORS.cyanGlow}` }}>
                  {entry.score}
                </Mono>
              </Box>
            ))}
            <Box sx={{ mt: 2, p: 1.5, background: "rgba(0,229,255,0.04)", borderRadius: "8px", border: `0.5px solid ${ZB_COLORS.border}` }}>
              <Mono sx={{ fontSize: "0.68rem", color: ZB_COLORS.textMuted, textAlign: "center", lineHeight: 1.5 }}>
                Complete simulations to climb the ranks
              </Mono>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
