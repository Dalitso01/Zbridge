import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
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

function App() {
  const [user, setUser] = useState(null);

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
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
