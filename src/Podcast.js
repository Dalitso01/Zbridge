import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ZB_COLORS } from "./theme";
import { FeedbackForm, useFeedback } from "./components/Feedback";
import { CONTACT_EMAIL } from "./feedback";

const CYAN = ZB_COLORS.cyan;
const LIME = "#0e8a5f";
const GLOW = ZB_COLORS.cyanGlow;

const Mono = ({ children, sx }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", ...sx }}>{children}</Typography>
);

// Season 1 topics. Add an audioUrl when an episode is recorded and it gets a player.
const podcastEpisodes = [
  { id: 1, title: "The Rise of Zambian Tech", description: "How young Zambians are building tech careers and companies from Lusaka to the Copperbelt.", audioUrl: "" },
  { id: 2, title: "Finance in Africa", description: "What it takes to build a career in banking, audit and fintech, and the skills employers look for.", audioUrl: "" },
  { id: 3, title: "Breaking into Procurement", description: "A practical guide to starting a career in procurement and supply chain.", audioUrl: "" },
];

export function Podcast() {
  const { openFeedback } = useFeedback();
  return (
    <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// listen"}</Mono>
      <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#14110f", mb: 0.5 }}>Making of an Industry Giant</Typography>
      <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 4 }}>
        Conversations with Zambian professionals, entrepreneurs, and innovators. Season 1 is in production.
      </Typography>

      {podcastEpisodes.map((ep, idx) => (
        <motion.div key={ep.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }}>
          <Box sx={{ background: ZB_COLORS.bgMid, border: `2px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 3, mb: 2, display: "flex", gap: 2.5, alignItems: "flex-start", flexWrap: "wrap", transition: "all 0.2s", "&:hover": { borderColor: ZB_COLORS.borderBright } }}>
            <Box sx={{ width: 60, height: 60, borderRadius: "12px", background: "rgba(31,64,214,0.1)", border: `2px solid ${ZB_COLORS.borderBright}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
              <Box sx={{ color: CYAN, fontSize: "1.4rem", lineHeight: 1 }} aria-hidden="true">▶</Box>
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 220 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, flexWrap: "wrap" }}>
                <Mono sx={{ fontSize: "0.66rem", color: CYAN, background: "rgba(31,64,214,0.1)", px: 0.75, py: 0.25, borderRadius: "3px", border: `2px solid ${ZB_COLORS.border}` }}>EP {String(ep.id).padStart(2, "0")}</Mono>
                <Mono sx={{ fontSize: "0.66rem", color: ZB_COLORS.textMuted }}>{ep.audioUrl ? "Listen now" : "Coming soon"}</Mono>
              </Box>
              <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#14110f", fontSize: "1.05rem", mb: 0.25 }}>{ep.title}</Typography>
              <Typography sx={{ fontSize: "0.875rem", color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 2, lineHeight: 1.55 }}>{ep.description}</Typography>
              {ep.audioUrl ? (
                <audio controls src={ep.audioUrl} style={{ width: "100%", filter: "invert(0.85) hue-rotate(150deg)" }} />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, background: "rgba(31,64,214,0.04)", border: `2px solid ${ZB_COLORS.border}`, borderRadius: "8px", p: 1.5 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: LIME, boxShadow: "none" }} />
                  <Mono sx={{ fontSize: "0.74rem", color: ZB_COLORS.textMuted }}>In production</Mono>
                </Box>
              )}
            </Box>
          </Box>
        </motion.div>
      ))}

      <Box sx={{ mt: 4, p: 3, background: ZB_COLORS.sun, border: "2px solid #14110f", boxShadow: "5px 5px 0 #14110f", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "1.05rem" }}>Who should we interview?</Typography>
          <Typography sx={{ fontSize: "0.9rem" }}>Suggest a guest or a topic you want to hear about.</Typography>
        </Box>
        <Button variant="contained" onClick={() => openFeedback({ type: "Content", title: "Suggest a guest or topic" })}>Suggest a guest</Button>
      </Box>
    </Box>
  );
}

export function Contact({ user }) {
  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 8 } }}>
      <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// get in touch"}</Mono>
      <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#14110f", mb: 0.5 }}>Contact us</Typography>
      <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 4 }}>
        A question, an idea, or something not working? Send us a message and we'll get back to you.
        {CONTACT_EMAIL && <> You can also email <Box component="a" href={`mailto:${CONTACT_EMAIL}`} sx={{ color: CYAN, fontWeight: 600 }}>{CONTACT_EMAIL}</Box>.</>}
      </Typography>
      <Box sx={{ background: ZB_COLORS.cardBg, border: "2px solid #14110f", boxShadow: "6px 6px 0 #14110f", p: { xs: 2.5, md: 4 } }}>
        <FeedbackForm user={user} defaultType="Other" />
      </Box>
    </Box>
  );
}

export function PrivacyPolicy() {
  const reachUs = CONTACT_EMAIL ? `email ${CONTACT_EMAIL} or use the form on our Contact page` : "use the form on our Contact page";
  const sections = [
    { title: "What we collect", body: "When you create an account we store your name and email address, plus any profile details you choose to add (such as your profession, qualifications, interests and skills). If you send us feedback we store your message, your rating, the page you were on and, if you give it, your email address." },
    { title: "How we use it", body: "We use your information to run your account, personalise ZBRIDGE (for example, recommending simulations), and improve the platform based on your feedback. We do not sell your data or share it with advertisers." },
    { title: "AI features", body: "When you ask the ZBRIDGE Guide a question or request AI feedback on a simulation answer, that text is sent to our AI provider (Anthropic) to generate a reply. Please don't include sensitive personal information in these messages." },
    { title: "Where it is stored", body: "Accounts and profiles are stored with Google Firebase, and the website is hosted on Vercel. Both use industry-standard security." },
    { title: "Your rights", body: `You can ask us to see, correct, or delete your account and data at any time. To do so, ${reachUs}.` },
    { title: "Questions", body: `If you have any questions about this policy, ${reachUs}.` },
  ];

  return (
    <Box sx={{ maxWidth: 760, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// legal"}</Mono>
      <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#14110f", mb: 0.5 }}>Privacy Policy</Typography>
      <Mono sx={{ color: ZB_COLORS.textMuted, fontSize: "0.74rem", mb: 4 }}>last updated: october 2026</Mono>
      {sections.map(s => (
        <Box key={s.title} sx={{ mb: 3, pl: 2, borderLeft: `2px solid ${ZB_COLORS.border}` }}>
          <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#14110f", mb: 1 }}>{s.title}</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.7 }}>{s.body}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Podcast;
