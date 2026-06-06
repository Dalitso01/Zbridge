import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Avatar, Fade, Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ZB_COLORS } from "../theme";

const RobotIcon = ({ size = 20, color = "#0d1f3c" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="5" y="8" width="14" height="11" rx="3" fill={color} />
    <circle cx="9" cy="13" r="1.5" fill="#ffd600" />
    <circle cx="15" cy="13" r="1.5" fill="#ffd600" />
    <path d="M12 4v3M9 16h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="3.5" r="1.5" fill={color} />
  </svg>
);

const SendIcon = ({ color = "#0d1f3c" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 8l12-5-5 12-2.5-4.5L2 8z" fill={color} />
  </svg>
);

// System prompt that gives the Guide its knowledge and personality
const SYSTEM_CONTEXT = `You are the ZBRIDGE Guide, a friendly AI career assistant for ZBRIDGE — a career-readiness platform for students and professionals in Zambia and across Africa.

ZBRIDGE offers:
- Career simulations across Finance, Agriculture, Healthcare, Energy, Education, Logistics, and Business (each co-designed with Zambian partners like Zanaco, BongoHive, Ministry of Health, ZESCO)
- A community forum, mentorship, podcasts, and a resource library
- Each simulation has tasks with model answers and AI feedback
- Certificates upon completion that can be added to LinkedIn and CVs

Your role:
- Help users pick the right simulation for their career goals
- Give practical career advice tailored to the Zambian/African job market
- Help with interview prep, CV tips, and skill development
- Be encouraging, concise, and culturally relevant

Keep responses under 100 words. Be warm but professional. Reference Zambian context where helpful (BongoHive, local employers, the realities of the African job market).`;

const quickReplies = [
  "Which simulation suits me?",
  "Help me prep for an interview",
  "Tips for my CV",
];

export default function ZBridgeGuide({ profile }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your ZBRIDGE Guide. I can help you pick simulations, prep for interviews, or explore careers in Zambia. What are you working on?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input;
    if (!userText.trim() || loading) return;

    const newMessages = [...messages, { role: "user", text: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Build conversation history for the API
      const apiMessages = newMessages.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_CONTEXT + (profile?.name ? `\n\nThe user's name is ${profile.name}.` : ""),
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Sorry, I couldn't respond just now. Please try again.";
      setMessages([...newMessages, { role: "assistant", text: reply }]);
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", text: "I'm having trouble connecting right now. Please check your internet and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <Zoom in={!open}>
        <Box
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: ZB_COLORS.gold,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(255,214,0,0.4)",
            zIndex: 1300,
            transition: "transform 0.2s",
            "&:hover": { transform: "scale(1.08)" },
          }}
        >
          <RobotIcon size={30} />
          <Box sx={{ position: "absolute", top: 4, right: 4, width: 12, height: 12, background: "#4caf50", borderRadius: "50%", border: "2px solid #ffd600" }} />
        </Box>
      </Zoom>

      {/* Chat window */}
      <Fade in={open}>
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: { xs: "calc(100vw - 32px)", sm: 380 },
            height: 540,
            maxHeight: "calc(100vh - 48px)",
            background: ZB_COLORS.navyMid,
            border: `0.5px solid rgba(255,255,255,0.12)`,
            borderRadius: "16px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 1300,
            boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
          }}
        >
          {/* Header */}
          <Box sx={{ background: ZB_COLORS.blue, p: "14px 16px", display: "flex", alignItems: "center", gap: 1.5, borderBottom: "0.5px solid rgba(255,255,255,0.1)" }}>
            <Box sx={{ position: "relative" }}>
              <Avatar sx={{ width: 38, height: 38, background: ZB_COLORS.gold }}>
                <RobotIcon size={20} />
              </Avatar>
              <Box sx={{ position: "absolute", bottom: 0, right: 0, width: 10, height: 10, background: "#4caf50", borderRadius: "50%", border: `2px solid ${ZB_COLORS.blue}` }} />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography sx={{ color: "#fff", fontSize: "0.875rem", fontWeight: 600, fontFamily: "Sora" }}>ZBRIDGE Guide</Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.55)", fontSize: "0.7rem", fontFamily: "DM Sans" }}>AI career assistant · Online</Typography>
            </Box>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "rgba(255,255,255,0.6)" }} size="small">
              ✕
            </IconButton>
          </Box>

          {/* Messages */}
          <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            {messages.map((msg, i) => (
              <Box key={i} sx={{ display: "flex", gap: 1, alignItems: "flex-start", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                {msg.role === "assistant" && (
                  <Avatar sx={{ width: 26, height: 26, background: ZB_COLORS.gold, flexShrink: 0 }}>
                    <RobotIcon size={14} />
                  </Avatar>
                )}
                <Box sx={{
                  background: msg.role === "user" ? ZB_COLORS.gold : "rgba(255,255,255,0.06)",
                  border: msg.role === "user" ? "none" : "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  borderTopRightRadius: msg.role === "user" ? "2px" : "12px",
                  borderTopLeftRadius: msg.role === "assistant" ? "2px" : "12px",
                  p: "10px 12px",
                  maxWidth: "75%",
                }}>
                  <Typography sx={{
                    color: msg.role === "user" ? "#0a0a0a" : "rgba(255,255,255,0.9)",
                    fontSize: "0.8rem",
                    lineHeight: 1.55,
                    fontFamily: "DM Sans",
                    whiteSpace: "pre-wrap",
                  }}>
                    {msg.text}
                  </Typography>
                </Box>
              </Box>
            ))}

            {loading && (
              <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                <Avatar sx={{ width: 26, height: 26, background: ZB_COLORS.gold, flexShrink: 0 }}>
                  <RobotIcon size={14} />
                </Avatar>
                <Box sx={{ background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.08)", borderRadius: "12px", borderTopLeftRadius: "2px", p: "12px 14px" }}>
                  <Box sx={{ display: "flex", gap: 0.5 }}>
                    {[0, 1, 2].map(d => (
                      <Box key={d} sx={{
                        width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.4)",
                        animation: "pulse 1.4s infinite", animationDelay: `${d * 0.2}s`,
                        "@keyframes pulse": { "0%, 60%, 100%": { opacity: 0.3 }, "30%": { opacity: 1 } },
                      }} />
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          {/* Quick replies */}
          {messages.length <= 1 && (
            <Box sx={{ px: 2, pb: 1, display: "flex", gap: 0.75, flexWrap: "wrap" }}>
              {quickReplies.map((q) => (
                <Box
                  key={q}
                  onClick={() => sendMessage(q)}
                  sx={{
                    fontSize: "0.72rem",
                    color: ZB_COLORS.gold,
                    border: `0.5px solid rgba(255,214,0,0.3)`,
                    borderRadius: "16px",
                    px: 1.5, py: 0.5,
                    cursor: "pointer",
                    fontFamily: "DM Sans",
                    "&:hover": { background: "rgba(255,214,0,0.1)" },
                  }}
                >
                  {q}
                </Box>
              ))}
            </Box>
          )}

          {/* Input */}
          <Box sx={{ p: "12px 16px", borderTop: "0.5px solid rgba(255,255,255,0.1)", display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              placeholder="Ask me anything…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === "Enter" && sendMessage()}
              fullWidth
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.06)",
                  fontSize: "0.8rem",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
                },
                "& input": { color: "#fff", fontFamily: "DM Sans" },
              }}
            />
            <Box
              onClick={() => sendMessage()}
              sx={{
                width: 34, height: 34, borderRadius: "50%",
                background: ZB_COLORS.gold,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
                opacity: input.trim() ? 1 : 0.5,
                transition: "opacity 0.2s",
              }}
            >
              <SendIcon />
            </Box>
          </Box>
        </Box>
      </Fade>
    </>
  );
}
