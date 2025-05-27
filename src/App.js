import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Container } from "@mui/material";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Profile from "./Profile";
import StudentDashboard from "./StudentDashboard";
import EmployerDashboard from "./EmployerDashboard";
import TaskSubmission from "./TaskSubmission";
import Podcast from "./Podcast";
import AdminPanel from "./AdminPanel";
import InternshipSimulation from "./InternshipSimulation";
import ReviewSubmissions from "./ReviewSubmissions";
import Library from "./Library";
import Forum from "./Forum";

const theme = createTheme({
  palette: {
    primary: { main: "#1a237e" }, // Deep blue
    secondary: { main: "#ffd600" }, // Gold accent
    background: { default: "#f5f5f5" }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif"
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/employer" element={<EmployerDashboard />} />
            <Route path="/submit-task" element={<TaskSubmission />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/simulation" element={<InternshipSimulation />} />
            <Route path="/review" element={<ReviewSubmissions />} />
            <Route path="/library" element={<Library />} />
            <Route path="/forum" element={<Forum />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;