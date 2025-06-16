import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, TextField, Grid, Paper } from "@mui/material";
import firebase from "firebase/compat/app";
import app from "./firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

import { db } from "./firebase";

const Forum = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({ title: "", content: "" });
  const [reply, setReply] = useState({});
  const [saving, setSaving] = useState(false);
  const [posts, setPosts] = useState([
    { user: "Jane", text: "This simulation is really interesting!", timestamp: new Date() }
  ]);
  const [message, setMessage] = useState("");

  // Fetch topics and replies
  useEffect(() => {
    const forumTopicsRef = collection(db, "forumTopics");
    const q = query(forumTopicsRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTopics(data);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Post a new topic
  const handlePostTopic = async () => {
    if (!newTopic.title || !newTopic.content) return;
    setSaving(true);
    await db.collection("forumTopics").add({
      ...newTopic,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      replies: []
    });
    setNewTopic({ title: "", content: "" });
    setSaving(false);
  };

  // Post a reply
  const handleReply = async (topicId) => {
    if (!reply[topicId]) return;
    setSaving(true);
    const topicRef = db.collection("forumTopics").doc(topicId);
    await topicRef.update({
      replies: firebase.firestore.FieldValue.arrayUnion({
        content: reply[topicId],
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    });
    setReply({ ...reply, [topicId]: "" });
    setSaving(false);
  };

  const handlePost = () => {
    if (!message) return;
    setPosts([
      ...posts,
      { user: "You", text: message, timestamp: new Date() }
    ]);
    setMessage("");
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom color="primary">
        Forum & Discussion Board
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Start a New Topic
        </Typography>
        <TextField
          label="Title"
          fullWidth
          sx={{ mb: 2 }}
          value={newTopic.title}
          onChange={e => setNewTopic({ ...newTopic, title: e.target.value })}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          minRows={2}
          sx={{ mb: 2 }}
          value={newTopic.content}
          onChange={e => setNewTopic({ ...newTopic, content: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePostTopic}
          disabled={saving || !newTopic.title || !newTopic.content}
        >
          {saving ? "Posting..." : "Post Topic"}
        </Button>
      </Paper>
      <Typography variant="h5" gutterBottom>
        Recent Topics
      </Typography>
      <Grid container spacing={3}>
        {topics.map(topic => (
          <Grid item xs={12} key={topic.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{topic.title}</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>{topic.content}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {topic.timestamp?.toDate?.().toLocaleString?.() || ""}
                </Typography>
                <Box sx={{ mt: 2, mb: 1 }}>
                  <Typography variant="subtitle2">Replies:</Typography>
                  {(topic.replies || []).map((r, idx) => (
                    <Paper key={idx} sx={{ p: 1, mb: 1, background: "#f5f5f5" }}>
                      <Typography variant="body2">{r.content}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {r.timestamp?.toDate?.().toLocaleString?.() || ""}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
                <TextField
                  label="Reply"
                  fullWidth
                  size="small"
                  sx={{ mt: 1 }}
                  value={reply[topic.id] || ""}
                  onChange={e => setReply({ ...reply, [topic.id]: e.target.value })}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 1, ml: 1 }}
                  onClick={() => handleReply(topic.id)}
                  disabled={saving || !reply[topic.id]}
                >
                  {saving ? "Posting..." : "Reply"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {topics.length === 0 && (
          <Typography sx={{ m: 4 }}>No topics yet. Start the first discussion!</Typography>
        )}
      </Grid>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">Discussion Forum</Typography>
        <Box sx={{ mb: 2 }}>
          {posts.map((post, idx) => (
            <Box key={idx} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {post.user} - {post.timestamp.toLocaleString()}
              </Typography>
              <Typography variant="body1">{post.text}</Typography>
            </Box>
          ))}
        </Box>
        <TextField
          label="Share your thoughts"
          value={message}
          onChange={e => setMessage(e.target.value)}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button variant="contained" onClick={handlePost} disabled={!message}>
          Post
        </Button>
      </Paper>
    </Box>
  );
};

export default Forum;