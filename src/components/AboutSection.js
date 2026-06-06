import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ZB_COLORS } from "../theme";

const CYAN = ZB_COLORS.cyan;
const LIME = "#9dff00";
const GLOW = ZB_COLORS.cyanGlow;

const Mono = ({ children, sx }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", ...sx }}>{children}</Typography>
);

const values = [
  { icon: "◎", title: "Purpose-driven", desc: "Everything we build is designed to create real impact for Zambian professionals.", color: CYAN },
  { icon: "◇", title: "Community-first", desc: "We grow together. ZBRIDGE is built by and for the African professional community.", color: LIME },
  { icon: "▷", title: "Learn by doing", desc: "Simulations, not textbooks. Real scenarios that prepare you for real challenges.", color: "#b388ff" },
  { icon: "⊕", title: "African context", desc: "Our content is built around the realities and opportunities of the African economy.", color: "#ffb300" },
];

const stats = [
  { num: "8", label: "Industries" },
  { num: "12+", label: "Simulations" },
  { num: "Free", label: "Forever" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function AboutSection() {
  return (
    <Box sx={{ maxWidth: 920, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      {/* Intro */}
      <motion.div {...fadeUp(0)}>
        <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// our story"}</Mono>
        <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, color: "#fff", mb: 2.5 }}>
          About <Box component="span" sx={{ color: CYAN, textShadow: `0 0 24px ${GLOW}` }}>ZBRIDGE</Box>
        </Typography>
        <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 2.5, fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 720 }}>
          ZBRIDGE is a career-readiness platform that transforms education into action. Through industry-inspired
          simulations and guided reflections, we help students and young professionals build real skills, explore
          career paths, and stand out in a competitive world — all before their first job.
        </Typography>
        <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 5, fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 720 }}>
          Whether you're preparing for your future or sharpening your edge, ZBRIDGE bridges the gap between what you
          know and what the world expects. Learn by doing. Grow with confidence. Enter the world ready.
        </Typography>
      </motion.div>

      {/* Stats strip */}
      <motion.div {...fadeUp(0.15)}>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: ZB_COLORS.border, mb: 6, borderRadius: "10px", overflow: "hidden", border: `0.5px solid ${ZB_COLORS.border}` }}>
          {stats.map(s => (
            <Box key={s.label} sx={{ background: ZB_COLORS.bg, py: 3, textAlign: "center" }}>
              <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.9rem", color: CYAN, textShadow: `0 0 16px ${GLOW}` }}>{s.num}</Typography>
              <Mono sx={{ fontSize: "0.66rem", color: ZB_COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</Mono>
            </Box>
          ))}
        </Box>
      </motion.div>

      {/* Values */}
      <motion.div {...fadeUp(0.25)}>
        <Mono sx={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: CYAN, fontWeight: 500, mb: 1 }}>{"// what drives us"}</Mono>
        <Typography variant="h3" sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, color: "#fff", mb: 3 }}>Our values</Typography>
      </motion.div>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2, mb: 6 }}>
        {values.map((v, i) => (
          <motion.div key={v.title} {...fadeUp(0.3 + i * 0.08)} style={{ height: "100%" }}>
            <Box sx={{ background: ZB_COLORS.cardBg, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 3, display: "flex", gap: 2, height: "100%", boxSizing: "border-box", transition: "all 0.2s", "&:hover": { borderColor: ZB_COLORS.borderBright, background: ZB_COLORS.cardHover } }}>
              <Box sx={{ width: 44, height: 44, borderRadius: "10px", background: v.color + "18", border: `0.5px solid ${v.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.3rem", color: v.color, textShadow: `0 0 12px ${v.color}66` }}>{v.icon}</Box>
              <Box>
                <Typography sx={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", mb: 0.5 }}>{v.title}</Typography>
                <Typography sx={{ fontSize: "0.875rem", color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.6 }}>{v.desc}</Typography>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>

      {/* CTA */}
      <motion.div {...fadeUp(0.5)}>
        <Box sx={{ background: "rgba(0,229,255,0.05)", border: `0.5px solid ${ZB_COLORS.borderBright}`, borderRadius: "14px", p: { xs: 3.5, md: 5 }, textAlign: "center", position: "relative", overflow: "hidden",
            "&::before": { content: '""', position: "absolute", top: "-50%", left: "50%", transform: "translateX(-50%)", width: 400, height: 280, background: "radial-gradient(ellipse, rgba(0,229,255,0.12) 0%, transparent 70%)", pointerEvents: "none" } }}>
          <Typography variant="h3" sx={{ fontSize: { xs: "1.5rem", md: "1.9rem" }, color: "#fff", mb: 1.5, position: "relative" }}>Ready to bridge the gap?</Typography>
          <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 3, position: "relative" }}>Join the community building real-world skills for the African economy.</Typography>
          <Button component={Link} to="/profile" variant="contained" size="large" sx={{ px: 4, py: 1.3, fontSize: "1rem", position: "relative" }}>Get started free</Button>
        </Box>
      </motion.div>
    </Box>
  );
}
