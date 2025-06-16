import React, { useState } from "react";
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, Grid, Avatar } from "@mui/material";

// Extensive interests and skills lists
const interestsList = [
  "Law", "Finance", "Marketing", "Purchasing", "Customer Service", "Technology", "Engineering",
  "Healthcare", "Education", "Entrepreneurship", "Agriculture", "Logistics", "Tourism",
  "Media", "Arts", "Science", "Environment", "Public Policy", "NGO/Nonprofit", "Sports",
  "Real Estate", "Retail", "Manufacturing", "Telecommunications", "Banking", "Insurance"
];

const skillsList = [
  "Legal Research", "Financial Analysis", "Digital Marketing", "Supply Chain Management", "Customer Support",
  "Programming", "Data Analysis", "Project Management", "Public Speaking", "Writing", "Critical Thinking",
  "Negotiation", "Leadership", "Teamwork", "Problem Solving", "Networking", "Sales", "Design Thinking",
  "Content Creation", "Social Media Management", "Event Planning", "Strategic Planning", "Time Management",
  "Adaptability", "Creativity", "Conflict Resolution", "Presentation Skills", "Market Research"
];

export default function UserProfile({ onSave }) {
  const [profile, setProfile] = useState({
    name: "",
    profession: "",
    academicQualification: "",
    interests: [],
    skills: [],
    avatarUrl: "",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (type, value) => {
    setProfile((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((i) => i !== value)
        : [...prev[type], value],
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>Complete Your Profile</Typography>
      <TextField label="Name" name="name" fullWidth margin="normal" value={profile.name} onChange={handleChange} />
      <TextField label="Profession" name="profession" fullWidth margin="normal" value={profile.profession} onChange={handleChange} />
      <TextField label="Academic Qualification" name="academicQualification" fullWidth margin="normal" value={profile.academicQualification} onChange={handleChange} />
      
      <Typography sx={{ mt: 2 }}>Select Your Interests:</Typography>
      <Grid container spacing={1}>
        {interestsList.map((interest) => (
          <Grid item xs={6} sm={4} key={interest}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={profile.interests.includes(interest)}
                  onChange={() => handleMultiSelect("interests", interest)}
                />
              }
              label={interest}
            />
          </Grid>
        ))}
      </Grid>

      <Typography sx={{ mt: 2 }}>Skills You Wish to Learn:</Typography>
      <Grid container spacing={1}>
        {skillsList.map((skill) => (
          <Grid item xs={6} sm={4} key={skill}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={profile.skills.includes(skill)}
                  onChange={() => handleMultiSelect("skills", skill)}
                />
              }
              label={skill}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ my: 2 }}>
        <Button variant="contained" component="label">
          Upload Profile Picture
          <input type="file" accept="image/*" hidden onChange={handleAvatarChange} />
        </Button>
        {profile.avatarUrl && (
          <Avatar src={profile.avatarUrl} sx={{ width: 56, height: 56, ml: 2 }} />
        )}
      </Box>

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>Save Profile</Button>
    </Box>
  );
}