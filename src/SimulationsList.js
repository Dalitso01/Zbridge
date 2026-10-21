import React, { useState } from "react";
import { Box, Typography, Button, Chip, TextField, InputAdornment } from "@mui/material";
import Grid from "./components/Grid";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import simulations from "./simulationsData";
import { ZB_COLORS } from "./theme";

const categoryColors = {
  Finance: "#1d4f91", Agriculture: "#0f7b5f", Healthcare: "#b4443a",
  Energy: "#a8741f", Education: "#1d4f91", Logistics: "#55489a",
  Business: "#0f8f80", Banking: "#1d4f91", Accounting: "#0f8f80",
  Mining: "#b4622a", Marketing: "#b4443a", Law: "#55489a",
  "Human Resources": "#0f7b5f", "Real Estate": "#a8741f", Tourism: "#0f8f80",
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
      <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#0b1f3a", mb: 0.75 }}>All simulations</Typography>
      <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Inter', sans-serif", mb: 4, fontSize: "1.02rem", maxWidth: 600 }}>
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
                  background: filter === cat ? "rgba(29,79,145,0.15)" : "rgba(29,79,145,0.03)",
                  border: "1px solid " + (filter === cat ? ZB_COLORS.cyan : ZB_COLORS.border),
                  color: filter === cat ? ZB_COLORS.cyan : "rgba(11,31,58,0.6)",
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
                    border: "1px solid " + ZB_COLORS.border,
                    borderRadius: "12px", p: 2.5,
                    height: "100%", display: "flex", flexDirection: "column",
                    boxSizing: "border-box",
                    transition: "all 0.2s ease",
                    "&:hover": { background: ZB_COLORS.cardHover, borderColor: ZB_COLORS.borderBright, transform: "translateY(-2px)", boxShadow: "0 2px 4px rgba(11,31,58,0.06), 0 12px 28px rgba(11,31,58,0.1)" },
                  }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5, flexWrap: "wrap", gap: 0.75 }}>
                      <Chip label={sim.category} size="small" sx={{ background: catColor + "18", color: catColor, border: "1px solid " + catColor + "44", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem" }} />
                      {sim.partner && (
                        <Mono sx={{ fontSize: "0.62rem", color: ZB_COLORS.textMuted, alignSelf: "center", display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Box sx={{ width: 4, height: 4, borderRadius: "50%", background: ZB_COLORS.lime }} />
                          {sim.partner}
                        </Mono>
                      )}
                    </Box>
                    <Typography sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#0b1f3a", fontSize: "1rem", mb: 0.75 }}>
                      {sim.title}
                    </Typography>
                    <Typography sx={{ fontSize: "0.84rem", color: ZB_COLORS.textMuted, fontFamily: "'Inter', sans-serif", lineHeight: 1.55, flexGrow: 1, mb: 2 }}>
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
              <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>
                No simulations match your search.
              </Typography>
            </Box>
          )}
        </Grid>

        {/* Leaderboard sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ background: ZB_COLORS.bgMid, border: "1px solid " + ZB_COLORS.border, borderRadius: "12px", p: 3, position: { md: "sticky" }, top: 88 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Box sx={{ fontSize: "1.1rem", color: ZB_COLORS.cyan, textShadow: "none" }}>◆</Box>
              <Typography sx={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, color: "#0b1f3a" }}>
                Leaderboard
              </Typography>
            </Box>
            <Mono sx={{ fontSize: "0.68rem", color: ZB_COLORS.textMuted, mb: 2.5, letterSpacing: "0.05em" }}>
              TOP PERFORMERS · THIS MONTH
            </Mono>
            {leaderboard.map((entry, i) => (
              <Box key={i} sx={{
                display: "flex", alignItems: "center", gap: 1.5, mb: 1.5,
                pb: 1.5, borderBottom: i < leaderboard.length - 1 ? "1px solid " + ZB_COLORS.border : "none",
              }}>
                <Box sx={{
                  width: 28, height: 28, borderRadius: "6px",
                  background: i === 0 ? "rgba(29,79,145,0.18)" : i === 1 ? "rgba(15,123,95,0.12)" : i === 2 ? "rgba(232,67,46,0.12)" : "rgba(11,31,58,0.04)",
                  border: i < 3 ? `1px solid ${i === 0 ? ZB_COLORS.cyan : i === 1 ? ZB_COLORS.lime : ZB_COLORS.magenta}44` : "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.72rem", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                  color: i === 0 ? ZB_COLORS.cyan : i === 1 ? ZB_COLORS.lime : i === 2 ? ZB_COLORS.magenta : ZB_COLORS.textMuted,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </Box>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography sx={{ color: "#0b1f3a", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}>{entry.name}</Typography>
                  <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{entry.sim}</Typography>
                </Box>
                <Mono sx={{ color: ZB_COLORS.cyan, fontWeight: 500, fontSize: "0.85rem", flexShrink: 0, textShadow: "none" }}>
                  {entry.score}
                </Mono>
              </Box>
            ))}
            <Box sx={{ mt: 2, p: 1.5, background: "rgba(29,79,145,0.04)", borderRadius: "8px", border: `1px solid ${ZB_COLORS.border}` }}>
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
