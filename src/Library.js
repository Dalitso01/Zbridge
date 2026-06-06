import React, { useState } from "react";
import { Box, Typography, TextField, Button, Chip, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { motion } from "framer-motion";
import { ZB_COLORS } from "./theme";

const CYAN = ZB_COLORS.cyan;
const LIME = "#9dff00";
const GLOW = ZB_COLORS.cyanGlow;

const Mono = ({ children, sx }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", ...sx }}>{children}</Typography>
);

const categories = ["All", "Career", "Finance", "Law", "Technology", "Marketing", "Procurement", "Business", "Other"];

const typeColor = { Course: CYAN, Book: LIME, Video: "#ffb300", Article: "#b388ff" };

const defaultResources = [
  { title: "Introduction to Information Technology", link: "https://www.open.edu/openlearn/science-maths-technology/introduction-information-technology/content-section-0", category: "Technology", featured: true, description: "Free Open University course covering IT fundamentals.", type: "Course" },
  { title: "Digital Marketing Basics", link: "https://www.coursera.org/learn/digital-marketing-basics", category: "Marketing", featured: false, description: "Beginner's course on digital marketing concepts.", type: "Course" },
  { title: "Procurement and Supply Chain Management", link: "https://www.open.edu/openlearn/money-business/procurement-and-supply-chain-management/content-section-0", category: "Procurement", featured: false, description: "Learn the essentials of procurement and supply chain.", type: "Course" },
  { title: "Business Communication Essentials", link: "https://www.saylor.org/courses/bus210/", category: "Business", featured: false, description: "Free course on effective business communication.", type: "Course" },
  { title: "Personal Finance 101", link: "https://www.khanacademy.org/college-careers-more/personal-finance", category: "Finance", featured: true, description: "Khan Academy's comprehensive personal finance course.", type: "Course" },
  { title: "Introduction to Business Law", link: "https://www.open.edu/openlearn/money-business/introduction-business-law/content-section-0", category: "Law", featured: false, description: "Free Open University course on business law.", type: "Course" },
  { title: "Entrepreneurship: Launching an Innovative Business", link: "https://www.coursera.org/learn/wharton-entrepreneurship", category: "Business", featured: true, description: "Wharton's free course on launching a business.", type: "Course" },
  { title: "Financial Literacy for Youth", link: "https://openstax.org/details/books/personal-finance", category: "Finance", featured: false, description: "Open-access textbook on personal finance.", type: "Book" },
  { title: "Supply Chain Fundamentals", link: "https://www.edx.org/course/supply-chain-fundamentals", category: "Procurement", featured: false, description: "Fundamentals of supply chain management.", type: "Course" },
  { title: "Marketing in a Digital World", link: "https://www.coursera.org/learn/marketing-digital", category: "Marketing", featured: false, description: "Digital marketing strategies for the modern world.", type: "Course" },
];

const ResourceCard = ({ r, onClick }) => (
  <Box onClick={onClick}
    sx={{
      background: r.featured ? "rgba(0,229,255,0.06)" : ZB_COLORS.cardBg,
      border: `0.5px solid ${r.featured ? ZB_COLORS.borderBright : ZB_COLORS.border}`,
      borderRadius: "12px", p: 2.5, cursor: "pointer", height: "100%",
      display: "flex", flexDirection: "column", boxSizing: "border-box",
      transition: "all 0.2s",
      "&:hover": { background: ZB_COLORS.cardHover, borderColor: ZB_COLORS.borderBright, transform: "translateY(-3px)", boxShadow: `0 0 24px rgba(0,229,255,0.12)` },
    }}>
    <Box sx={{ display: "flex", gap: 0.75, mb: 1.25, flexWrap: "wrap" }}>
      <Chip label={r.category} size="small" sx={{ background: "rgba(255,255,255,0.06)", color: "rgba(230,247,255,0.7)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.64rem" }} />
      <Chip label={r.type} size="small" sx={{ background: (typeColor[r.type] || CYAN) + "1e", color: typeColor[r.type] || CYAN, border: `0.5px solid ${(typeColor[r.type] || CYAN)}44`, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.64rem" }} />
      {r.featured && <Chip label="★" size="small" sx={{ background: "rgba(0,229,255,0.12)", color: CYAN, fontSize: "0.64rem" }} />}
    </Box>
    <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "0.92rem", mb: 0.75, flexGrow: 1 }}>{r.title}</Typography>
    <Typography sx={{ fontSize: "0.78rem", color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.5 }}>{r.description}</Typography>
  </Box>
);

export default function Library() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openResource, setOpenResource] = useState(null);
  const [suggestTitle, setSuggestTitle] = useState("");
  const [suggestLink, setSuggestLink] = useState("");
  const [suggestCat, setSuggestCat] = useState("");
  const [suggested, setSuggested] = useState(false);

  const featured = defaultResources.filter(r => r.featured);
  const filtered = defaultResources.filter(r =>
    (category === "All" || r.category === category) &&
    (!search || r.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// resources"}</Mono>
      <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#fff", mb: 0.5 }}>Library</Typography>
      <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 4 }}>Curated free courses, books, and tools to grow your career.</Typography>

      {/* Featured */}
      {featured.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Mono sx={{ fontSize: "0.7rem", color: CYAN, mb: 2, letterSpacing: "0.1em" }}>★ FEATURED</Mono>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2 }}>
            {featured.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} style={{ height: "100%" }}>
                <ResourceCard r={r} onClick={() => setOpenResource(r)} />
              </motion.div>
            ))}
          </Box>
        </Box>
      )}

      {/* Search + filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
        <TextField placeholder="Search resources…" size="small" value={search} onChange={e => setSearch(e.target.value)} sx={{ minWidth: 220, flexGrow: 1, maxWidth: 320 }} />
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
        {categories.map(cat => (
          <Chip key={cat} label={cat} onClick={() => setCategory(cat)} size="small"
            sx={{ cursor: "pointer", background: category === cat ? "rgba(0,229,255,0.15)" : "rgba(0,229,255,0.03)", border: `0.5px solid ${category === cat ? CYAN : ZB_COLORS.border}`, color: category === cat ? CYAN : "rgba(230,247,255,0.6)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", boxShadow: category === cat ? `0 0 12px ${GLOW}` : "none" }} />
        ))}
      </Box>

      {/* Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2, mb: 5 }}>
        {filtered.map((r, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{ height: "100%" }}>
            <ResourceCard r={r} onClick={() => setOpenResource(r)} />
          </motion.div>
        ))}
      </Box>

      {filtered.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6, border: `0.5px dashed ${ZB_COLORS.border}`, borderRadius: "12px", mb: 5 }}>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>No resources match your search.</Typography>
        </Box>
      )}

      {/* Suggest */}
      <Box sx={{ background: ZB_COLORS.bgMid, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 3 }}>
        <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", mb: 2 }}>Suggest a resource</Typography>
        {suggested ? (
          <Typography sx={{ color: LIME, fontFamily: "'Space Grotesk', sans-serif" }}>✓ Thanks! Your suggestion will be reviewed.</Typography>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2 }}>
            <TextField label="Title" fullWidth size="small" value={suggestTitle} onChange={e => setSuggestTitle(e.target.value)} />
            <TextField label="Link" fullWidth size="small" value={suggestLink} onChange={e => setSuggestLink(e.target.value)} />
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select value={suggestCat} label="Category" onChange={e => setSuggestCat(e.target.value)}>
                {categories.filter(c => c !== "All").map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
              </Select>
            </FormControl>
            <Box sx={{ gridColumn: "1 / -1" }}>
              <Button variant="contained" onClick={() => setSuggested(true)} disabled={!suggestTitle || !suggestLink || !suggestCat}>Submit suggestion</Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Detail dialog */}
      <Dialog open={!!openResource} onClose={() => setOpenResource(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { background: ZB_COLORS.bgMid, border: `0.5px solid ${ZB_COLORS.borderBright}`, borderRadius: "14px" } }}>
        <DialogTitle sx={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>{openResource?.title}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Chip label={openResource?.category} size="small" sx={{ background: "rgba(255,255,255,0.06)", color: "rgba(230,247,255,0.7)", fontFamily: "'JetBrains Mono', monospace" }} />
            {openResource?.type && <Chip label={openResource.type} size="small" sx={{ background: (typeColor[openResource.type] || CYAN) + "1e", color: typeColor[openResource.type] || CYAN, fontFamily: "'JetBrains Mono', monospace" }} />}
          </Box>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 3 }}>{openResource?.description}</Typography>
          <Button href={openResource?.link} target="_blank" rel="noopener noreferrer" variant="contained">Open resource →</Button>
        </DialogContent>
        <DialogActions><Button onClick={() => setOpenResource(null)} sx={{ color: ZB_COLORS.textMuted }}>Close</Button></DialogActions>
      </Dialog>
    </Box>
  );
}
