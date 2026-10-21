// Practical task building blocks for job simulations: the manager's brief,
// working documents, auto-checked calculations, decisions and a checklist.
// Colours come from the MUI theme palette so this follows whatever theme is active.
import React, { useState } from "react";
import {
  Box, Typography, Button, TextField, Table, TableHead, TableBody, TableRow, TableCell,
  Radio, RadioGroup, FormControlLabel, InputAdornment,
} from "@mui/material";

const panel = { border: "1px solid", borderColor: "divider", borderRadius: 1, bgcolor: "background.paper" };
const label = { fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "text.secondary", fontWeight: 600 };

export function TaskBrief({ brief }) {
  if (!brief) return null;
  return (
    <Box sx={{ ...panel, mb: 2.5 }}>
      <Box sx={{ px: 2, py: 1.25, borderBottom: "1px solid", borderColor: "divider" }}>
        <Typography sx={label}>Email from your manager</Typography>
        <Typography sx={{ fontSize: "0.85rem", mt: 0.5 }}><b>From:</b> {brief.from}</Typography>
        <Typography sx={{ fontSize: "0.85rem" }}><b>Subject:</b> {brief.subject}</Typography>
      </Box>
      <Typography sx={{ px: 2, py: 1.5, fontSize: "0.92rem", lineHeight: 1.7, whiteSpace: "pre-line" }}>{brief.body}</Typography>
    </Box>
  );
}

