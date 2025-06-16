import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Container } from "@mui/material";
import Navbar from "./Navbar";
import Home from "./Home";
import Contact from "./Contact";
import UserProfile from "./UserProfile";
import StudentDashboard from "./StudentDashboard";
import EmployerDashboard from "./EmployerDashboard";
import Podcast from "./Podcast";
import AdminPanel from "./AdminPanel";
import InternshipSimulation from "./InternshipSimulation";
import ReviewSubmissions from "./ReviewSubmissions";
import Library from "./Library";
import Forum from "./Forum";
import Layout from "./Layout";
import Simulations from "./Simulations";
import SimulationRunner from "./SimulationRunner";
import SimulationsList from "./SimulationsList";
import Login from "./Login"; // Your login component
import PrivacyPolicy from "./PrivacyPolicy";
import AboutSection from "./components/AboutSection"; // Ensure this is imported only once

const theme = createTheme({
  palette: {
    primary: { main: "#1a237e" }, // Deep blue
    secondary: { main: "#ffd600" }, // Gold accent
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { fontSize: "2rem", "@media (max-width:600px)": { fontSize: "1.3rem" } },
    h5: { fontSize: "1.3rem", "@media (max-width:600px)": { fontSize: "1.1rem" } },
  },
});

function App() {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);

  if (!profile) {
    return <UserProfile onSave={setProfile} />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/employer" element={<EmployerDashboard />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/Simulation" element={<Simulations />} />
            <Route path="/Simulation/:simId" element={<SimulationRunner />} />
            <Route path="/review" element={<ReviewSubmissions />} />
            <Route path="/library" element={<Library />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/simulations" element={<SimulationsList isLoggedIn={!!user} />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;