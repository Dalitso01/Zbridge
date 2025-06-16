import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Grid, TextField, Button, Chip, Select, MenuItem,
  InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import firebase from "firebase/compat/app";
import app from "./firebase";

import { db } from "./firebase";

const categoriesList = ["Career", "Finance", "Law", "Technology", "Marketing", "Procurement", "Business", "Other"];

const defaultResources = [
  {
    title: "Introduction to Information Technology",
    link: "https://www.open.edu/openlearn/science-maths-technology/introduction-information-technology/content-section-0?active-tab=description-tab",
    category: "Technology",
    featured: true,
    tags: ["IT", "computers", "basics"],
    description: "A free Open University course covering IT fundamentals.",
    type: "Course"
  },
  {
    title: "Digital Marketing Basics",
    link: "https://www.coursera.org/learn/digital-marketing-basics",
    category: "Marketing",
    featured: false,
    tags: ["marketing", "digital", "basics"],
    description: "A beginner's course on digital marketing concepts.",
    type: "Course"
  },
  {
    title: "Procurement and Supply Chain Management",
    link: "https://www.open.edu/openlearn/money-business/procurement-and-supply-chain-management/content-section-0?active-tab=description-tab",
    category: "Procurement",
    featured: false,
    tags: ["procurement", "supply chain", "basics"],
    description: "Learn the essentials of procurement and supply chain.",
    type: "Course"
  },
  {
    title: "Business Communication Essentials",
    link: "https://www.saylor.org/courses/bus210/",
    category: "Business",
    featured: false,
    tags: ["business", "communication", "essentials"],
    description: "A free course on effective business communication.",
    type: "Course"
  },
  {
    title: "Personal Finance 101",
    link: "https://www.khanacademy.org/college-careers-more/personal-finance",
    category: "Finance",
    featured: false,
    tags: ["finance", "personal finance", "basics"],
    description: "Khan Academy's comprehensive personal finance course.",
    type: "Course"
  },
  {
    title: "Introduction to Business Law",
    link: "https://www.open.edu/openlearn/money-business/introduction-business-law/content-section-0?active-tab=description-tab",
    category: "Law",
    featured: false,
    tags: ["law", "business law", "basics"],
    description: "A free Open University course on business law.",
    type: "Course"
  },
  {
    title: "Entrepreneurship: Launching an Innovative Business",
    link: "https://www.coursera.org/learn/wharton-entrepreneurship",
    category: "Business",
    featured: true,
    tags: ["entrepreneurship", "business", "innovation"],
    description: "Wharton's free course on launching a business.",
    type: "Course"
  },
  {
    title: "IT Project Management",
    link: "https://www.saylor.org/courses/cs402/",
    category: "Technology",
    featured: false,
    tags: ["IT", "project management", "basics"],
    description: "A free course on IT project management.",
    type: "Course"
  },
  {
    title: "Marketing in a Digital World",
    link: "https://www.coursera.org/learn/marketing-digital",
    category: "Marketing",
    featured: false,
    tags: ["marketing", "digital", "strategy"],
    description: "Learn digital marketing strategies for the modern world.",
    type: "Course"
  },
  {
    title: "Supply Chain Fundamentals",
    link: "https://www.edx.org/course/supply-chain-fundamentals",
    category: "Procurement",
    featured: false,
    tags: ["supply chain", "procurement", "basics"],
    description: "Fundamentals of supply chain management.",
    type: "Course"
  },
  // --- Financial Literacy: Free Books (No Copyright) ---
  {
    title: "Financial Literacy for Youth (OpenStax Book)",
    link: "https://openstax.org/details/books/personal-finance",
    category: "Finance",
    featured: true,
    tags: ["finance", "financial literacy", "youth"],
    description: "A comprehensive, open-access textbook on personal finance.",
    type: "Book"
  },
  {
    title: "Financial Literacy for All (United Nations PDF Book)",
    link: "https://www.un.org/development/desa/dspd/wp-content/uploads/sites/22/2019/05/Financial-Literacy-Book.pdf",
    category: "Finance",
    featured: false,
    tags: ["finance", "financial literacy", "UN"],
    description: "A free UN book on financial literacy for all.",
    type: "Book"
  },
  {
    title: "Money Smart for Adults (FDIC Free Book)",
    link: "https://www.fdic.gov/resources/consumers/money-smart/adult.html",
    category: "Finance",
    featured: false,
    tags: ["finance", "financial literacy", "adults"],
    description: "FDIC's free book for adult financial education.",
    type: "Book"
  },
  {
    title: "Financial Literacy: Free eBook by OpenLearn",
    link: "https://www.open.edu/openlearn/money-business/money/money-management-and-financial-literacy/content-section-0?active-tab=description-tab",
    category: "Finance",
    featured: false,
    tags: ["finance", "financial literacy", "OpenLearn"],
    description: "OpenLearn's free eBook on money management.",
    type: "Book"
  },
  {
    title: "Your Money Matters: A Financial Literacy Guide (CFPB Toolkit)",
    link: "https://files.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_financial-empowerment_toolkit.pdf",
    category: "Finance",
    featured: false,
    tags: ["finance", "financial literacy", "CFPB"],
    description: "A free toolkit for financial empowerment.",
    type: "Book"
  },
  {
    title: "Practical Money Skills: Free Financial Literacy Lesson Plans",
    link: "https://www.practicalmoneyskills.com/teach/lesson_plans",
    category: "Finance",
    featured: false,
    tags: ["finance", "financial literacy", "lesson plans"],
    description: "Lesson plans for teaching financial literacy.",
    type: "Book"
  },
  {
    title: "Financial Literacy: Free PDF Book (Open University)",
    link: "https://www.open.edu/openlearn/money-business/money/money-management-and-financial-literacy/content-section-0?active-tab=content-tab",
    category: "Finance",
    featured: false,
    tags: ["finance", "financial literacy", "Open University"],
    description: "A free PDF book on financial literacy from Open University.",
    type: "Book"
  }
  // --- End Financial Literacy Books ---
];

