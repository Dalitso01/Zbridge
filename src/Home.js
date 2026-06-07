import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ZB_COLORS } from "./theme";

const features = [
  { icon: "▢", title: "Simulations", desc: "Real-world scenarios across fintech, agritech, healthcare, and more.", to: "/simulations", tag: "12 ACTIVE" },
  { icon: "◇", title: "Forum", desc: "Publish, debate, and connect with professionals across the network.", to: "/forum", tag: "LIVE" },
  { icon: "◈", title: "Podcasts", desc: "In-depth discussions to stay informed and inspired on the go.", to: "/podcast", tag: "AUDIO" },
  { icon: "▣", title: "Library", desc: "Curated resources to upskill and stay ahead in your field.", to: "/library", tag: "FREE" },
];

const quotes = [
  { text: "The more you learn, the more you earn.", author: "Warren Buffett" },
  { text: "The power which establishes a strong career is the same power that builds a strong character.", author: "Kenneth Kaunda" },
  { text: "Commit to lifelong learning. The most valuable asset you'll ever have is your mind.", author: "Brian Tracy" },
];

const stats = [
  { num: "16", label: "Simulations" },
  { num: "Free", label: "To join" },
  { num: "16", label: "Industries" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const Mono = ({ children, sx }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", ...sx }}>{children}</Typography>
);

// Reusable section wrapper — consistent max width + padding everywhere
const Section = ({ children, sx }) => (
  <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 5, md: 8 }, maxWidth: 1200, mx: "auto", width: "100%", ...sx }}>
    {children}
  </Box>
);

