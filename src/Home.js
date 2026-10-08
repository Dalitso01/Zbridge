import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ZB_COLORS, ART_SHADOW } from "./theme";

const { ink, paper, cobalt, vermilion, sun, emerald } = ZB_COLORS;
const CREAM = ZB_COLORS.cardBg;

const features = [
  { shape: "circle", color: cobalt, title: "Simulations", desc: "Real-world scenarios across fintech, agritech, healthcare, and more.", to: "/simulations", tag: "12 active" },
  { shape: "square", color: vermilion, title: "Forum", desc: "Publish, debate, and connect with professionals across the network.", to: "/forum", tag: "Live" },
  { shape: "triangle", color: sun, title: "Podcasts", desc: "In-depth discussions to stay informed and inspired on the go.", to: "/podcast", tag: "Audio" },
  { shape: "half", color: emerald, title: "Library", desc: "Curated resources to upskill and stay ahead in your field.", to: "/library", tag: "Free" },
];

const quotes = [
  { text: "The more you learn, the more you earn.", author: "Warren Buffett", bg: sun, fg: ink },
  { text: "The power which establishes a strong career is the same power that builds a strong character.", author: "Kenneth Kaunda", bg: cobalt, fg: CREAM },
  { text: "Commit to lifelong learning. The most valuable asset you'll ever have is your mind.", author: "Brian Tracy", bg: vermilion, fg: CREAM },
];

const stats = [
  { num: "16", label: "Simulations", bg: cobalt, fg: CREAM },
  { num: "Free", label: "To join", bg: sun, fg: ink },
  { num: "16", label: "Industries", bg: vermilion, fg: CREAM },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const float = (duration, distance = 10, rotate = 0) => ({
  animate: { y: [0, -distance, 0], rotate: [0, rotate, 0] },
  transition: { duration, repeat: Infinity, ease: "easeInOut" },
});

const Eyebrow = ({ children, color = ink }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.16em", color, fontWeight: 500, mb: 1.5 }}>
    {children}
  </Typography>
);

// Reusable section wrapper: consistent max width + padding everywhere
const Section = ({ children, sx }) => (
  <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 6, md: 9 }, maxWidth: 1200, mx: "auto", width: "100%", ...sx }}>
    {children}
  </Box>
);

// Small geometric glyph used on the feature cards
const Shape = ({ type, color, size = 44 }) => {
  const base = { width: size, height: size, border: `2px solid ${ink}`, background: color };
  if (type === "circle") return <Box sx={{ ...base, borderRadius: "50%" }} />;
  if (type === "square") return <Box sx={{ ...base, transform: "rotate(12deg)" }} />;
  if (type === "half") return <Box sx={{ ...base, height: size / 2, borderRadius: `${size}px ${size}px 0 0`, mt: `${size / 2}px` }} />;
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">
      <polygon points="22,3 42,41 2,41" fill={color} stroke={ink} strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
};

// The hero artwork: a Bauhaus-style composition of floating shapes
const HeroArt = () => (
  <Box sx={{ position: "relative", width: "100%", maxWidth: 460, aspectRatio: "1 / 1", mx: "auto" }} aria-hidden="true">
    <Box sx={{ position: "absolute", inset: "6% 4% 10% 10%", background: CREAM, border: `2px solid ${ink}`, boxShadow: `10px 10px 0 ${ink}` }} />
    <motion.div {...float(7, 12)} style={{ position: "absolute", top: "2%", right: "2%", width: "46%", aspectRatio: "1 / 1" }}>
      <Box sx={{ width: "100%", height: "100%", borderRadius: "50%", background: sun, border: `2px solid ${ink}` }} />
    </motion.div>
    <motion.div {...float(9, 8)} style={{ position: "absolute", left: "16%", bottom: "16%", width: "58%", aspectRatio: "2 / 1" }}>
      <Box sx={{ width: "100%", height: "100%", borderRadius: "999px 999px 0 0", background: cobalt, border: `2px solid ${ink}` }} />
    </motion.div>
    <motion.div {...float(6, 14, 8)} style={{ position: "absolute", left: "18%", top: "14%", width: "26%", aspectRatio: "1 / 1" }}>
      <Box sx={{ width: "100%", height: "100%", background: vermilion, border: `2px solid ${ink}`, transform: "rotate(-14deg)" }} />
    </motion.div>
    <motion.div {...float(8, 10, -6)} style={{ position: "absolute", right: "8%", bottom: "4%", width: "24%", aspectRatio: "1 / 1" }}>
      <svg viewBox="0 0 44 44" width="100%" height="100%">
        <polygon points="22,3 42,41 2,41" fill={emerald} stroke={ink} strokeWidth="2" strokeLinejoin="round" />
      </svg>
    </motion.div>
    {/* ink lines */}
    <Box sx={{ position: "absolute", left: "8%", top: "58%", width: "62%", height: 6, background: ink, transform: "rotate(-24deg)", transformOrigin: "left" }} />
    <Box sx={{ position: "absolute", left: "50%", top: "8%", width: 6, height: "40%", background: ink }} />
    <Box sx={{ position: "absolute", left: "4%", bottom: "6%", display: "grid", gridTemplateColumns: "repeat(4, 8px)", gap: "8px" }}>
      {Array.from({ length: 12 }).map((_, i) => <Box key={i} sx={{ width: 8, height: 8, borderRadius: "50%", background: ink }} />)}
    </Box>
  </Box>
);

