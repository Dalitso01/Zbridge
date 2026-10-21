import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, TextField, Button, Chip, Avatar, Alert, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { addDoc, collection, limit, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db, firebaseReady } from "./firebase";
import { ZB_COLORS } from "./theme";

const CYAN = ZB_COLORS.cyan;
const LIME = "#0e8a5f";

const Mono = ({ children, sx }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", ...sx }}>{children}</Typography>
);

const initials = (name = "") => name.split(" ").filter(Boolean).map(w => w[0]).slice(0, 2).join("").toUpperCase() || "?";

// Firestore timestamps arrive as objects (or null for a moment right after posting).
const toDate = (t) => (t?.toDate ? t.toDate() : t instanceof Date ? t : new Date());

const timeAgo = (t) => {
  const mins = Math.round((Date.now() - toDate(t).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} h ago`;
  return toDate(t).toLocaleDateString("en-ZM", { day: "numeric", month: "short", year: "numeric" });
};

// Short display name, e.g. "Chanda Mwila" -> "Chanda M."
const displayName = (user) => {
  const parts = (user?.name || user?.email?.split("@")[0] || "Member").trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0];
};

// Live topics and replies from Firestore. In demo mode they live in memory only.
function useForum() {
  const [topics, setTopics] = useState([]);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(firebaseReady);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!firebaseReady) return undefined;
    const onErr = (err) => { console.error(err); setError("We couldn't load the forum. Please refresh the page."); setLoading(false); };
    const unTopics = onSnapshot(query(collection(db, "forumTopics"), orderBy("createdAt", "desc"), limit(100)), snap => {
      setTopics(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, onErr);
    const unReplies = onSnapshot(query(collection(db, "forumReplies"), orderBy("createdAt", "asc"), limit(1000)), snap => {
      setReplies(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, onErr);
    return () => { unTopics(); unReplies(); };
  }, []);

  const addTopic = async (topic) => {
    if (firebaseReady) await addDoc(collection(db, "forumTopics"), { ...topic, createdAt: serverTimestamp() });
    else setTopics(prev => [{ id: String(Date.now()), ...topic, createdAt: new Date() }, ...prev]);
  };

  const addReply = async (reply) => {
    if (firebaseReady) await addDoc(collection(db, "forumReplies"), { ...reply, createdAt: serverTimestamp() });
    else setReplies(prev => [...prev, { id: String(Date.now()), ...reply, createdAt: new Date() }]);
  };

  return { topics, replies, loading, error, addTopic, addReply };
}

const tagColors = { Career: CYAN, Tech: LIME, Finance: "#c97a00", General: "#6b3fd9" };

export default function Forum({ user }) {
  const { topics, replies, loading, error, addTopic, addReply } = useForum();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("General");
  const [replyText, setReplyText] = useState({});
  const [showCompose, setShowCompose] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState("");

  const author = { authorUid: user?.uid || "", authorName: displayName(user) };

  const handlePost = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    setPosting(true); setPostError("");
    try {
      await addTopic({ ...author, title: newTitle.trim().slice(0, 140), content: newContent.trim().slice(0, 4000), tag: newTag });
      setNewTitle(""); setNewContent(""); setNewTag("General"); setShowCompose(false);
    } catch (err) {
      console.error(err);
      setPostError("Your topic couldn't be posted. Please try again.");
    }
    setPosting(false);
  };

  const handleReply = async (topicId) => {
    const text = replyText[topicId]?.trim();
    if (!text) return;
    setReplyText(prev => ({ ...prev, [topicId]: "" }));
    try {
      await addReply({ ...author, topicId, text: text.slice(0, 2000) });
    } catch (err) {
      console.error(err);
      setReplyText(prev => ({ ...prev, [topicId]: text }));
      setPostError("Your reply couldn't be posted. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// community"}</Mono>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#14110f", mb: 0.5 }}>Forum</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif" }}>Ask questions, share ideas, connect with the network.</Typography>
        </Box>
        {user ? (
          <Button variant="contained" onClick={() => setShowCompose(!showCompose)} sx={{ whiteSpace: "nowrap" }}>
            {showCompose ? "Cancel" : "+ New topic"}
          </Button>
        ) : (
          <Button variant="contained" component={Link} to="/login" state={{ from: "/forum" }} sx={{ whiteSpace: "nowrap" }}>
            Log in to post
          </Button>
        )}
      </Box>

      {!firebaseReady && (
        <Alert severity="info" sx={{ mb: 3 }}>Preview mode: posts on this version of the site disappear when you refresh.</Alert>
      )}
      {(error || postError) && <Alert severity="error" sx={{ mb: 3 }}>{error || postError}</Alert>}

      {/* Compose */}
      {showCompose && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
          <Box sx={{ background: ZB_COLORS.bgMid, border: `2px solid ${ZB_COLORS.borderBright}`, borderRadius: "12px", p: 3, mb: 3 }}>
            <TextField label="Title" fullWidth inputProps={{ maxLength: 140 }} value={newTitle} onChange={e => setNewTitle(e.target.value)} sx={{ mb: 2 }} />
            <TextField label="What's on your mind?" fullWidth multiline minRows={3} value={newContent} onChange={e => setNewContent(e.target.value)} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              {Object.keys(tagColors).map(tag => (
                <Chip key={tag} label={tag} onClick={() => setNewTag(tag)} size="small"
                  sx={{ cursor: "pointer", background: newTag === tag ? tagColors[tag] + "22" : "rgba(31,64,214,0.03)", border: `2px solid ${newTag === tag ? tagColors[tag] : ZB_COLORS.border}`, color: newTag === tag ? tagColors[tag] : "rgba(20,17,15,0.6)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem" }} />
              ))}
            </Box>
            <Button variant="contained" onClick={handlePost} disabled={posting || !newTitle.trim() || !newContent.trim()}>{posting ? "Posting…" : "Post topic"}</Button>
          </Box>
        </motion.div>
      )}

      {loading && <Box sx={{ textAlign: "center", py: 6 }}><CircularProgress /></Box>}

      {!loading && topics.length === 0 && (
        <Box sx={{ textAlign: "center", py: 6, px: 2, background: ZB_COLORS.bgMid, border: `2px dashed ${ZB_COLORS.border}`, borderRadius: "12px" }}>
          <Typography variant="h5" sx={{ mb: 1 }}>Start the first conversation</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, mb: 2.5 }}>
            Ask a career question, share a tip from a simulation, or introduce yourself to the community.
          </Typography>
          {user
            ? <Button variant="contained" onClick={() => setShowCompose(true)}>+ New topic</Button>
            : <Button variant="contained" component={Link} to="/login" state={{ from: "/forum" }}>Log in to post</Button>}
        </Box>
      )}

      {/* Topics */}
      {topics.map((topic, idx) => {
        const tagColor = tagColors[topic.tag] || CYAN;
        const topicReplies = replies.filter(r => r.topicId === topic.id);
        return (
          <motion.div key={topic.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <Box sx={{ background: ZB_COLORS.bgMid, border: `2px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 3, mb: 2, transition: "all 0.2s", "&:hover": { borderColor: ZB_COLORS.borderBright } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                <Avatar sx={{ width: 36, height: 36, background: "rgba(31,64,214,0.1)", color: CYAN, fontSize: "0.8rem", fontWeight: 700, border: `2px solid ${ZB_COLORS.borderBright}`, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {initials(topic.authorName)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ color: "#14110f", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.85rem", fontWeight: 500 }}>{topic.authorName}</Typography>
                  <Mono sx={{ fontSize: "0.66rem", color: ZB_COLORS.textMuted }}>{timeAgo(topic.createdAt)}</Mono>
                </Box>
                <Chip label={topic.tag} size="small" sx={{ background: tagColor + "18", color: tagColor, border: `2px solid ${tagColor}44`, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.64rem" }} />
              </Box>

              <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#14110f", fontSize: "1.05rem", mb: 0.75 }}>{topic.title}</Typography>
              <Typography sx={{ color: "rgba(20,17,15,0.75)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", lineHeight: 1.6, mb: 2 }}>{topic.content}</Typography>

              {topicReplies.length > 0 && (
                <Box sx={{ pl: 2, borderLeft: `2px solid ${ZB_COLORS.border}`, mb: 2 }}>
                  {topicReplies.map(r => (
                    <Box key={r.id} sx={{ mb: 1.5 }}>
                      <Mono sx={{ fontSize: "0.66rem", color: CYAN }}>{r.authorName} · {timeAgo(r.createdAt)}</Mono>
                      <Typography sx={{ color: "rgba(20,17,15,0.8)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem" }}>{r.text}</Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {user && <Box sx={{ display: "flex", gap: 1 }}>
                <TextField placeholder="Reply…" inputProps={{ maxLength: 2000, "aria-label": "Reply" }} size="small" fullWidth value={replyText[topic.id] || ""} onChange={e => setReplyText({ ...replyText, [topic.id]: e.target.value })} />
                <Button variant="contained" size="small" onClick={() => handleReply(topic.id)} disabled={!replyText[topic.id]?.trim()} sx={{ whiteSpace: "nowrap" }}>Reply</Button>
              </Box>}

              <Mono sx={{ fontSize: "0.66rem", color: ZB_COLORS.textMuted, mt: 1.5 }}>
                {topicReplies.length} {topicReplies.length === 1 ? "reply" : "replies"}
              </Mono>
            </Box>
          </motion.div>
        );
      })}
    </Box>
  );
}
