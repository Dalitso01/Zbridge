import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Typography, Button } from "@mui/material";
import theme from "./theme";
import Layout from "./Layout";
import Home from "./Home";
import Contact from "./Contact";
import UserProfile from "./UserProfile";
import StudentDashboard from "./StudentDashboard";
import EmployerDashboard from "./EmployerDashboard";
import Podcast from "./Podcast";
import AdminPanel from "./AdminPanel";
import ReviewSubmissions from "./ReviewSubmissions";
import Library from "./Library";
import Forum from "./Forum";
import Simulations from "./Simulations";
import SimulationRunner from "./SimulationRunner";
import SimulationsList from "./SimulationsList";
import Login from "./Login";
import PrivacyPolicy from "./PrivacyPolicy";
import AboutSection from "./components/AboutSection";

const USER_KEY = "zbridge_user";

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY)) || null;
  } catch {
    return null;
  }
}

function NotFound() {
  return (
    <Box sx={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, px: 2, textAlign: "center" }}>
      <Typography variant="h4">Page not found</Typography>
      <Typography color="text.secondary">The page you're looking for doesn't exist.</Typography>
      <Button component={Link} to="/" variant="contained">Go home</Button>
    </Box>
  );
}

function App() {
  // Remember the signed-in user so a page refresh doesn't log them out.
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(USER_KEY);
    } catch {
      // Storage unavailable (private mode) — stay signed in for this visit only.
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout user={user} onLogout={() => setUser(null)}>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={!!user} />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<UserProfile user={user} onSave={setUser} />} />
            <Route path="/dashboard" element={<StudentDashboard profile={user} />} />
            <Route path="/employer" element={<EmployerDashboard />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/Simulation" element={<Simulations />} />
            <Route path="/Simulation/:simId" element={<SimulationRunner profile={user} />} />
            <Route path="/review" element={<ReviewSubmissions />} />
            <Route path="/library" element={<Library />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/simulations" element={<SimulationsList isLoggedIn={!!user} />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