export default function Home({ isLoggedIn }) {
  return (
    <>
      <Helmet>
        <title>ZBRIDGE: Bridge the Gap</title>
      </Helmet>

      {/* HERO */}
      <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 10 }, maxWidth: 1200, mx: "auto", overflow: "hidden" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.15fr 1fr" }, gap: { xs: 6, md: 6 }, alignItems: "center" }}>
          <Box>
            <motion.div {...fadeUp(0)}>
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, background: CREAM, border: `2px solid ${ink}`, borderRadius: 999, px: 1.75, py: 0.6, mb: 3, boxShadow: `3px 3px 0 ${ink}` }}>
                <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: emerald, border: `1.5px solid ${ink}` }} />
                <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
                  Made for Zambia
                </Typography>
              </Box>
            </motion.div>

            <motion.div {...fadeUp(0.1)}>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.8rem", sm: "3.6rem", md: "4.6rem" }, lineHeight: 0.98, color: ink, mb: 3 }}>
                Bridge the gap between{" "}
                <Box component="span" sx={{ display: "inline-block", background: cobalt, color: CREAM, px: 1.5, border: `2px solid ${ink}`, transform: "rotate(-2deg)", boxShadow: `5px 5px 0 ${ink}`, my: 0.5 }}>
                  learning
                </Box>{" "}
                and{" "}
                <Box component="span" sx={{ position: "relative", whiteSpace: "nowrap" }}>
                  doing
                  <Box component="svg" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true" sx={{ position: "absolute", left: 0, bottom: { xs: -8, md: -12 }, width: "100%", height: { xs: 12, md: 16 } }}>
                    <path d="M2 14 Q 25 2, 50 12 T 100 12 T 150 12 T 198 8" fill="none" stroke={vermilion} strokeWidth="6" strokeLinecap="round" />
                  </Box>
                </Box>
              </Typography>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <Typography sx={{ fontSize: { xs: "1.05rem", md: "1.2rem" }, color: ZB_COLORS.textMuted, maxWidth: 520, mb: 4 }}>
                ZBRIDGE connects you with real-world simulations, expert resources, and a community to accelerate your career in Africa.
              </Typography>
            </motion.div>

            <motion.div {...fadeUp(0.3)}>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button component={Link} to={isLoggedIn ? "/simulations" : "/signup"} variant="contained" size="large" sx={{ px: 4, py: 1.4, fontSize: "1rem" }}>
                  {isLoggedIn ? "Browse simulations" : "Get started free"}
                </Button>
                <Button component={Link} to="/about" variant="outlined" size="large" sx={{ px: 3.5, py: 1.4, fontSize: "1rem", background: CREAM }}>
                  Explore ZBRIDGE
                </Button>
              </Box>
            </motion.div>
          </Box>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <HeroArt />
          </motion.div>
        </Box>

        {/* Stats */}
        <motion.div {...fadeUp(0.4)}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: { xs: 1.5, md: 3 }, maxWidth: 640, mt: { xs: 6, md: 8 } }}>
            {stats.map((s, i) => (
              <Box key={s.label} sx={{ background: s.bg, color: s.fg, border: `2px solid ${ink}`, boxShadow: `4px 4px 0 ${ink}`, py: { xs: 2, md: 2.5 }, px: 2, transform: `rotate(${[-1.5, 1, -0.5][i]}deg)` }}>
                <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.2rem" }, lineHeight: 1.1 }}>{s.num}</Typography>
                <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Box>

      {/* FEATURES */}
      <Box sx={{ borderTop: `2px solid ${ink}`, borderBottom: `2px solid ${ink}`, background: CREAM }}>
        <Section>
          <motion.div {...fadeUp(0)}>
            <Eyebrow color={vermilion}>What's on ZBRIDGE</Eyebrow>
            <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" }, color: ink, mb: 1.5, lineHeight: 1.02 }}>Everything you need to grow</Typography>
            <Typography sx={{ color: ZB_COLORS.textMuted, mb: 6, maxWidth: 520, fontSize: "1.05rem" }}>
              From hands-on simulations to curated resources, built for the African professional.
            </Typography>
          </motion.div>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 3 }}>
            {features.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.08)} style={{ height: "100%" }}>
                <Box component={Link} to={f.to}
                  sx={{
                    display: "flex", flexDirection: "column", textDecoration: "none", color: ink,
                    background: paper, border: `2px solid ${ink}`, boxShadow: `4px 4px 0 ${ink}`,
                    p: 3, height: "100%", minHeight: 230, boxSizing: "border-box", position: "relative", overflow: "hidden",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease",
                    "&:hover": { transform: "translate(-4px, -4px)", boxShadow: `8px 8px 0 ${ink}`, background: CREAM },
                    "&:hover .arrow": { transform: "translateX(4px)" },
                  }}>
                  <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, height: 8, background: f.color, borderBottom: `2px solid ${ink}` }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mt: 1.5, mb: 3 }}>
                    <Shape type={f.shape} color={f.color} />
                    <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", textTransform: "uppercase", border: `1.5px solid ${ink}`, borderRadius: 999, px: 1, py: 0.25, letterSpacing: "0.08em" }}>{f.tag}</Typography>
                  </Box>
                  <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, mb: 1, fontSize: "1.35rem" }}>{f.title}</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: ZB_COLORS.textMuted, lineHeight: 1.6, flexGrow: 1 }}>{f.desc}</Typography>
                  <Typography className="arrow" sx={{ mt: 2, fontWeight: 700, transition: "transform 0.18s ease" }}>Open →</Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Section>
      </Box>

      {/* ABOUT BAND */}
      <Box sx={{ background: cobalt, color: CREAM, borderBottom: `2px solid ${ink}`, position: "relative", overflow: "hidden" }}>
        <Box aria-hidden="true" sx={{ position: "absolute", right: { xs: -120, md: -60 }, top: { xs: -80, md: -100 }, width: { xs: 240, md: 380 }, height: { xs: 240, md: 380 }, borderRadius: "50%", background: sun, border: `2px solid ${ink}` }} />
        <Box aria-hidden="true" sx={{ position: "absolute", left: -40, bottom: -40, width: 140, height: 140, background: vermilion, border: `2px solid ${ink}`, transform: "rotate(18deg)" }} />
        <Section sx={{ position: "relative" }}>
          <Box sx={{ maxWidth: 680 }}>
            <Eyebrow color={sun}>Our purpose</Eyebrow>
            <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2.5, lineHeight: 1.02 }}>What is ZBRIDGE?</Typography>
            <Typography sx={{ fontSize: { xs: "1.05rem", md: "1.15rem" }, opacity: 0.92 }}>
              ZBRIDGE is a career-readiness platform that transforms education into action. Through industry-inspired simulations and guided reflections, we help students and young professionals build real skills, explore career paths, and stand out, all before their first job.
            </Typography>
            <Button component={Link} to="/about" variant="contained"
              sx={{ mt: 4, px: 3.5, py: 1.1, background: sun, color: ink, "&:hover": { background: "#ffd04d" } }}>
              Read our story →
            </Button>
          </Box>
        </Section>
      </Box>

      {/* QUOTES */}
      <Section>
        <Eyebrow color={cobalt}>Words of wisdom</Eyebrow>
        <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, color: ink, mb: 5 }}>Stay inspired</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {quotes.map((q, i) => (
            <motion.div key={q.author} {...fadeUp(i * 0.1)} style={{ height: "100%" }}>
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%", background: q.bg, color: q.fg, border: `2px solid ${ink}`, boxShadow: ART_SHADOW, p: 3.5, minHeight: 230, boxSizing: "border-box", borderRadius: i === 1 ? "120px 4px 4px 4px" : 1 }}>
                <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "4rem", lineHeight: 0.8, mb: 1, alignSelf: i === 1 ? "flex-end" : "flex-start" }}>“</Typography>
                <Typography sx={{ fontSize: "1.05rem", lineHeight: 1.55, fontWeight: 500, flexGrow: 1 }}>{q.text}</Typography>
                <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", fontWeight: 500, mt: 2.5 }}>— {q.author}</Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Section>

      {/* CTA BANNER */}
      <Section sx={{ pt: 0 }}>
        <Box sx={{ background: ink, color: CREAM, border: `2px solid ${ink}`, boxShadow: `10px 10px 0 ${vermilion}`, p: { xs: 4, md: 7 }, position: "relative", overflow: "hidden" }}>
          <Box aria-hidden="true" sx={{ position: "absolute", right: { xs: -50, md: 40 }, top: { xs: -50, md: "50%" }, transform: { md: "translateY(-50%)" }, width: { xs: 140, md: 200 }, height: { xs: 140, md: 200 }, borderRadius: "50%", background: cobalt }} />
          <Box aria-hidden="true" sx={{ position: "absolute", right: { xs: 30, md: 170 }, bottom: { xs: -30, md: 30 }, width: { xs: 70, md: 90 }, height: { xs: 70, md: 90 }, background: sun, transform: "rotate(20deg)" }} />
          <Box sx={{ position: "relative", maxWidth: 600 }}>
            <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, mb: 1.5, lineHeight: 1.05 }}>Ready to start your journey?</Typography>
            <Typography sx={{ opacity: 0.8, mb: 4, fontSize: "1.05rem" }}>Join Zambian students and professionals building real-world skills on ZBRIDGE.</Typography>
            <Button component={Link} to="/signup" variant="contained" size="large"
              sx={{ px: 4.5, py: 1.4, fontSize: "1.05rem", background: sun, color: ink, border: `2px solid ${CREAM}`, boxShadow: `4px 4px 0 ${CREAM}`, "&:hover": { background: "#ffd04d", boxShadow: `6px 6px 0 ${CREAM}` } }}>
              Create your free account
            </Button>
          </Box>
        </Box>
      </Section>
    </>
  );
}
