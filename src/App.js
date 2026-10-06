import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, Typography, Button, CircularProgress } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseReady } from "./firebase";
import { loadProfile, saveProfile, signOut } from "./auth";
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
import Signup from "./Signup";
import PrivacyPolicy from "./PrivacyPolicy";
import AboutSection from "./components/AboutSection";

// Demo mode (Firebase not configured yet): remember the user in this browser only.
const DEMO_USER_KEY = "zbridge_user";

function loadDemoUser() {
  if (firebaseReady) return null;
  try {
    return JSON.parse(localStorage.getItem(DEMO_USER_KEY)) || null;
  } catch {
    return null;
  }
}

function Loading() {
  return (
    <Box sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}

// Sends signed-out visitors to the login page, then back here after they sign in.
function RequireAuth({ user, authLoading, children }) {
  const location = useLocation();
  if (authLoading) return <Loading />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
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
  const [user, setUser] = useState(loadDemoUser);
  const [authLoading, setAuthLoading] = useState(firebaseReady);

  // Real accounts: follow Firebase's signed-in user and load their saved profile.
  useEffect(() => {
    if (!firebaseReady) return undefined;
    return onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setAuthLoading(false);
        return;
      }
      const base = { uid: fbUser.uid, email: fbUser.email, name: fbUser.displayName || "", avatarUrl: fbUser.photoURL || "" };
      setUser(prev => (prev?.uid === fbUser.uid ? { ...base, ...prev } : base));
      setAuthLoading(false);
      try {
        const profile = await loadProfile(fbUser.uid);
        if (profile) setUser(prev => (prev?.uid === fbUser.uid ? { ...prev, ...profile } : prev));
      } catch (err) {
        console.error("Could not load profile", err);
      }
    });
  }, []);

  useEffect(() => {
    if (firebaseReady) return;
    try {
      if (user) localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
      else localStorage.removeItem(DEMO_USER_KEY);
    } catch {
      // Storage unavailable (private mode) — stay signed in for this visit only.
    }
  }, [user]);

  // Merge fresh profile details into the signed-in user (after sign-up or a profile edit).
  const updateUser = useCallback((data) => setUser(prev => ({ ...prev, ...data })), []);

  const handleSaveProfile = useCallback(async (profile) => {
    if (firebaseReady) await saveProfile(user.uid, profile);
    updateUser(profile);
  }, [user, updateUser]);

  const handleLogout = useCallback(() => {
    if (firebaseReady) signOut();
    else setUser(null);
  }, []);

  const guard = (el) => <RequireAuth user={user} authLoading={authLoading}>{el}</RequireAuth>;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout user={user} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Home isLoggedIn={!!user} />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={guard(<UserProfile user={user} onSave={handleSaveProfile} />)} />
            <Route path="/dashboard" element={guard(<StudentDashboard profile={user} />)} />
            <Route path="/employer" element={<EmployerDashboard />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/Simulation" element={<Simulations />} />
            <Route path="/Simulation/:simId" element={guard(<SimulationRunner profile={user} />)} />
            <Route path="/review" element={<ReviewSubmissions />} />
            <Route path="/library" element={<Library />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/simulations" element={<SimulationsList isLoggedIn={!!user} />} />
            <Route path="/login" element={<Login user={user} onDemoLogin={setUser} />} />
            <Route path="/signup" element={<Signup user={user} onDemoLogin={setUser} onProfileChange={updateUser} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