const Library = () => {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [featured, setFeatured] = useState([]);
  const [suggestTitle, setSuggestTitle] = useState("");
  const [suggestLink, setSuggestLink] = useState("");
  const [suggestCategory, setSuggestCategory] = useState("");
  const [suggesting, setSuggesting] = useState(false);
  const [openResource, setOpenResource] = useState(null);

  // Fetch resources and featured
  useEffect(() => {
    db.collection("resources")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        let all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // If Firestore is empty, use defaultResources
        if (all.length === 0) {
          all = defaultResources;
        }
        setResources(all);
        setFeatured(all.filter(r => r.featured));
      });
  }, []);

  // Collect all tags from resources for the dropdown
  const allTags = Array.from(new Set(resources.flatMap(r => r.tags || [])));

  // Filtered resources
  const filtered = resources.filter(r =>
    (!category || r.category === category) &&
    (!search || r.title.toLowerCase().includes(search.toLowerCase())) &&
    (!tag || (r.tags && r.tags.includes(tag)))
  );

  // Suggest a resource
  const handleSuggest = async () => {
    setSuggesting(true);
    await db.collection("resourceSuggestions").add({
      title: suggestTitle,
      link: suggestLink,
      category: suggestCategory,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      approved: false
    });
    setSuggestTitle("");
    setSuggestLink("");
    setSuggestCategory("");
    setSuggesting(false);
    alert("Thank you! Your suggestion will be reviewed.");
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>Library & Resources</Typography>
      {/* Featured Content */}
      {featured.length > 0 && (
        <Paper sx={{ p: 3, mb: 3, background: "#fffde7" }}>
          <Typography variant="h6" color="secondary">🌟 Featured Resources</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {featured.map(res => (
              <Grid item xs={12} sm={6} md={4} key={res.id || res.title}>
                <Paper sx={{ p: 2, cursor: "pointer" }} onClick={() => setOpenResource(res)}>
                  <Typography variant="subtitle1">{res.title}</Typography>
                  <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                    <Chip label={res.category} size="small" />
                    {res.type && <Chip label={res.type} size="small" color="info" />}
                  </Box>
                  {res.description && (
                    <Typography variant="body2" sx={{ mb: 1 }}>{res.description}</Typography>
                  )}
                  <Button href={res.link} target="_blank" size="small" sx={{ mt: 1 }}>
                    View Resource
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
      {/* Search & Filter */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search resources"
              fullWidth
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={e => setCategory(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {categoriesList.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Tag</InputLabel>
              <Select
                value={tag}
                label="Tag"
                onChange={e => setTag(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {allTags.map(t => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      {/* Resource List */}
      <Grid container spacing={2}>
        {filtered.length === 0 ? (
          <Typography sx={{ m: 2 }}>No resources found.</Typography>
        ) : (
          filtered.map(res => (
            <Grid item xs={12} sm={6} md={4} key={res.id || res.title}>
              <Paper sx={{ p: 2, cursor: "pointer" }} onClick={() => setOpenResource(res)}>
                <Typography variant="subtitle1">{res.title}</Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <Chip label={res.category} size="small" />
                  {res.type && <Chip label={res.type} size="small" color="info" />}
                </Box>
                {res.description && (
                  <Typography variant="body2" sx={{ mb: 1 }}>{res.description}</Typography>
                )}
                <Button href={res.link} target="_blank" size="small" sx={{ mt: 1 }}>
                  View Resource
                </Button>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
      {/* Suggest a Resource */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>Suggest a Resource</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Title"
              fullWidth
              value={suggestTitle}
              onChange={e => setSuggestTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Link"
              fullWidth
              value={suggestLink}
              onChange={e => setSuggestLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={suggestCategory}
                label="Category"
                onChange={e => setSuggestCategory(e.target.value)}
              >
                {categoriesList.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSuggest}
          disabled={suggesting || !suggestTitle || !suggestLink || !suggestCategory}
        >
          {suggesting ? "Submitting..." : "Submit Suggestion"}
        </Button>
      </Paper>
      {/* Resource Detail Dialog */}
      <Dialog open={!!openResource} onClose={() => setOpenResource(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{openResource?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {openResource?.category} {openResource?.type ? `| ${openResource.type}` : ""}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {openResource?.description}
          </Typography>
          <Button href={openResource?.link} target="_blank" variant="contained">
            Go to Resource
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenResource(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Library;