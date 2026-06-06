import React, { useState } from "react";
import { Box, Typography, TextField, Button, Chip, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { ZB_COLORS } from "./theme";

const CYAN = ZB_COLORS.cyan;
const LIME = "#9dff00";
const GLOW = ZB_COLORS.cyanGlow;

const Mono = ({ children, sx }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", ...sx }}>{children}</Typography>
);

const initials = (name) => name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

const tagColors = { Career: CYAN, Tech: LIME, Finance: "#ffb300", General: "#b388ff" };

export default function Forum() {
  const [topics, setTopics] = useState([
    { id: 1, title: "How to break into Zambian fintech?", content: "Looking for advice on entering the fintech space as a fresh graduate. What skills should I focus on first?", author: "Chanda M.", tag: "Finance", replies: [{ text: "Start with the Fintech simulation here — it covers the basics of mobile money regulation.", author: "Tembo P.", timestamp: new Date() }], timestamp: new Date(Date.now() - 86400000) },
    { id: 2, title: "Best free resources for supply chain beginners", content: "Can anyone share good free courses for procurement and logistics? Trying to upskill before applying for jobs.", author: "Grace B.", tag: "Career", replies: [], timestamp: new Date(Date.now() - 43200000) },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("General");
  const [replyText, setReplyText] = useState({});
  const [showCompose, setShowCompose] = useState(false);

  const handlePost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    setTopics([{ id: Date.now(), title: newTitle, content: newContent, author: "You", tag: newTag, replies: [], timestamp: new Date() }, ...topics]);
    setNewTitle(""); setNewContent(""); setNewTag("General"); setShowCompose(false);
  };

  const handleReply = (topicId) => {
    if (!replyText[topicId]?.trim()) return;
    setTopics(topics.map(t => t.id === topicId ? { ...t, replies: [...t.replies, { text: replyText[topicId], author: "You", timestamp: new Date() }] } : t));
    setReplyText({ ...replyText, [topicId]: "" });
  };

  return (
    <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// community"}</Mono>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#fff", mb: 0.5 }}>Forum</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>Ask questions, share ideas, connect with the network.</Typography>
        </Box>
        <Button variant="contained" onClick={() => setShowCompose(!showCompose)} sx={{ whiteSpace: "nowrap" }}>
          {showCompose ? "Cancel" : "+ New topic"}
        </Button>
      </Box>

      {/* Compose */}
      {showCompose && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
          <Box sx={{ background: ZB_COLORS.bgMid, border: `0.5px solid ${ZB_COLORS.borderBright}`, borderRadius: "12px", p: 3, mb: 3 }}>
            <TextField label="Title" fullWidth value={newTitle} onChange={e => setNewTitle(e.target.value)} sx={{ mb: 2 }} />
            <TextField label="What's on your mind?" fullWidth multiline minRows={3} value={newContent} onChange={e => setNewContent(e.target.value)} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              {Object.keys(tagColors).map(tag => (
                <Chip key={tag} label={tag} onClick={() => setNewTag(tag)} size="small"
                  sx={{ cursor: "pointer", background: newTag === tag ? tagColors[tag] + "22" : "rgba(0,229,255,0.03)", border: `0.5px solid ${newTag === tag ? tagColors[tag] : ZB_COLORS.border}`, color: newTag === tag ? tagColors[tag] : "rgba(230,247,255,0.6)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem" }} />
              ))}
            </Box>
            <Button variant="contained" onClick={handlePost} disabled={!newTitle.trim() || !newContent.trim()}>Post topic</Button>
          </Box>
        </motion.div>
      )}

      {/* Topics */}
      {topics.map((topic, idx) => {
        const tagColor = tagColors[topic.tag] || CYAN;
        return (
          <motion.div key={topic.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <Box sx={{ background: ZB_COLORS.bgMid, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 3, mb: 2, transition: "all 0.2s", "&:hover": { borderColor: ZB_COLORS.borderBright } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <Avatar sx={{ width: 36, height: 36, background: "rgba(0,229,255,0.1)", color: CYAN, fontSize: "0.8rem", fontWeight: 700, border: `0.5px solid ${ZB_COLORS.borderBright}`, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {initials(topic.author)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}>{topic.author}</Typography>
                  <Mono sx={{ fontSize: "0.66rem", color: ZB_COLORS.textMuted }}>{topic.timestamp.toLocaleDateString()}</Mono>
                </Box>
                <Chip label={topic.tag} size="small" sx={{ background: tagColor + "18", color: tagColor, border: `0.5px solid ${tagColor}44`, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.64rem" }} />
              </Box>

              <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "1.05rem", mb: 0.75 }}>{topic.title}</Typography>
              <Typography sx={{ color: "rgba(230,247,255,0.75)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", lineHeight: 1.6, mb: 2 }}>{topic.content}</Typography>

              {topic.replies.length > 0 && (
                <Box sx={{ pl: 2, borderLeft: `2px solid ${ZB_COLORS.border}`, mb: 2 }}>
                  {topic.replies.map((r, i) => (
                    <Box key={i} sx={{ mb: 1.5 }}>
                      <Mono sx={{ fontSize: "0.66rem", color: CYAN }}>{r.author} · {r.timestamp.toLocaleTimeString()}</Mono>
                      <Typography sx={{ color: "rgba(230,247,255,0.8)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem" }}>{r.text}</Typography>
                    </Box>
                  ))}
                </Box>
              )}

              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField placeholder="Reply…" size="small" fullWidth value={replyText[topic.id] || ""} onChange={e => setReplyText({ ...replyText, [topic.id]: e.target.value })} />
                <Button variant="contained" size="small" onClick={() => handleReply(topic.id)} disabled={!replyText[topic.id]?.trim()} sx={{ whiteSpace: "nowrap" }}>Reply</Button>
              </Box>

              <Mono sx={{ fontSize: "0.66rem", color: ZB_COLORS.textMuted, mt: 1.5 }}>
                {topic.replies.length} {topic.replies.length === 1 ? "reply" : "replies"}
              </Mono>
            </Box>
          </motion.div>
        );
      })}
    </Box>
  );
}
