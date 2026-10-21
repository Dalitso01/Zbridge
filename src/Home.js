import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ZB_COLORS, ART_SHADOW, SOFT_SHADOW, HOVER_SHADOW } from "./theme";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useFeedback } from "./components/Feedback";

const { ink, paper, cobalt, sun, emerald } = ZB_COLORS;
const CREAM = ZB_COLORS.cardBg;

const features = [
  { Icon: SchoolOutlinedIcon, title: "Simulations", desc: "Real-world scenarios across fintech, agritech, healthcare, and more.", to: "/simulations", tag: "16 live" },
  { Icon: ForumOutlinedIcon, title: "Forum", desc: "Ask questions, share advice, and meet other students and young professionals.", to: "/forum", tag: "Community" },
  { Icon: HeadphonesOutlinedIcon, title: "Podcasts", desc: "Conversations with Zambian professionals about how they built their careers.", to: "/podcast", tag: "Coming soon" },
  { Icon: MenuBookOutlinedIcon, title: "Library", desc: "Hand-picked free courses and books to build skills employers look for.", to: "/library", tag: "Free" },
];

const quotes = [
  { text: "The more you learn, the more you earn.", author: "Warren Buffett" },
  { text: "The power which establishes a strong career is the same power that builds a strong character.", author: "Kenneth Kaunda" },
  { text: "Commit to lifelong learning. The most valuable asset you'll ever have is your mind.", author: "Brian Tracy" },
];

const stats = [
  { num: "16", label: "Simulations" },
  { num: "Free", label: "To join" },
  { num: "15", label: "Industries" },
];