export default function Home({ isLoggedIn }) {
  return (
    <>
      <Helmet>
        <title>ZBRIDGE — Bridge the Gap</title>
      </Helmet>

      {/* HERO */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 7, md: 11 },
          pb: { xs: 6, md: 9 },
          px: { xs: 2, md: 4 },
          textAlign: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -150, left: "50%", transform: "translateX(-50%)",
            width: 800, height: 550,
            background: "radial-gradient(ellipse, rgba(0,229,255,0.15) 0%, transparent 65%)",
            pointerEvents: "none",
          },
        }}
      >
        <motion.div {...fadeUp(0)}>
          <Box
            sx={{
              display: "inline-flex", alignItems: "center", gap: 1,
              background: "rgba(0,229,255,0.08)",
              color: ZB_COLORS.cyan,
              border: `0.5px solid ${ZB_COLORS.borderBright}`,
              fontSize: "0.7rem", fontWeight: 500,
              px: 1.5, py: 0.5, borderRadius: "4px",
              letterSpacing: "0.12em", textTransform: "uppercase",
              mb: 3, fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: ZB_COLORS.lime, boxShadow: `0 0 8px ${ZB_COLORS.lime}` }} />
            System online · For Zambia
          </Box>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <Typography variant="h1" sx={{ fontSize: { xs: "2.4rem", md: "4rem" }, fontWeight: 700, color: "#fff", lineHeight: 1.08, letterSpacing: "-0.03em", maxWidth: 820, mx: "auto", mb: 2.5 }}>
            Bridge the gap between{" "}
            <Box component="span" sx={{ color: ZB_COLORS.cyan, textShadow: `0 0 24px ${ZB_COLORS.cyanGlow}` }}>learning</Box>{" "}
            and doing
          </Typography>
        </motion.div>

        <motion.div {...fadeUp(0.2)}>
          <Typography sx={{ fontSize: { xs: "1.05rem", md: "1.2rem" }, color: ZB_COLORS.textMuted, maxWidth: 580, mx: "auto", mb: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
            ZBRIDGE connects you with real-world simulations, expert resources, and a community to accelerate your career in Africa.
          </Typography>
        </motion.div>

        <motion.div {...fadeUp(0.3)}>
          <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap" }}>
            <Button component={Link} to={isLoggedIn ? "/simulations" : "/profile"} variant="contained" size="large" sx={{ px: 4, py: 1.3, fontSize: "1rem" }}>
              {isLoggedIn ? "Browse simulations" : "Get started free"}
            </Button>
            <Button component={Link} to="/about" size="large"
              sx={{ px: 3.5, py: 1.3, fontSize: "1rem", color: ZB_COLORS.cyan, border: `0.5px solid ${ZB_COLORS.borderBright}`, borderRadius: "6px",
                "&:hover": { border: `0.5px solid ${ZB_COLORS.cyan}`, background: "rgba(0,229,255,0.06)", boxShadow: `0 0 16px ${ZB_COLORS.cyanGlow}` } }}>
              {"<"} Explore {"/>"}
            </Button>
          </Box>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.45)}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: ZB_COLORS.border, maxWidth: 520, mx: "auto", mt: 7, borderRadius: "8px", overflow: "hidden", border: `0.5px solid ${ZB_COLORS.border}` }}>
            {stats.map((s) => (
              <Box key={s.label} sx={{ background: ZB_COLORS.bg, py: 2.5, textAlign: "center" }}>
                <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: ZB_COLORS.cyan, textShadow: `0 0 16px ${ZB_COLORS.cyanGlow}` }}>{s.num}</Typography>
                <Mono sx={{ fontSize: "0.68rem", color: ZB_COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</Mono>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Box>

      {/* FEATURES */}
      <Section>
        <motion.div {...fadeUp(0)}>
          <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: ZB_COLORS.cyan, fontWeight: 500, mb: 1 }}>{"// what's on zbridge"}</Mono>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.9rem", md: "2.5rem" }, color: "#fff", mb: 1 }}>Everything you need to grow</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, mb: 5, maxWidth: 520, fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem" }}>
            From hands-on simulations to curated resources — built for the African professional.
          </Typography>
        </motion.div>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2 }}>
          {features.map((f, i) => (
            <motion.div key={f.title} {...fadeUp(i * 0.08)} style={{ height: "100%" }}>
              <Box component={Link} to={f.to}
                sx={{
                  display: "flex", flexDirection: "column", textDecoration: "none",
                  background: ZB_COLORS.cardBg, border: `0.5px solid ${ZB_COLORS.border}`,
                  borderRadius: "10px", p: 3, height: "100%", minHeight: 200, boxSizing: "border-box",
                  transition: "all 0.2s ease",
                  "&:hover": { background: ZB_COLORS.cardHover, borderColor: ZB_COLORS.borderBright, transform: "translateY(-3px)", boxShadow: `0 0 24px rgba(0,229,255,0.15)` },
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box sx={{ fontSize: "1.6rem", color: ZB_COLORS.cyan, textShadow: `0 0 12px ${ZB_COLORS.cyanGlow}` }}>{f.icon}</Box>
                  <Mono sx={{ fontSize: "0.6rem", color: ZB_COLORS.cyan, border: `0.5px solid ${ZB_COLORS.border}`, px: 0.75, py: 0.25, borderRadius: "3px", letterSpacing: "0.08em" }}>{f.tag}</Mono>
                </Box>
                <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", mb: 1, fontSize: "1.1rem" }}>{f.title}</Typography>
                <Typography sx={{ fontSize: "0.88rem", color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.6 }}>{f.desc}</Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Section>

      {/* ABOUT BAND */}
      <Box sx={{ background: "rgba(0,229,255,0.04)", borderTop: `0.5px solid ${ZB_COLORS.border}`, borderBottom: `0.5px solid ${ZB_COLORS.border}`, px: { xs: 2, md: 4 }, py: { xs: 6, md: 8 }, textAlign: "center" }}>
        <Box sx={{ maxWidth: 720, mx: "auto" }}>
          <Typography variant="h3" sx={{ fontSize: { xs: "1.6rem", md: "2.2rem" }, color: "#fff", mb: 2 }}>What is ZBRIDGE?</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem" }}>
            ZBRIDGE is a career-readiness platform that transforms education into action. Through industry-inspired simulations and guided reflections, we help students and young professionals build real skills, explore career paths, and stand out — all before their first job.
          </Typography>
          <Button component={Link} to="/about"
            sx={{ mt: 3, color: ZB_COLORS.cyan, border: `0.5px solid ${ZB_COLORS.borderBright}`, borderRadius: "6px", px: 3, py: 0.9, fontSize: "0.9rem",
              "&:hover": { background: "rgba(0,229,255,0.08)", boxShadow: `0 0 16px ${ZB_COLORS.cyanGlow}` } }}>
            Read our story →
          </Button>
        </Box>
      </Box>

      {/* QUOTES */}
      <Section>
        <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: ZB_COLORS.cyan, fontWeight: 500, mb: 1 }}>{"// words of wisdom"}</Mono>
        <Typography variant="h3" sx={{ fontSize: { xs: "1.6rem", md: "2.2rem" }, color: "#fff", mb: 4 }}>Stay inspired</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
          {quotes.map((q, i) => (
            <Box key={i} sx={{ display: "flex", flexDirection: "column", background: ZB_COLORS.cardBg, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "10px", p: 3.5, minHeight: 200, boxSizing: "border-box" }}>
              <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "3rem", lineHeight: 1, color: ZB_COLORS.cyan, opacity: 0.4, mb: 1.5 }}>"</Typography>
              <Typography sx={{ fontStyle: "italic", color: "rgba(230,247,255,0.78)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.95rem", lineHeight: 1.65, mb: "auto", flexGrow: 1 }}>{q.text}</Typography>
              <Mono sx={{ fontSize: "0.8rem", fontWeight: 500, color: ZB_COLORS.cyan, mt: 2 }}>— {q.author}</Mono>
            </Box>
          ))}
        </Box>
      </Section>

      {/* CTA BANNER */}
      <Section sx={{ pt: 0 }}>
        <Box sx={{ background: "rgba(0,229,255,0.05)", borderRadius: "14px", border: `0.5px solid ${ZB_COLORS.borderBright}`, p: { xs: 4, md: 6 }, textAlign: "center", position: "relative", overflow: "hidden",
            "&::before": { content: '""', position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: 500, height: 350, background: "radial-gradient(ellipse, rgba(0,229,255,0.12) 0%, transparent 70%)", pointerEvents: "none" } }}>
          <Typography variant="h3" sx={{ fontSize: { xs: "1.7rem", md: "2.2rem" }, color: "#fff", mb: 1.5, position: "relative" }}>Ready to start your journey?</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 3.5, position: "relative", fontSize: "1.05rem" }}>Join Zambian students and professionals building real-world skills on ZBRIDGE.</Typography>
          <Button component={Link} to="/profile" variant="contained" size="large" sx={{ px: 4.5, py: 1.4, fontSize: "1.05rem", position: "relative" }}>Create your free account</Button>
        </Box>
      </Section>
    </>
  );
}
