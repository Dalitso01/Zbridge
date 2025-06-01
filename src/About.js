import React from "react";
import { Box, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import ForumIcon from "@mui/icons-material/Forum";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const features = [
  {
    icon: <SchoolIcon color="primary" />,
    title: "Virtual Internship Simulation",
    desc: "Gain hands-on experience with real-world tasks and scenarios."
  },
  {
    icon: <WorkIcon color="secondary" />,
    title: "Employer Engagement",
    desc: "Connect with top employers and showcase your skills."
  },
  {
    icon: <LibraryBooksIcon color="success" />,
    title: "Resource Library",
    desc: "Access free, high-quality courses, books, and guides."
  },
  {
    icon: <ForumIcon color="info" />,
    title: "Community Forum",
    desc: "Ask questions, share experiences, and get mentorship."
  },
  {
    icon: <EmojiObjectsIcon color="warning" />,
    title: "Career Insights",
    desc: "Explore career paths and get advice from professionals."
  }
];

const About = () => (
  <Box sx={{ maxWidth: 900, mx: "auto", mt: 5, p: { xs: 2, md: 4 } }}>
    <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, mb: 4, background: "#e3f2fd" }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}>
        About Z-Bridge
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Z-Bridge is a digital ecosystem connecting Zambian students and professionals with practical work experiences, career insights, and mentorship opportunities.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Our mission is to bridge the gap between education and employment by providing accessible, real-world learning and networking opportunities for everyone.
      </Typography>
    </Paper>
    <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
      What Makes Us Unique?
    </Typography>
    <Grid container spacing={3}>
      {features.map((f, idx) => (
        <Grid item xs={12} sm={6} md={4} key={idx}>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            <List>
              <ListItem>
                <ListItemIcon>{f.icon}</ListItemIcon>
                <ListItemText
                  primary={<Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{f.title}</Typography>}
                  secondary={f.desc}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Paper elevation={0} sx={{ mt: 5, p: 3, background: "#f5f5f5", textAlign: "center" }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Join us and start your journey to a brighter future!
      </Typography>
    </Paper>
  </Box>
);

export default About;