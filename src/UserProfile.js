import React, { useState, useEffect } from "react";
import {
  Box, TextField, Button, Typography, Avatar, Chip, Alert,
} from "@mui/material";
import Grid from "./components/Grid";
import { useNavigate } from "react-router-dom";
import { ZB_COLORS } from "./theme";

const interestsList = [
  "Law", "Finance", "Marketing", "Purchasing", "Customer Service", "Technology", "Engineering",
  "Healthcare", "Education", "Entrepreneurship", "Agriculture", "Logistics", "Tourism",
  "Media", "Arts", "Science", "Environment", "Public Policy", "NGO/Nonprofit", "Sports",
  "Real Estate", "Retail", "Manufacturing", "Banking", "Insurance",
];

const skillsList = [
  "Legal Research", "Financial Analysis", "Digital Marketing", "Supply Chain Management", "Customer Support",
  "Programming", "Data Analysis", "Project Management", "Public Speaking", "Writing", "Critical Thinking",
  "Negotiation", "Leadership", "Teamwork", "Problem Solving", "Networking", "Sales", "Design Thinking",
  "Content Creation", "Social Media Management", "Event Planning", "Strategic Planning", "Time Management",
  "Adaptability", "Creativity", "Conflict Resolution", "Presentation Skills", "Market Research",
];

const SectionLabel = ({ children }) => (
  <Typography sx={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", color: ZB_COLORS.gold, fontWeight: 600, mb: 1.5, mt: 3, fontFamily: "DM Sans" }}>
    {children}
  </Typography>
);

// Shrink a photo to a small square-ish JPEG so it fits comfortably in the database.
function resizeImage(file, maxSize = 256) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(img.src);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

export default function UserProfile({ user, onSave }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: user?.name || "",
    profession: user?.profession || "",
    academicQualification: user?.academicQualification || "",
    phone: user?.phone || "",
    interests: user?.interests || [],
    skills: user?.skills || [],
    avatarUrl: user?.avatarUrl || "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // The saved profile can arrive after this page opens — fill in anything still blank.
  useEffect(() => {
    if (!user) return;
    setProfile(prev => {
      const next = { ...prev };
      for (const key of Object.keys(prev)) {
        const empty = Array.isArray(prev[key]) ? prev[key].length === 0 : !prev[key];
        if (empty && user[key]) next[key] = user[key];
      }
      return next;
    });
  }, [user]);

  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });

  const toggle = (type, value) => {
    setProfile(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(i => i !== value)
        : [...prev[type], value],
    }));
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const avatarUrl = await resizeImage(file);
      setProfile(prev => ({ ...prev, avatarUrl }));
    } catch {
      setError("That image couldn't be read. Please try a JPG or PNG.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSave(profile);
      navigate("/dashboard");
    } catch (err) {
      console.error("Profile save failed", err);
      setError("Your profile couldn't be saved. Check your connection and try again.");
      setSaving(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 760, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
      <Typography variant="h4" sx={{ color: "#fff", mb: 0.5 }}>Your profile</Typography>
      <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "DM Sans", mb: 4 }}>
        Tell us about yourself so we can personalise your experience.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          background: ZB_COLORS.navyMid,
          border: `0.5px solid ${ZB_COLORS.border}`,
          borderRadius: "16px",
          p: { xs: 2.5, md: 4 },
        }}
      >
        {/* Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            src={profile.avatarUrl}
            sx={{ width: 64, height: 64, background: ZB_COLORS.blue, fontSize: "1.5rem", fontWeight: 700, border: `2px solid ${ZB_COLORS.gold}` }}
          >
            {profile.name?.[0] || "?"}
          </Avatar>
          <Box>
            <Button variant="outlined" component="label" size="small"
              sx={{ borderColor: ZB_COLORS.border, color: "rgba(255,255,255,0.7)", fontFamily: "DM Sans" }}
            >
              Upload photo
              <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
            </Button>
            <Typography sx={{ fontSize: "0.75rem", color: ZB_COLORS.textMuted, mt: 0.5, fontFamily: "DM Sans" }}>JPG or PNG</Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Full name" name="name" fullWidth value={profile.name} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Profession / Role" name="profession" fullWidth value={profile.profession} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Highest academic qualification" name="academicQualification" fullWidth value={profile.academicQualification} onChange={handleChange} />
          <Grid item xs={12} sm={6}>
            <TextField label="Phone number (for WhatsApp updates)" name="phone" fullWidth value={profile.phone} onChange={handleChange} placeholder="09x xxx xxxx" />
          </Grid>
          </Grid>
        </Grid>

        <SectionLabel>Select your interests</SectionLabel>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {interestsList.map(interest => (
            <Chip
              key={interest}
              label={interest}
              onClick={() => toggle("interests", interest)}
              sx={{
                cursor: "pointer",
                background: profile.interests.includes(interest) ? "rgba(255,214,0,0.15)" : "rgba(255,255,255,0.05)",
                border: `0.5px solid ${profile.interests.includes(interest) ? ZB_COLORS.gold : ZB_COLORS.border}`,
                color: profile.interests.includes(interest) ? ZB_COLORS.gold : "rgba(255,255,255,0.65)",
                fontFamily: "DM Sans",
                "&:hover": { background: "rgba(255,214,0,0.1)" },
              }}
            />
          ))}
        </Box>

        <SectionLabel>Skills you want to develop</SectionLabel>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {skillsList.map(skill => (
            <Chip
              key={skill}
              label={skill}
              onClick={() => toggle("skills", skill)}
              sx={{
                cursor: "pointer",
                background: profile.skills.includes(skill) ? "rgba(255,214,0,0.15)" : "rgba(255,255,255,0.05)",
                border: `0.5px solid ${profile.skills.includes(skill) ? ZB_COLORS.gold : ZB_COLORS.border}`,
                color: profile.skills.includes(skill) ? ZB_COLORS.gold : "rgba(255,255,255,0.65)",
                fontFamily: "DM Sans",
                "&:hover": { background: "rgba(255,214,0,0.1)" },
              }}
            />
          ))}
        </Box>

        {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}

        <Button type="submit" variant="contained" size="large" disabled={saving} sx={{ mt: 4, px: 4 }}>
          {saving ? "Saving…" : "Save profile"}
        </Button>
      </Box>
    </Box>
  );
}
