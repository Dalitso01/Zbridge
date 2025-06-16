import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Snackbar,
  Avatar,
  Chip,
  Divider,
  Stack,
} from "@mui/material";
import simulations from "./Simulations";
import mentors from "./Mentors";
import resources from "./ResourceLibrary";
import { getUserActivity } from "./UserActivity";
import { generateCertificate } from "./Certificate";

const events = [
  {
    title: "Hackathon 2025",
    date: "June 20, 2025",
    description: "Join our annual hackathon to showcase your skills.",
    link: "https://example.com/hackathon",
  },
  {
    title: "Leadership Webinar",
    date: "July 15, 2025",
    description: "Learn leadership skills from industry experts.",
    link: "https://example.com/webinar",
  },
];

export default function StudentDashboard({ profile }) {
  const [completedSimulations, setCompletedSimulations] = useState([]);
  const [inProgressSimulations, setInProgressSimulations] = useState([]);
  const [badges, setBadges] = useState([]);
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [reflection, setReflection] = useState("");
  const [saving, setSaving] = useState(false);
  const [recentReflections, setRecentReflections] = useState([]);
  const [openNotif, setOpenNotif] = useState(false);
  const [notifMsg, setNotifMsg] = useState("");
  const [posts, setPosts] = useState([
    { user: "Jane", text: "This simulation is really interesting!", timestamp: new Date() },
  ]);
  const [message, setMessage] = useState("");

  const totalSimulations = simulations.length;
  const progressCalc =
    totalSimulations === 0
      ? 0
      : Math.round((completedSimulations.length / totalSimulations) * 100);

  const recommendedSimulations = simulations
    .filter(
      (sim) =>
        !completedSimulations.some((cs) => cs.id === sim.id) &&
        !inProgressSimulations.some((ip) => ip.id === sim.id)
    )
    .slice(0, 3);

  const simResources = resources;
  const relevantMentors = mentors;

  const userActivity = getUserActivity();
  const recommendations = simulations.filter(sim =>
    sim.tags?.some(tag => userActivity.interests.includes(tag))
  );

  const handlePost = () => {
    if (!message) return;
    setPosts([
      ...posts,
      { user: "You", text: message, timestamp: new Date() },
    ]);
    setMessage("");
  };

  const handleReflectionSubmit = () => {
    setSaving(true);
    setTimeout(() => {
      setRecentReflections([
        { text: reflection, timestamp: new Date() },
        ...recentReflections,
      ]);
      setReflection("");
      setSaving(false);
    }, 1000);
  };

  const handleFlagPost = async (postId) => {
    if (window.confirm("Flag this post as inappropriate?")) {
      await db.collection("flaggedPosts").add({ postId, flaggedAt: new Date() });
      alert("Post flagged for review.");
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: 2 }}>
      {/* Header */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3, background: "linear-gradient(90deg, #e3ffe6 0%, #f9f9f9 100%)" }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Avatar src={profile?.avatarUrl} sx={{ width: 72, height: 72, boxShadow: 2 }} />
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Welcome, {profile?.name || "Student"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Level <b>{level}</b> &nbsp;|&nbsp; Points: <b>{points}</b>
            </Typography>
            <Box sx={{ mt: 1 }}>
              {badges.length > 0 &&
                badges.map((badge, idx) => (
                  <Chip
                    key={idx}
                    label={badge}
                    color="secondary"
                    size="small"
                    sx={{ mr: 1, mb: 1, background: "#d32f2f", color: "#fff" }}
                    avatar={<Avatar src={`/badges/${badge}.png`} alt={badge} />}
                  />
                ))}
            </Box>
          </Box>
        </Stack>
      </Paper>

      <Grid container spacing={4}>
        {/* Progress & Recommendations */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Progress
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box sx={{ flexGrow: 1, mr: 2 }}>
                <Box sx={{ height: 14, background: "#e0e0e0", borderRadius: 7, overflow: "hidden" }}>
                  <Box
                    sx={{
                      width: `${progressCalc}%`,
                      height: "100%",
                      background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                      borderRadius: 7,
                      transition: "width 0.5s",
                    }}
                  />
                </Box>
              </Box>
              <Typography variant="body2" fontWeight={600}>
                {progressCalc}% Complete
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Recommended Simulations
            </Typography>
            <Grid container spacing={2}>
              {recommendedSimulations.length === 0 ? (
                <Typography variant="body2" sx={{ m: 2 }}>
                  No recommendations at this time.
                </Typography>
              ) : (
                recommendedSimulations.map((sim, idx) => (
                  <Grid item xs={12} sm={6} md={4} key={sim.id}>
                    <Paper sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {sim.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {sim.description.slice(0, 60)}...
                      </Typography>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ mt: 2 }}
                        fullWidth
                      >
                        Start
                      </Button>
                    </Paper>
                  </Grid>
                ))
              )}
            </Grid>
          </Paper>

          {/* Discussion Forum */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Community Forum
            </Typography>
            <Box sx={{ maxHeight: 200, overflowY: "auto", mb: 2 }}>
              {posts.map((post, idx) => (
                <Box key={idx} sx={{ mb: 1.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {post.user} &bull; {post.timestamp.toLocaleString()}
                  </Typography>
                  <Typography variant="body1">{post.text}</Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => handleFlagPost(post.id)}
                  >
                    Flag
                  </Button>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
            </Box>
            <Stack direction="row" spacing={2}>
              <TextField
                label="Share your thoughts"
                value={message}
                onChange={e => setMessage(e.target.value)}
                fullWidth
                size="small"
              />
              <Button variant="contained" onClick={handlePost} disabled={!message}>
                Post
              </Button>
            </Stack>
          </Paper>

          {/* Reflection */}
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Reflection & Feedback
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              What did you learn from your last simulation? What would you do differently?
            </Typography>
            <TextField
              label="Your Reflection"
              multiline
              minRows={3}
              fullWidth
              sx={{ mb: 2 }}
              value={reflection}
              onChange={e => setReflection(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleReflectionSubmit}
              disabled={saving || !reflection}
            >
              {saving ? "Submitting..." : "Submit Reflection"}
            </Button>
            {recentReflections.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Your Recent Reflections
                </Typography>
                {recentReflections.map((r, idx) => (
                  <Paper key={idx} sx={{ p: 2, mb: 2, background: "#f5f5f5" }}>
                    <Typography variant="body2" color="text.secondary">
                      {r.timestamp?.toLocaleString?.() || ""}
                    </Typography>
                    <Typography variant="body1">{r.text}</Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sidebar: Resources & Mentors */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resources for You
            </Typography>
            {simResources.length === 0 ? (
              <Typography>No resources yet.</Typography>
            ) : (
              simResources.map((res, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <a href={res.url} target="_blank" rel="noopener noreferrer">
                    <b>{res.title}</b>
                  </a>
                  <Typography variant="caption" color="text.secondary">
                    &nbsp;({res.type})
                  </Typography>
                </Box>
              ))
            )}
          </Paper>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Mentors
            </Typography>
            {relevantMentors.length === 0 ? (
              <Typography>No mentors available for this topic yet.</Typography>
            ) : (
              relevantMentors.map((mentor, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">{mentor.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mentor.bio}
                  </Typography>
                  <Button
                    size="small"
                    href={`mailto:${mentor.email}`}
                    sx={{ mt: 1 }}
                  >
                    Request Feedback
                  </Button>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Recommended for You */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recommended for You
        </Typography>
        {recommendations.length === 0 ? (
          <Typography>No recommendations at this time.</Typography>
        ) : (
          recommendations.map((item, idx) => (
            <Box key={idx} sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Box>
          ))
        )}
      </Paper>

      {/* Upcoming Events */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Upcoming Events
        </Typography>
        {events.map((event, idx) => (
          <Box key={idx} sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{event.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {event.date} - {event.description}
            </Typography>
            <Button href={event.link} target="_blank" sx={{ mt: 1 }}>
              Learn More
            </Button>
          </Box>
        ))}
      </Paper>

      <Button
        variant="contained"
        onClick={() => generateCertificate(profile.name, "Simulation Title")}
        sx={{ mt: 2 }}
      >
        Download Certificate
      </Button>

      <Snackbar
        open={openNotif}
        autoHideDuration={6000}
        onClose={() => setOpenNotif(false)}
        message={notifMsg}
      />
    </Box>
  );
}