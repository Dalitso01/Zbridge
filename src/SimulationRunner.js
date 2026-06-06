import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button, TextField, Chip, CircularProgress, Collapse, Alert } from "@mui/material";
import { motion } from "framer-motion";
import simulations from "./simulationsData";
import { ZB_COLORS } from "./theme";
import { generateCertificate } from "./Certificate";
import { getAIFeedback } from "./aiFeedback";
import { notifySimulationComplete } from "./notifications";

const CYAN = ZB_COLORS.cyan;
const LIME = "#9dff00";
const GLOW = ZB_COLORS.cyanGlow;

const Mono = ({ children, sx }) => (
  <Typography sx={{ fontFamily: "'JetBrains Mono', monospace", ...sx }}>{children}</Typography>
);

const CheckIcon = ({ color = LIME }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ verticalAlign: "middle", marginRight: 6 }}>
    <circle cx="8" cy="8" r="8" fill={color} fillOpacity="0.15" />
    <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SparkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ verticalAlign: "middle", marginRight: 5 }}>
    <path d="M7 1l1.5 4H13l-3.5 2.5L11 12 7 9.5 3 12l1.5-4.5L1 5h4.5L7 1z" fill={CYAN} fillOpacity="0.9" />
  </svg>
);

export default function SimulationRunner({ profile }) {
  const { simId } = useParams();
  const sim = simulations.find(s => s.id === simId);
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState({});
  const [aiFeedback, setAIFeedback] = useState({});
  const [loadingFeedback, setLoadingFeedback] = useState({});
  const [taskSubmitted, setTaskSubmitted] = useState({});

  if (!sim) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h5" sx={{ color: "#fff", mb: 2 }}>Simulation not found</Typography>
        <Button component={Link} to="/simulations" variant="contained">Back to simulations</Button>
      </Box>
    );
  }

  const task = sim.tasks[activeStep];
  const isLast = activeStep === sim.tasks.length - 1;

  const handleSubmitTask = () => setTaskSubmitted(prev => ({ ...prev, [task.id]: true }));

  const handleGetAIFeedback = async () => {
    if (!answers[task.id]?.trim()) return;
    setLoadingFeedback(prev => ({ ...prev, [task.id]: true }));
    const feedback = await getAIFeedback(task.question, answers[task.id], task.modelAnswer, sim.title);
    setAIFeedback(prev => ({ ...prev, [task.id]: feedback }));
    setLoadingFeedback(prev => ({ ...prev, [task.id]: false }));
  };

  const handleNext = () => {
    if (isLast) {
      setSubmitted(true);
      if (profile) notifySimulationComplete(profile, sim);
    } else {
      setActiveStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleDownloadCert = () => {
    generateCertificate(
      profile?.name || "ZBRIDGE Graduate",
      sim.title,
      sim.partner,
      new Date().toLocaleDateString("en-ZM", { year: "numeric", month: "long", day: "numeric" })
    );
  };

  if (submitted) {
    return (
      <Box sx={{ maxWidth: 640, mx: "auto", px: 2, py: 8, textAlign: "center" }}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <Box sx={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(157,255,0,0.12)", border: `0.5px solid ${LIME}55`, display: "flex", alignItems: "center", justifyContent: "center", mx: "auto", mb: 3, boxShadow: `0 0 30px rgba(157,255,0,0.3)` }}>
            <CheckIcon color={LIME} />
          </Box>
        </motion.div>
        <Mono sx={{ fontSize: "0.7rem", color: LIME, letterSpacing: "0.15em", mb: 1.5 }}>{"// simulation complete"}</Mono>
        <Typography variant="h4" sx={{ color: "#fff", mb: 1 }}>Well done!</Typography>
        <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", mb: 0.5 }}>
          You completed all {sim.tasks.length} tasks in
        </Typography>
        <Typography sx={{ color: CYAN, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "1.1rem", mb: 3, textShadow: `0 0 16px ${GLOW}` }}>
          {sim.title}
        </Typography>

        {sim.partner && (
          <Box sx={{ background: "rgba(0,229,255,0.05)", border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "12px", p: 2, mb: 3 }}>
            <Mono sx={{ fontSize: "0.65rem", color: ZB_COLORS.textMuted, mb: 0.5, letterSpacing: "0.1em" }}>IN PARTNERSHIP WITH</Mono>
            <Typography sx={{ color: CYAN, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>{sim.partner}</Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, maxWidth: 340, mx: "auto" }}>
          <Button variant="contained" size="large" onClick={handleDownloadCert} sx={{ py: 1.3, fontSize: "0.95rem" }}>
            ⤓ Download certificate
          </Button>
          <Alert severity="info" sx={{ textAlign: "left", fontSize: "0.78rem", background: "rgba(0,229,255,0.06)", border: `0.5px solid ${ZB_COLORS.border}`, color: "rgba(230,247,255,0.8)", "& .MuiAlert-icon": { color: CYAN } }}>
            Add your certificate to LinkedIn and your CV — employers recognise ZBRIDGE simulations.
          </Alert>
          <Button component={Link} to="/simulations" sx={{ color: CYAN, border: `0.5px solid ${ZB_COLORS.borderBright}`, borderRadius: "6px", "&:hover": { background: "rgba(0,229,255,0.06)" } }}>
            Try another simulation
          </Button>
          <Button component={Link} to="/dashboard" sx={{ color: ZB_COLORS.textMuted, fontSize: "0.875rem" }}>
            Back to dashboard
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 820, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button component={Link} to="/simulations" sx={{ color: ZB_COLORS.textMuted, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", mb: 1.5, pl: 0 }}>
          ← back to simulations
        </Button>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1, minWidth: 220 }}>
            <Typography variant="h4" sx={{ color: "#fff", mb: 0.5 }}>{sim.title}</Typography>
            <Typography sx={{ color: ZB_COLORS.textMuted, fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem" }}>{sim.description}</Typography>
          </Box>
          {sim.partner && (
            <Chip label={sim.partner} size="small"
              sx={{ background: "rgba(0,229,255,0.08)", color: CYAN, border: `0.5px solid ${ZB_COLORS.borderBright}`, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", whiteSpace: "nowrap" }} />
          )}
        </Box>
      </Box>

      {/* Step indicators */}
      <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
        {sim.tasks.map((t, i) => (
          <Box key={t.id} onClick={() => i <= activeStep && setActiveStep(i)}
            sx={{
              width: 34, height: 34, borderRadius: "8px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.78rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600,
              cursor: i <= activeStep ? "pointer" : "default",
              background: i < activeStep ? "rgba(157,255,0,0.15)" : i === activeStep ? CYAN : "rgba(0,229,255,0.04)",
              color: i < activeStep ? LIME : i === activeStep ? "#060b1a" : "rgba(230,247,255,0.4)",
              border: i < activeStep ? `0.5px solid ${LIME}55` : i === activeStep ? "none" : `0.5px solid ${ZB_COLORS.border}`,
              boxShadow: i === activeStep ? `0 0 16px ${GLOW}` : "none",
              transition: "all 0.2s",
            }}>
            {i < activeStep ? "✓" : i + 1}
          </Box>
        ))}
        <Mono sx={{ fontSize: "0.72rem", color: ZB_COLORS.textMuted, ml: 1 }}>
          task {activeStep + 1}/{sim.tasks.length}
        </Mono>
      </Box>

      {/* Progress bar */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Mono sx={{ fontSize: "0.72rem", color: CYAN }}>{Math.round((activeStep / sim.tasks.length) * 100)}% complete</Mono>
          <Mono sx={{ fontSize: "0.72rem", color: ZB_COLORS.textMuted }}>{sim.duration}</Mono>
        </Box>
        <Box sx={{ height: 4, background: "rgba(0,229,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
          <Box sx={{ width: `${(activeStep / sim.tasks.length) * 100}%`, height: "100%", background: CYAN, borderRadius: 2, transition: "width 0.4s ease", boxShadow: `0 0 12px ${GLOW}` }} />
        </Box>
      </Box>

      {/* Task Card */}
      <motion.div key={task.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Box sx={{ background: ZB_COLORS.bgMid, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "16px", p: { xs: 2.5, md: 4 }, mb: 2 }}>
          <Chip label={`TASK ${activeStep + 1}`} size="small"
            sx={{ background: "rgba(0,229,255,0.1)", color: CYAN, border: `0.5px solid ${ZB_COLORS.borderBright}`, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem", mb: 2 }} />
          <Typography sx={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.05rem", lineHeight: 1.7, mb: 3 }}>
            {task.question}
          </Typography>

          <TextField label="Your answer" fullWidth multiline minRows={4}
            value={answers[task.id] || ""}
            onChange={e => setAnswers({ ...answers, [task.id]: e.target.value })}
            disabled={taskSubmitted[task.id]}
            sx={{ mb: 2 }} />

          {task.fileType && (
            <Box sx={{ mb: 3, p: 1.5, background: "rgba(0,229,255,0.03)", borderRadius: "8px", border: `0.5px solid ${ZB_COLORS.border}` }}>
              <Mono sx={{ fontSize: "0.7rem", color: ZB_COLORS.textMuted, mb: 1 }}>
                optional: attach a file ({task.fileType.toUpperCase()})
              </Mono>
              <input type="file" accept={task.fileType.split(",").map(t => "." + t.trim()).join(",")} style={{ color: "rgba(230,247,255,0.5)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem" }} />
            </Box>
          )}

          {/* Action buttons */}
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mb: 2 }}>
            {!taskSubmitted[task.id] && (
              <Button variant="contained" onClick={handleSubmitTask} disabled={!answers[task.id]?.trim()} sx={{ fontSize: "0.875rem" }}>
                <CheckIcon color="#060b1a" /> Submit answer
              </Button>
            )}
            {taskSubmitted[task.id] && !aiFeedback[task.id] && (
              <Button onClick={handleGetAIFeedback} disabled={loadingFeedback[task.id]}
                sx={{ background: "rgba(0,229,255,0.1)", color: CYAN, border: `0.5px solid ${ZB_COLORS.borderBright}`, borderRadius: "6px", fontSize: "0.875rem", "&:hover": { background: "rgba(0,229,255,0.18)", boxShadow: `0 0 16px ${GLOW}` } }}>
                {loadingFeedback[task.id] ? <CircularProgress size={16} sx={{ color: CYAN, mr: 1 }} /> : <SparkIcon />}
                {loadingFeedback[task.id] ? "Analysing…" : "Get AI feedback"}
              </Button>
            )}
            {taskSubmitted[task.id] && (
              <Button onClick={() => setShowModel(prev => ({ ...prev, [task.id]: !prev[task.id] }))}
                sx={{ background: "rgba(255,255,255,0.04)", color: "rgba(230,247,255,0.65)", border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "6px", fontSize: "0.875rem", "&:hover": { background: "rgba(255,255,255,0.08)" } }}>
                {showModel[task.id] ? "Hide model answer" : "See model answer"}
              </Button>
            )}
          </Box>

          {/* AI Feedback */}
          <Collapse in={!!aiFeedback[task.id]}>
            <Box sx={{ background: "rgba(0,229,255,0.06)", border: `0.5px solid ${ZB_COLORS.borderBright}`, borderRadius: "12px", p: 2.5, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                <SparkIcon />
                <Typography sx={{ color: CYAN, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.875rem" }}>AI Feedback</Typography>
              </Box>
              <Typography sx={{ color: "rgba(230,247,255,0.85)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {aiFeedback[task.id]}
              </Typography>
            </Box>
          </Collapse>

          {/* Model Answer */}
          <Collapse in={!!showModel[task.id]}>
            <Box sx={{ background: "rgba(157,255,0,0.05)", border: `0.5px solid ${LIME}33`, borderRadius: "12px", p: 2.5, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                <CheckIcon color={LIME} />
                <Typography sx={{ color: LIME, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.875rem" }}>Model answer</Typography>
              </Box>
              <Typography sx={{ color: "rgba(230,247,255,0.8)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.875rem", lineHeight: 1.75 }}>
                {task.modelAnswer}
              </Typography>
            </Box>
          </Collapse>
        </Box>
      </motion.div>

      {/* Navigation */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {activeStep > 0 ? (
          <Button onClick={() => setActiveStep(prev => prev - 1)} sx={{ color: ZB_COLORS.textMuted, border: `0.5px solid ${ZB_COLORS.border}`, borderRadius: "6px", px: 2, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>
            ← prev
          </Button>
        ) : <Box />}
        <Button variant="contained" onClick={handleNext} disabled={!taskSubmitted[task.id]} sx={{ fontSize: "0.9rem", px: 3 }}>
          {isLast ? "Complete →" : "Next task →"}
        </Button>
      </Box>

      {!taskSubmitted[task.id] && (
        <Mono sx={{ textAlign: "center", mt: 2, fontSize: "0.72rem", color: ZB_COLORS.textMuted }}>
          submit your answer to continue
        </Mono>
      )}
    </Box>
  );
}
