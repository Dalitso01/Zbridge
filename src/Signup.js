import React, { useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { Link, Navigate, useLocation } from "react-router-dom";
import { ZB_COLORS } from "./theme";
import { firebaseReady } from "./firebase";
import { signUp, signInWithGoogle, authErrorMessage } from "./auth";
import AuthCard, { GoogleButton } from "./components/AuthCard";

export default function Signup({ user, onDemoLogin, onProfileChange }) {
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(false);

  // New accounts go on to finish their profile; anyone already signed in goes to the dashboard.
  if (user) return <Navigate to={started ? "/profile" : location.state?.from || "/dashboard"} replace />;

  const run = async (action) => {
    setError("");
    setBusy(true);
    setStarted(true);
    try {
      await action();
    } catch (err) {
      setStarted(false);
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Please choose a password with at least 6 characters.");
      return;
    }
    if (!firebaseReady) {
      setStarted(true);
      onDemoLogin({ email, name });
      return;
    }
    run(async () => {
      await signUp({ name, email, password });
      onProfileChange({ name, email });
    });
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Free forever. Start your first simulation in minutes."
      footer={
        <>
          Already have an account?{" "}
          <Box component={Link} to="/login" state={location.state} sx={{ color: ZB_COLORS.gold, textDecoration: "none", fontWeight: 600 }}>
            Sign in
          </Box>
        </>
      }
    >
      {error && <Alert severity="error" sx={{ mb: 1 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Full name"
          autoComplete="name"
          fullWidth
          margin="normal"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <TextField
          label="Email address"
          type="email"
          autoComplete="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="new-password"
          helperText="At least 6 characters"
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
          disabled={busy}
          sx={{ mt: 2, py: 1.3, fontSize: "0.95rem" }}
        >
          {busy ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <GoogleButton onClick={() => run(signInWithGoogle)} disabled={busy} />
    </AuthCard>
  );
}