const steps = [
  { n: "1", title: "Pick a real-world scenario", desc: "Choose from 16 simulations set in Zambian industries, from banking and audit to mining and healthcare." },
  { n: "2", title: "Do the work", desc: "Tackle the same tasks a junior professional would face, then compare your answer with a model answer and get instant AI feedback." },
  { n: "3", title: "Show what you can do", desc: "Download a certificate for each simulation you finish and talk about real work in your CV and interviews." },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
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

// Hero visual: a preview of a simulation task, styled like a work dashboard
const previewRows = [
  ["Revenue", "K 4,820,000", "K 4,350,000"],
  ["Cost of sales", "(K 2,910,000)", "(K 2,640,000)"],
  ["Gross profit", "K 1,910,000", "K 1,710,000"],
  ["Operating expenses", "(K 1,120,000)", "(K 1,060,000)"],
];

const HeroPreview = () => (
  <Box sx={{ position: "relative", width: "100%", maxWidth: 480, mx: "auto" }} aria-hidden="true">
    <Box sx={{ background: CREAM, border: `1px solid ${ZB_COLORS.border}`, borderRadius: 3, boxShadow: ART_SHADOW, overflow: "hidden" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, px: 2.5, py: 1.75, borderBottom: `1px solid ${ZB_COLORS.border}`, background: paper }}>
        <Box>
          <Typography sx={{ fontSize: "0.7rem", color: ZB_COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Audit simulation · Task 2 of 4</Typography>
          <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Review the income statement</Typography>
        </Box>
        <Box sx={{ fontSize: "0.7rem", fontWeight: 600, color: emerald, background: "rgba(15,123,95,0.08)", borderRadius: 1, px: 1, py: 0.4, whiteSpace: "nowrap" }}>In progress</Box>
      </Box>
      <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", fontSize: "0.72rem", color: ZB_COLORS.textMuted, fontWeight: 600, pb: 1, borderBottom: `1px solid ${ZB_COLORS.border}` }}>
          <span>Line item</span><Box component="span" sx={{ textAlign: "right" }}>2026</Box><Box component="span" sx={{ textAlign: "right" }}>2025</Box>
        </Box>
        {previewRows.map(([label, a, b], i) => (
          <Box key={label} sx={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", fontSize: { xs: "0.72rem", sm: "0.8rem" }, py: 1, borderBottom: i < previewRows.length - 1 ? `1px solid ${ZB_COLORS.border}` : "none", fontWeight: label === "Gross profit" ? 600 : 400, fontVariantNumeric: "tabular-nums" }}>
            <span>{label}</span><Box component="span" sx={{ textAlign: "right" }}>{a}</Box><Box component="span" sx={{ textAlign: "right", color: ZB_COLORS.textMuted }}>{b}</Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ mx: 2.5, mb: 2.5, mt: 1, p: 1.75, borderRadius: 2, background: ZB_COLORS.tint, borderLeft: `3px solid ${cobalt}` }}>
        <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: cobalt, mb: 0.25 }}>Your task</Typography>
        <Typography sx={{ fontSize: "0.8rem", color: ink, lineHeight: 1.5 }}>Revenue grew 10.8% but receivables doubled. Which risks would you raise with the audit senior?</Typography>
      </Box>
    </Box>
    <Box sx={{ position: { xs: "static", sm: "absolute" }, mt: { xs: 2, sm: 0 }, left: { sm: -28 }, bottom: { sm: -28 }, display: "inline-flex", alignItems: "center", gap: 1.25, background: CREAM, border: `1px solid ${ZB_COLORS.border}`, borderRadius: 2, boxShadow: SOFT_SHADOW, px: 2, py: 1.25 }}>
      <CheckCircleIcon sx={{ color: emerald, fontSize: 22 }} />
      <Box>
        <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, lineHeight: 1.3 }}>Instant feedback</Typography>
        <Typography sx={{ fontSize: "0.72rem", color: ZB_COLORS.textMuted, lineHeight: 1.3 }}>Compared with a model answer</Typography>
      </Box>
    </Box>
  </Box>
);

export default function Home({ isLoggedIn }) {
  const { openFeedback } = useFeedback();
  return (
    <>
      <Helmet>
        <title>ZBRIDGE | Career simulations for Zambian students</title>
      </Helmet>

      {/* HERO */}
      <Box sx={{ px: { xs: 2, md: 4 }, pt: { xs: 6, md: 10 }, pb: { xs: 6, md: 10 }, maxWidth: 1200, mx: "auto", overflow: "hidden" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.15fr 1fr" }, gap: { xs: 6, md: 6 }, alignItems: "center" }}>
          <Box>
            <motion.div {...fadeUp(0)}>
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, background: CREAM, border: `1px solid ${ZB_COLORS.border}`, borderRadius: 999, px: 1.75, py: 0.6, mb: 3 }}>
                <Box sx={{ width: 8, height: 8, borderRadius: "50%", background: emerald }} />
                <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
                  Made for Zambia
                </Typography>
              </Box>
            </motion.div>

            <motion.div {...fadeUp(0.1)}>
              <Typography variant="h1" sx={{ fontSize: { xs: "2.8rem", sm: "3.6rem", md: "4.6rem" }, lineHeight: 1.08, color: ink, mb: 3 }}>
                Bridge the gap between{" "}
                <Box component="span" sx={{ color: cobalt }}>learning</Box>{" "}
                and{" "}
                <Box component="span" sx={{ color: cobalt }}>doing</Box>
              </Typography>
            </motion.div>

            <motion.div {...fadeUp(0.2)}>
              <Typography sx={{ fontSize: { xs: "1.05rem", md: "1.2rem" }, color: ZB_COLORS.textMuted, maxWidth: 520, mb: 4 }}>
                Practise real work before your first job. ZBRIDGE gives students and graduates hands-on career simulations, instant feedback, and a community to grow with. Free to join.
              </Typography>
            </motion.div>

            <motion.div {...fadeUp(0.3)}>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button component={Link} to={isLoggedIn ? "/simulations" : "/signup"} variant="contained" size="large" sx={{ px: 4, py: 1.4, fontSize: "1rem" }}>
                  {isLoggedIn ? "Browse simulations" : "Get started free"}
                </Button>
                <Button component={Link} to={isLoggedIn ? "/dashboard" : "/simulations"} variant="outlined" size="large" sx={{ px: 3.5, py: 1.4, fontSize: "1rem", background: CREAM }}>
                  {isLoggedIn ? "My dashboard" : "See the simulations"}
                </Button>
              </Box>
            </motion.div>
          </Box>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <HeroPreview />
          </motion.div>
        </Box>

        {/* Stats */}
        <motion.div {...fadeUp(0.4)}>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: { xs: 1.5, md: 3 }, maxWidth: 640, mt: { xs: 6, md: 8 } }}>
            {stats.map((s, i) => (
              <Box key={s.label} sx={{ borderLeft: `3px solid ${[cobalt, sun, emerald][i]}`, pl: 2, py: 0.5 }}>
                <Typography sx={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 600, fontSize: { xs: "1.6rem", md: "2.1rem" }, lineHeight: 1.1, color: ink }}>{s.num}</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: ZB_COLORS.textMuted, fontWeight: 500 }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Box>

      {/* FEATURES */}
      <Box sx={{ borderTop: `1px solid ${ZB_COLORS.border}`, borderBottom: `1px solid ${ZB_COLORS.border}`, background: CREAM }}>
        <Section>
          <motion.div {...fadeUp(0)}>
            <Eyebrow color={cobalt}>What's on ZBRIDGE</Eyebrow>
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
                    background: CREAM, border: `1px solid ${ZB_COLORS.border}`, borderRadius: 2, boxShadow: SOFT_SHADOW,
                    p: 3, height: "100%", minHeight: 230, boxSizing: "border-box", position: "relative", overflow: "hidden",
                    transition: "transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease",
                    "&:hover": { transform: "translateY(-3px)", boxShadow: HOVER_SHADOW, borderColor: ZB_COLORS.borderBright },
                    "&:hover .arrow": { transform: "translateX(4px)" },
                  }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "10px", background: ZB_COLORS.tint, color: cobalt, display: "flex", alignItems: "center", justifyContent: "center" }}><f.Icon /></Box>
                    <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", textTransform: "uppercase", color: ZB_COLORS.textMuted, background: paper, border: `1px solid ${ZB_COLORS.border}`, borderRadius: 999, px: 1, py: 0.25, letterSpacing: "0.08em" }}>{f.tag}</Typography>
                  </Box>
                  <Typography sx={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 600, mb: 1, fontSize: "1.3rem" }}>{f.title}</Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: ZB_COLORS.textMuted, lineHeight: 1.6, flexGrow: 1 }}>{f.desc}</Typography>
                  <Typography className="arrow" sx={{ mt: 2, fontWeight: 600, color: cobalt, fontSize: "0.9rem", transition: "transform 0.18s ease" }}>Open →</Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Section>
      </Box>

      {/* HOW IT WORKS */}
      <Section>
        <motion.div {...fadeUp(0)}>
          <Eyebrow color={cobalt}>How it works</Eyebrow>
          <Typography variant="h2" sx={{ fontSize: { xs: "2.2rem", md: "3.2rem" }, color: ink, mb: 6, lineHeight: 1.02 }}>Learn by doing, in three steps</Typography>
        </motion.div>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 3 }}>
          {steps.map((st, i) => (
            <motion.div key={st.n} {...fadeUp(i * 0.1)} style={{ height: "100%" }}>
              <Box sx={{ height: "100%", boxSizing: "border-box", background: CREAM, border: `1px solid ${ZB_COLORS.border}`, borderRadius: 2, boxShadow: SOFT_SHADOW, p: 3.5 }}>
                <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", fontWeight: 500, color: cobalt, mb: 2, pb: 1.5, borderBottom: `1px solid ${ZB_COLORS.border}` }}>STEP 0{st.n}</Typography>
                <Typography sx={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 600, fontSize: "1.3rem", mb: 1 }}>{st.title}</Typography>
                <Typography sx={{ color: ZB_COLORS.textMuted, fontSize: "0.95rem" }}>{st.desc}</Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Section>

      {/* ABOUT BAND */}
      <Box sx={{ background: ink, color: CREAM, position: "relative", overflow: "hidden" }}>
                <Section sx={{ position: "relative" }}>
          <Box sx={{ maxWidth: 680 }}>
            <Eyebrow color={sun}>Our purpose</Eyebrow>
            <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mb: 2.5, lineHeight: 1.02 }}>What is ZBRIDGE?</Typography>
            <Typography sx={{ fontSize: { xs: "1.05rem", md: "1.15rem" }, opacity: 0.92 }}>
              ZBRIDGE is a career-readiness platform that transforms education into action. Through industry-inspired simulations and guided reflections, we help students and young professionals build real skills, explore career paths, and stand out, all before their first job.
            </Typography>
            <Button component={Link} to="/about" variant="contained"
              sx={{ mt: 4, px: 3.5, py: 1.1, background: CREAM, color: ink, "&:hover": { background: "#e6ebf2" } }}>
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
              <Box sx={{ display: "flex", flexDirection: "column", height: "100%", background: CREAM, color: ink, border: `1px solid ${ZB_COLORS.border}`, borderTop: `3px solid ${[cobalt, sun, emerald][i]}`, borderRadius: 2, boxShadow: SOFT_SHADOW, p: 3.5, minHeight: 210, boxSizing: "border-box" }}>
                <Typography sx={{ fontFamily: "'Source Serif 4', Georgia, serif", fontWeight: 600, fontSize: "3rem", lineHeight: 0.8, mb: 1, color: ZB_COLORS.borderBright }}>“</Typography>
                <Typography sx={{ fontFamily: "'Source Serif 4', Georgia, serif", fontSize: "1.1rem", lineHeight: 1.55, flexGrow: 1 }}>{q.text}</Typography>
                <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", fontWeight: 500, mt: 2.5, color: ZB_COLORS.textMuted }}>— {q.author}</Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Section>

      {/* EARLY ACCESS FEEDBACK */}
      <Section sx={{ pt: 0 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" }, gap: 3, alignItems: "center", background: ZB_COLORS.goldTint, border: `1px solid ${ZB_COLORS.border}`, borderLeft: `4px solid ${sun}`, borderRadius: 2, p: { xs: 3.5, md: 5 } }}>
          <Box>
            <Eyebrow color="#8a6a22">Early access</Eyebrow>
            <Typography variant="h3" sx={{ fontSize: { xs: "1.8rem", md: "2.4rem" }, mb: 1.5, lineHeight: 1.05 }}>Help us build ZBRIDGE with you</Typography>
            <Typography sx={{ fontSize: "1.02rem", maxWidth: 520 }}>
              We're opening ZBRIDGE to our first group of students and graduates. Try a simulation, then tell us what helped, what confused you, and what you wish it did. It takes two minutes.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, alignItems: { xs: "stretch", md: "flex-start" } }}>
            <Button variant="contained" size="large" onClick={() => openFeedback()} sx={{ px: 4, background: ink, color: CREAM, "&:hover": { background: "#14305a" } }}>
              Share your feedback
            </Button>
            <Button component={Link} to="/forum" variant="outlined" size="large" sx={{ px: 4, background: CREAM, "&:hover": { background: CREAM } }}>
              Join the conversation
            </Button>
          </Box>
        </Box>
      </Section>

      {/* CTA BANNER */}
      <Section sx={{ pt: 0 }}>
        <Box sx={{ background: `linear-gradient(135deg, ${ink} 0%, #14386a 100%)`, color: CREAM, borderRadius: 3, boxShadow: ART_SHADOW, p: { xs: 4, md: 7 }, position: "relative", overflow: "hidden" }}>
                    <Box sx={{ position: "relative", maxWidth: 600 }}>
            <Typography variant="h3" sx={{ fontSize: { xs: "2rem", md: "2.8rem" }, mb: 1.5, lineHeight: 1.05 }}>Ready to start your journey?</Typography>
            <Typography sx={{ opacity: 0.8, mb: 4, fontSize: "1.05rem" }}>Create a free account in under a minute and start your first simulation today.</Typography>
            <Button component={Link} to="/signup" variant="contained" size="large"
              sx={{ px: 4.5, py: 1.4, fontSize: "1.05rem", background: CREAM, color: ink, "&:hover": { background: "#e6ebf2" } }}>
              Create your free account
            </Button>
          </Box>
        </Box>
      </Section>
    </>
  );
}
