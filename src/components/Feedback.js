import React, { createContext, useCallback, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box, Typography, Button, TextField, Dialog, DialogContent, IconButton, Alert, CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ZB_COLORS } from "../theme";
import { FEEDBACK_TYPES, CONTACT_EMAIL, feedbackReady, submitFeedback, feedbackMailto } from "../feedback";

const { ink, cobalt, sun, emerald, vermilion } = ZB_COLORS;
const CREAM = ZB_COLORS.cardBg;

const RATINGS = [
  { value: 1, label: "Poor", emoji: "😞" },
  { value: 2, label: "Meh", emoji: "😕" },
  { value: 3, label: "Okay", emoji: "🙂" },
  { value: 4, label: "Good", emoji: "😀" },
  { value: 5, label: "Love it", emoji: "🤩" },
];

const FeedbackContext = createContext({ openFeedback: () => {} });

export const useFeedback = () => useContext(FeedbackContext);

// The feedback form itself. Used in the pop-up and inline (e.g. after a simulation).
export function FeedbackForm({ user, defaultType = "Idea", simulationId, prompt, compact = false, onDone }) {
  const location = useLocation();
  const [type, setType] = useState(defaultType);
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const canSend = (rating || message.trim()) && status !== "sending";
  const canEmailInstead = !feedbackReady && CONTACT_EMAIL;

  const handleSend = async () => {
    const payload = { type, rating, message, email, page: location.pathname, simulationId, user };
    if (!feedbackReady) {
      if (canEmailInstead) window.location.href = feedbackMailto(payload);
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      await submitFeedback(payload);
      setStatus("sent");
    } catch (err) {
      console.error("Could not send feedback", err);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <Box sx={{ textAlign: "center", py: compact ? 2 : 4 }}>
        <Box sx={{ width: 56, height: 56, borderRadius: "50%", background: emerald, border: `2px solid ${ink}`, boxShadow: `3px 3px 0 ${ink}`, mx: "auto", mb: 2, display: "flex", alignItems: "center", justifyContent: "center", color: CREAM, fontSize: "1.6rem", fontWeight: 800 }}>✓</Box>
        <Typography variant="h5" sx={{ mb: 1 }}>Thank you!</Typography>
        <Typography sx={{ color: ZB_COLORS.textMuted, mb: onDone ? 3 : 0 }}>
          Every message is read. You're helping shape ZBRIDGE for students across Zambia.
        </Typography>
        {onDone && <Button variant="contained" onClick={onDone}>Close</Button>}
      </Box>
    );
  }

  return (
    <Box>
      {prompt && <Typography sx={{ fontWeight: 700, mb: 1.5 }}>{prompt}</Typography>}

      <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, mb: 1 }}>How is your experience so far?</Typography>
      <Box role="radiogroup" aria-label="Rating" sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, mb: 2.5 }}>
        {RATINGS.map(r => {
          const active = rating === r.value;
          return (
            <Box key={r.value} component="button" type="button" role="radio" aria-checked={active} onClick={() => setRating(r.value)}
              sx={{
                cursor: "pointer", font: "inherit", color: ink, py: 1, px: 0.5,
                background: active ? sun : CREAM, border: `2px solid ${ink}`, borderRadius: 1,
                boxShadow: active ? `3px 3px 0 ${ink}` : "none", transform: active ? "translate(-1px, -1px)" : "none",
                transition: "all 0.12s ease", "&:hover": { background: active ? sun : "#fff3d6" },
              }}>
              <Box sx={{ fontSize: "1.4rem", lineHeight: 1.2 }}>{r.emoji}</Box>
              <Box sx={{ fontSize: "0.68rem", fontWeight: 600 }}>{r.label}</Box>
            </Box>
          );
        })}
      </Box>

      {!compact && (
        <>
          <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, mb: 1 }}>What's it about?</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2.5 }}>
            {FEEDBACK_TYPES.map(t => (
              <Box key={t} component="button" type="button" onClick={() => setType(t)} aria-pressed={type === t}
                sx={{
                  cursor: "pointer", font: "inherit", fontSize: "0.8rem", fontWeight: 600, px: 1.5, py: 0.5, borderRadius: 999,
                  border: `2px solid ${ink}`, background: type === t ? cobalt : CREAM, color: type === t ? CREAM : ink,
                }}>
                {t}
              </Box>
            ))}
          </Box>
        </>
      )}

      <TextField
        label={compact ? "What would make it better? (optional)" : "Tell us more"}
        placeholder={type === "Something's broken" ? "What happened, and what did you expect?" : "What do you like? What's missing? What confused you?"}
        multiline minRows={compact ? 2 : 4} fullWidth value={message}
        onChange={e => setMessage(e.target.value)} inputProps={{ maxLength: 2000 }} sx={{ mb: 2 }}
      />
      {!compact && (
        <TextField
          label="Your email (optional, so we can reply)" type="email" fullWidth size="small"
          value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }}
        />
      )}

      {status === "error" && (
        <Alert severity="error" sx={{ mb: 2 }}>We couldn't send that. Check your connection and try again.</Alert>
      )}
      {!feedbackReady && !CONTACT_EMAIL && (
        <Alert severity="info" sx={{ mb: 2 }}>Feedback is in preview mode on this version of the site, so it won't be saved yet.</Alert>
      )}

      <Button variant="contained" onClick={handleSend} disabled={!canSend} sx={{ px: 3 }}>
        {status === "sending" ? <CircularProgress size={20} sx={{ color: CREAM }} /> : canEmailInstead ? "Send by email" : "Send feedback"}
      </Button>
    </Box>
  );
}

export function FeedbackProvider({ user, children }) {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState({});

  const openFeedback = useCallback((options = {}) => {
    setOpts(options);
    setOpen(true);
  }, []);

  const close = () => setOpen(false);

  return (
    <FeedbackContext.Provider value={{ openFeedback }}>
      {children}
      <Dialog open={open} onClose={close} maxWidth="sm" fullWidth aria-labelledby="feedback-title">
        <Box sx={{ display: "flex", height: 8 }} aria-hidden="true">
          <Box sx={{ flex: 3, background: cobalt }} />
          <Box sx={{ flex: 1, background: sun }} />
          <Box sx={{ flex: 2, background: vermilion }} />
          <Box sx={{ flex: 1, background: emerald }} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", px: 3, pt: 2.5 }}>
          <Box>
            <Typography id="feedback-title" variant="h5">{opts.title || "Share your feedback"}</Typography>
            <Typography sx={{ color: ZB_COLORS.textMuted, fontSize: "0.9rem" }}>
              ZBRIDGE is in early access. Your honest thoughts decide what we build next.
            </Typography>
          </Box>
          <IconButton onClick={close} aria-label="Close" sx={{ color: ink, ml: 1 }}><CloseIcon /></IconButton>
        </Box>
        <DialogContent sx={{ pt: 2 }}>
          {open && <FeedbackForm user={user} defaultType={opts.type} onDone={close} />}
        </DialogContent>
      </Dialog>
    </FeedbackContext.Provider>
  );
}
