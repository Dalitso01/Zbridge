import React from "react";
import { Box, Typography, Button, Divider, Alert } from "@mui/material";
import { ZB_COLORS } from "../theme";
import { firebaseReady } from "../firebase";

// Shared frame for the login and sign-up screens.
export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <Box sx={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", px: 2, py: 4 }}>
      <Box
        sx={{
          width: "100%", maxWidth: 420,
          background: ZB_COLORS.navyMid,
          border: `1px solid ${ZB_COLORS.border}`,
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
            <Typography sx={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem", fontFamily: "'Source Serif 4', Georgia, serif" }}>Z</Typography>
          </Box>
          <Typography variant="h5" sx={{ color: "#0b1f3a", fontFamily: "'Source Serif 4', Georgia, serif", mb: 0.5 }}>{title}</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontSize: "0.875rem", fontFamily: "'Inter', sans-serif" }}>
            {subtitle}
          </Typography>
        </Box>

        {!firebaseReady && (
          <Alert severity="info" sx={{ mb: 2, fontSize: "0.8rem" }}>
            Demo mode: accounts aren't saved yet. Any email and password will work.
          </Alert>
        )}

        {children}

        <Typography sx={{ textAlign: "center", mt: 2.5, fontSize: "0.875rem", color: ZB_COLORS.textMuted, fontFamily: "'Inter', sans-serif" }}>
          {footer}
        </Typography>
      </Box>
    </Box>
  );
}

export function GoogleButton({ onClick, disabled }) {
  if (!firebaseReady) return null;
  return (
    <>
      <Divider sx={{ my: 2.5, color: ZB_COLORS.textMuted, fontSize: "0.75rem", "&::before, &::after": { borderColor: ZB_COLORS.border } }}>
        OR
      </Divider>
      <Button
        fullWidth
        variant="outlined"
        size="large"
        onClick={onClick}
        disabled={disabled}
        sx={{ py: 1.2, borderColor: ZB_COLORS.border, color: "#0b1f3a", textTransform: "none", fontSize: "0.95rem" }}
      >
        Continue with Google
      </Button>
    </>
  );
}
