import { createTheme } from "@mui/material";

// Professional palette: deep navy ink, cool off-white paper, corporate blue
// with restrained gold, green and brick accents.
const INK = "#0b1f3a";
const PAPER = "#f5f7fa";
const CARD = "#ffffff";
const COBALT = "#1d4f91";
const VERMILION = "#b4443a";
const SUN = "#b8892f";
const EMERALD = "#0f7b5f";
const LINE = "#dde3eb";

export const ART_SHADOW = "0 1px 2px rgba(11,31,58,0.05), 0 8px 24px rgba(11,31,58,0.07)";
export const SOFT_SHADOW = "0 1px 2px rgba(11,31,58,0.06), 0 2px 8px rgba(11,31,58,0.05)";
export const HOVER_SHADOW = "0 2px 4px rgba(11,31,58,0.06), 0 12px 28px rgba(11,31,58,0.1)";

export const ZB_COLORS = {
  ink: INK,
  paper: PAPER,
  cobalt: COBALT,
  vermilion: VERMILION,
  sun: SUN,
  emerald: EMERALD,
  line: LINE,
  tint: "#eef3fa",
  goldTint: "#f7f1e3",
  black: INK,
  bg: PAPER,
  bgMid: CARD,
  surface: CARD,
  surfaceHover: "#f0f4f9",
  // "cyan" is the main accent name used across the app; it is now corporate blue
  cyan: COBALT,
  cyanDim: "rgba(29,79,145,0.08)",
  cyanGlow: "transparent",
  magenta: VERMILION,
  lime: EMERALD,
  white: CARD,
  textPrimary: INK,
  textMuted: "#5b6b80",
  border: LINE,
  borderBright: "#b9c4d3",
  cardBg: CARD,
  cardHover: "#f8fafc",
  // legacy aliases so older components still work
  navy: PAPER,
  navyMid: CARD,
  blue: COBALT,
  gold: COBALT,
  goldDim: "rgba(29,79,145,0.08)",
};

const DISPLAY = "'Source Serif 4', Georgia, serif";
const BODY = "'Inter', system-ui, sans-serif";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: COBALT, contrastText: CARD },
    secondary: { main: INK, contrastText: CARD },
    success: { main: EMERALD },
    warning: { main: "#b7791f" },
    error: { main: VERMILION },
    background: { default: PAPER, paper: CARD },
    text: { primary: INK, secondary: ZB_COLORS.textMuted },
    divider: LINE,
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: BODY,
    h1: { fontFamily: DISPLAY, fontWeight: 600, letterSpacing: "-0.02em" },
    h2: { fontFamily: DISPLAY, fontWeight: 600, letterSpacing: "-0.015em" },
    h3: { fontFamily: DISPLAY, fontWeight: 600, letterSpacing: "-0.01em" },
    h4: { fontFamily: DISPLAY, fontWeight: 600 },
    h5: { fontFamily: DISPLAY, fontWeight: 600 },
    h6: { fontFamily: BODY, fontWeight: 600 },
    body1: { fontFamily: BODY, lineHeight: 1.7 },
    body2: { fontFamily: BODY, lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: "none",
          fontFamily: BODY,
          fontWeight: 600,
          boxShadow: "none",
          transition: "background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
        },
        contained: {
          boxShadow: "none",
          "&:hover": { boxShadow: SOFT_SHADOW },
        },
        containedPrimary: {
          background: COBALT,
          color: CARD,
          "&:hover": { background: "#173f75" },
        },
        outlined: {
          border: `1px solid ${ZB_COLORS.borderBright}`,
          color: INK,
          "&:hover": { border: `1px solid ${COBALT}`, background: ZB_COLORS.tint },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: CARD,
          border: `1px solid ${LINE}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { boxShadow: "0 24px 64px rgba(11,31,58,0.18)" },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            fontFamily: BODY,
            background: CARD,
            "& fieldset": { borderColor: ZB_COLORS.borderBright },
            "&:hover fieldset": { borderColor: INK },
            "&.Mui-focused fieldset": { borderColor: COBALT },
          },
          "& .MuiInputLabel-root": { fontFamily: BODY },
          "& .MuiInputLabel-root.Mui-focused": { color: COBALT },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: BODY, fontSize: "0.75rem", fontWeight: 500 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        * { box-sizing: border-box; }
        body { background-color: ${PAPER}; margin: 0; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: ${PAPER}; }
        ::-webkit-scrollbar-thumb { background: #c3ccd8; border-radius: 6px; border: 2px solid ${PAPER}; }
        ::selection { background: rgba(29,79,145,0.18); color: ${INK}; }
      `,
    },
  },
});

export default theme;