function DocumentTable({ doc }) {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {doc.columns.map((c, i) => (
              <TableCell key={i} align={i === 0 ? "left" : "right"} sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>{c}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {doc.rows.map((row, r) => (
            <TableRow key={r}>
              {row.map((cell, i) => (
                <TableCell key={i} align={i === 0 ? "left" : "right"} sx={{ whiteSpace: i === 0 ? "normal" : "nowrap" }}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export function TaskDocuments({ documents }) {
  if (!documents?.length) return null;
  return (
    <Box sx={{ mb: 2.5, display: "flex", flexDirection: "column", gap: 2 }}>
      {documents.map((doc, i) => (
        <Box key={i} sx={panel}>
          <Box sx={{ px: 2, py: 1.25, borderBottom: "1px solid", borderColor: "divider" }}>
            <Typography sx={label}>Document {i + 1}</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>{doc.title}</Typography>
          </Box>
          <Box sx={{ px: doc.columns ? 0 : 2, py: 1.25 }}>
            {doc.columns && <DocumentTable doc={doc} />}
            {doc.body && <Typography sx={{ fontSize: "0.9rem", lineHeight: 1.7, whiteSpace: "pre-line" }}>{doc.body}</Typography>}
          </Box>
          {doc.note && (
            <Typography sx={{ px: 2, pb: 1.5, pt: doc.columns ? 1 : 0, fontSize: "0.8rem", color: "text.secondary", whiteSpace: "pre-line" }}>{doc.note}</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

const toNumber = (v) => parseFloat(String(v).replace(/[^0-9.-]/g, ""));
const isCorrect = (field, value) => {
  const n = toNumber(value);
  return !Number.isNaN(n) && Math.abs(n - field.answer) <= (field.tolerance ?? 0.5);
};
const fmt = (n) => n.toLocaleString("en-US", { maximumFractionDigits: 2 });

// Calculations: the user types each figure, we check it against the answer.
export function NumbersTask({ task, done, onDone }) {
  const [values, setValues] = useState({});
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const allFilled = task.fields.every(f => String(values[f.id] ?? "").trim() !== "");
  const right = task.fields.filter(f => isCorrect(f, values[f.id])).length;

  const check = () => {
    setChecked(true);
    const next = attempts + 1;
    setAttempts(next);
    const allRight = task.fields.every(f => isCorrect(f, values[f.id]));
    if (allRight || next >= 2) onDone({ correct: right, total: task.fields.length });
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
        {task.fields.map(f => {
          const ok = checked && isCorrect(f, values[f.id]);
          const bad = checked && !ok;
          return (
            <Box key={f.id}>
              <TextField
                label={f.label} fullWidth size="small"
                inputProps={{ inputMode: "decimal" }}
                value={values[f.id] ?? ""}
                disabled={done}
                onChange={e => { setValues({ ...values, [f.id]: e.target.value }); setChecked(false); }}
                error={bad}
                color={ok ? "success" : "primary"}
                helperText={ok ? "Correct" : bad ? (done ? `Answer: ${f.prefix || ""}${fmt(f.answer)}${f.suffix ? " " + f.suffix : ""}` : "Not quite. Check your working and try again.") : f.hint}
                InputProps={{
                  startAdornment: f.prefix ? <InputAdornment position="start">{f.prefix}</InputAdornment> : undefined,
                  endAdornment: f.suffix ? <InputAdornment position="end">{f.suffix}</InputAdornment> : undefined,
                }}
              />
            </Box>
          );
        })}
      </Box>
      {!done && (
        <Button variant="contained" onClick={check} disabled={!allFilled}>
          {attempts === 0 ? "Check my figures" : "Check again"}
        </Button>
      )}
      {checked && (
        <Typography sx={{ mt: 1.5, fontSize: "0.9rem", fontWeight: 600, color: right === task.fields.length ? "success.main" : "text.primary" }}>
          {right} of {task.fields.length} figures correct.
          {!done && right < task.fields.length && " You have one more try before the worked solution is shown."}
        </Typography>
      )}
    </Box>
  );
}

// Decisions: pick one course of action and see why it works or doesn't.
export function DecisionTask({ task, done, onDone }) {
  const [choice, setChoice] = useState(null);
  const [reason, setReason] = useState("");
  const picked = choice !== null ? task.options[choice] : null;

  return (
    <Box sx={{ mb: 2 }}>
      <RadioGroup value={choice ?? ""} onChange={e => !done && setChoice(Number(e.target.value))}>
        {task.options.map((o, i) => {
          const showResult = done;
          const border = showResult && o.best ? "success.main" : showResult && i === choice ? "error.main" : "divider";
          return (
            <Box key={i} sx={{ ...panel, borderColor: border, borderWidth: showResult && (o.best || i === choice) ? 2 : 1, mb: 1, px: 1.5, py: 0.5 }}>
              <FormControlLabel value={i} disabled={done} control={<Radio size="small" />}
                label={<Typography sx={{ fontSize: "0.92rem", py: 0.75 }}>{o.label}</Typography>} />
              {showResult && (
                <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", pb: 1, pl: 4, lineHeight: 1.6 }}>
                  <b>{o.best ? "Best option. " : i === choice ? "Your choice. " : ""}</b>{o.feedback}
                </Typography>
              )}
            </Box>
          );
        })}
      </RadioGroup>
      {!done && (
        <>
          <TextField label="Why? (one or two sentences, optional)" fullWidth multiline minRows={2} size="small"
            value={reason} onChange={e => setReason(e.target.value)} sx={{ mt: 1, mb: 1.5 }} />
          <Button variant="contained" disabled={choice === null}
            onClick={() => onDone({ correct: picked.best ? 1 : 0, total: 1, answer: `${picked.label}${reason ? "\nReason: " + reason : ""}` })}>
            Confirm decision
          </Button>
        </>
      )}
      {done && picked && (
        <Typography sx={{ mt: 1, fontSize: "0.9rem", fontWeight: 600, color: picked.best ? "success.main" : "text.primary" }}>
          {picked.best ? "Good call. That is what an experienced professional would do." : "Not the strongest option. Read the feedback on each choice above."}
        </Typography>
      )}
    </Box>
  );
}

// What a strong written answer covers, so users can check their own work.
export function Checklist({ items }) {
  if (!items?.length) return null;
  return (
    <Box sx={{ ...panel, px: 2, py: 1.5, mb: 2 }}>
      <Typography sx={{ ...label, mb: 1 }}>A strong answer will</Typography>
      <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
        {items.map((c, i) => <Typography component="li" key={i} sx={{ fontSize: "0.88rem", lineHeight: 1.7 }}>{c}</Typography>)}
      </Box>
    </Box>
  );
}
