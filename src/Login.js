import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ZB_COLORS } from "./theme";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, name: email.split("@")[0] });
    navigate("/dashboard");
  };

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", px: 2 }}>
      <Box
        sx={{
          width: "100%", maxWidth: 420,
          background: ZB_COLORS.navyMid,
          border: `0.5px solid ${ZB_COLORS.border}`,
          borderRadius: "16px",
          p: { xs: 3, md: 4 },
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            sx={{
              width: 44, height: 44, borderRadius: "10px",
              background: ZB_COLORS.gold,
              display: "flex", alignItems: "center", justifyContent: "center",
              mx: "auto", mb: 2,
            }}
          >
            <Typography sx={{ color: "#0a0a0a", fontWeight: 800, fontSize: "1.1rem", fontFamily: "Sora" }}>Z</Typography>
          </Box>
          <Typography variant="h5" sx={{ color: "#fff", fontFamily: "Sora", mb: 0.5 }}>Welcome back</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontSize: "0.875rem", fontFamily: "DM Sans" }}>
            Sign in to your ZBRIDGE account
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email address"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2.5, py: 1.3, fontSize: "0.95rem" }}
          >
            Sign in
          </Button>
        </form>

        <Typography sx={{ textAlign: "center", mt: 2.5, fontSize: "0.875rem", color: ZB_COLORS.textMuted, fontFamily: "DM Sans" }}>
          Don't have an account?{" "}
          <Box component={Link} to="/profile" sx={{ color: ZB_COLORS.gold, textDecoration: "none", fontWeight: 600 }}>
            Create one free
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
