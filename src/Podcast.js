import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { ZB_COLORS } from "./theme";

const CYAN = ZB_COLORS.cyan;
const LIME = "#9dff00";
const GLOW = ZB_COLORS.cyanGlow;

const Mono = ({ children, sx }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", ...sx }}>{children}</Typography>
);

const podcastEpisodes = [
  { id: 1, title: "The Rise of Zambian Tech", guest: "Chipo Mwansa", role: "CTO, Lusaka startup", duration: "42 min", description: "Chipo shares her journey from student to CTO of a Lusaka-based startup.", audioUrl: "" },
  { id: 2, title: "Finance in Africa", guest: "John Banda", role: "Fintech founder", duration: "38 min", description: "John discusses the future of finance and fintech in Zambia and beyond.", audioUrl: "" },
  { id: 3, title: "Breaking into Procurement", guest: "Mule Tembo", role: "Supply chain lead", duration: "35 min", description: "A practical guide to starting a career in procurement and supply chain.", audioUrl: "" },
];

export function Podcast() {
  return (
    <Box sx={{ maxWidth: 860, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// listen"}</Mono>
      <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#fff", mb: 0.5 }}>Making of an Industry Giant</Typography>
      <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 4 }}>
        Conversations with Zambia's top professionals, entrepreneurs, and innovators.
      </Typography>

      {podcastEpisodes.map((ep, idx) => (
        <motion.div key={ep.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }}>
          <Box sx={{ background: ZB_COLORS.bgMid, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 3, mb: 2, display: "flex", gap: 2.5, alignItems: "flex-start", flexWrap: "wrap", transition: "all 0.2s", "&:hover": { borderColor: ZB_COLORS.borderBright } }}>
            <Box sx={{ width: 60, height: 60, borderRadius: "12px", background: "rgba(0,229,255,0.1)", border: `0.5px solid ${ZB_COLORS.borderBright}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
              <IconButton sx={{ color: CYAN, "&:hover": { boxShadow: `0 0 16px ${GLOW}` } }}>
                <Box sx={{ fontSize: "1.4rem", lineHeight: 1 }}>▶</Box>
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 220 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5, flexWrap: "wrap" }}>
                <Mono sx={{ fontSize: "0.66rem", color: CYAN, background: "rgba(0,229,255,0.1)", px: 0.75, py: 0.25, borderRadius: "3px", border: `0.5px solid ${ZB_COLORS.border}` }}>EP {String(ep.id).padStart(2, "0")}</Mono>
                <Mono sx={{ fontSize: "0.66rem", color: ZB_COLORS.textMuted }}>{ep.duration}</Mono>
              </Box>
              <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "1.05rem", mb: 0.25 }}>{ep.title}</Typography>
              <Typography sx={{ fontSize: "0.8rem", color: CYAN, fontFamily: "'Space Grotesk', sans-serif", mb: 1 }}>{ep.guest} · {ep.role}</Typography>
              <Typography sx={{ fontSize: "0.875rem", color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 2, lineHeight: 1.55 }}>{ep.description}</Typography>
              {ep.audioUrl ? (
                <audio controls src={ep.audioUrl} style={{ width: "100%", filter: "invert(0.85) hue-rotate(150deg)" }} />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, background: "rgba(0,229,255,0.04)", border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "8px", p: 1.5 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: LIME, boxShadow: `0 0 8px ${LIME}` }} />
                  <Mono sx={{ fontSize: "0.74rem", color: ZB_COLORS.textMuted }}>Coming soon — subscribe to be notified</Mono>
                </Box>
              )}
            </Box>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
}

export function Contact() {
  const channels = [
    { label: "Email", value: "info@zbridge.com", href: "mailto:info@zbridge.com", icon: "✉" },
    { label: "Phone", value: "+260 97 000 0000", href: "tel:+260970000000", icon: "☎" },
    { label: "LinkedIn", value: "Z-Bridge Zambia", href: "https://linkedin.com", icon: "in" },
  ];
  return (
    <Box sx={{ maxWidth: 720, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 8 }, textAlign: "center" }}>
      <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// get in touch"}</Mono>
      <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#fff", mb: 0.5 }}>Contact us</Typography>
      <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 4 }}>We'd love to hear from you. Reach out via any of these channels.</Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2 }}>
        {channels.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Box component="a" href={c.href} target="_blank" rel="noopener noreferrer"
              sx={{ display: "block", textDecoration: "none", background: ZB_COLORS.bgMid, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 3, textAlign: "center", transition: "all 0.2s", "&:hover": { borderColor: ZB_COLORS.borderBright, transform: "translateY(-3px)", boxShadow: `0 0 24px rgba(0,229,255,0.12)` } }}>
              <Box sx={{ width: 44, height: 44, borderRadius: "10px", background: "rgba(0,229,255,0.1)", border: `0.5px solid ${ZB_COLORS.borderBright}`, display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 1.5, color: CYAN, fontSize: "1.1rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{c.icon}</Box>
              <Mono sx={{ fontSize: "0.64rem", textTransform: "uppercase", letterSpacing: "0.08em", color: ZB_COLORS.textMuted, mb: 0.5 }}>{c.label}</Mono>
              <Typography sx={{ color: CYAN, fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem" }}>{c.value}</Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}

export function PrivacyPolicy() {
  const sections = [
    { title: "What we collect", body: "We collect basic profile information you voluntarily provide such as your name, profession, academic background, and selected interests. We do not collect sensitive personal data without explicit consent." },
    { title: "How we use your data", body: "Your information is used solely to personalise your ZBRIDGE experience — to recommend relevant simulations, resources, and mentors. We do not sell or share your data with third parties." },
    { title: "Data storage", body: "Data is stored securely using industry-standard infrastructure. We apply best-practice security to protect your information." },
    { title: "Your rights", body: "You can request deletion of your account and associated data at any time by contacting us at info@zbridge.com." },
    { title: "Contact", body: "If you have any questions about this privacy policy, reach out to info@zbridge.com." },
  ];
  return (
    <Box sx={{ maxWidth: 760, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// legal"}</Mono>
      <Typography variant="h3" sx={{ fontSize: { xs: "1.9rem", md: "2.4rem" }, color: "#fff", mb: 0.5 }}>Privacy Policy</Typography>
      <Mono sx={{ color: ZB_COLORS.textMuted, fontSize: "0.74rem", mb: 4 }}>last updated: january 2025</Mono>
      {sections.map(s => (
        <Box key={s.title} sx={{ mb: 3, pl: 2, borderLeft: `2px solid ${ZB_COLORS.border}` }}>
          <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", mb: 1 }}>{s.title}</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.7 }}>{s.body}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Podcast;
