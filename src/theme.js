import { createTheme } from "@mui/material";

export const ZB_COLORS = {
  // Cyber/neon palette
  black: "#060b1a",
  bg: "#060b1a",
  bgMid: "#0a1228",
  surface: "rgba(0,229,255,0.03)",
  surfaceHover: "rgba(0,229,255,0.07)",
  cyan: "#00e5ff",
  cyanDim: "rgba(0,229,255,0.12)",
  cyanGlow: "rgba(0,229,255,0.4)",
  magenta: "#ff2d78",
  lime: "#9dff00",
  white: "#ffffff",
  textPrimary: "#e6f7ff",
  textMuted: "rgba(230,247,255,0.5)",
  border: "rgba(0,229,255,0.15)",
  borderBright: "rgba(0,229,255,0.35)",
  cardBg: "rgba(0,229,255,0.03)",
  cardHover: "rgba(0,229,255,0.07)",
  // legacy aliases so older components still work
  navy: "#060b1a",
  navyMid: "#0a1228",
  blue: "#0a1228",
  gold: "#00e5ff",
  goldDim: "rgba(0,229,255,0.12)",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: ZB_COLORS.cyan },
    secondary: { main: ZB_COLORS.magenta },
    background: { default: ZB_COLORS.bg, paper: ZB_COLORS.bgMid },
    text: { primary: ZB_COLORS.textPrimary, secondary: ZB_COLORS.textMuted },
  },
  typography: {
    fontFamily: "'Space Grotesk', 'JetBrains Mono', sans-serif",
    h1: { fontWeight: 700, letterSpacing: "-0.03em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600, letterSpacing: "-0.02em" },
    h4: { fontWeight: 600, letterSpacing: "-0.01em" },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.7 },
    body2: { fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: "none",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
        },
        containedPrimary: {
          background: ZB_COLORS.cyan,
          color: "#060b1a",
          boxShadow: "0 0 20px rgba(0,229,255,0.35)",
          "&:hover": { background: "#33eaff", boxShadow: "0 0 28px rgba(0,229,255,0.5)" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: ZB_COLORS.bgMid,
          border: `0.5px solid ${ZB_COLORS.border}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            fontFamily: "'Space Grotesk', sans-serif",
            "& fieldset": { borderColor: ZB_COLORS.border },
            "&:hover fieldset": { borderColor: ZB_COLORS.borderBright },
            "&.Mui-focused fieldset": { borderColor: ZB_COLORS.cyan, boxShadow: "0 0 12px rgba(0,229,255,0.2)" },
          },
          "& .MuiInputLabel-root": { fontFamily: "'Space Grotesk', sans-serif" },
          "& .MuiInputLabel-root.Mui-focused": { color: ZB_COLORS.cyan },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.75rem" },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        body {
          background: #060b1a;
          background-image:
            linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          margin: 0;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #060b1a; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.25); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,229,255,0.45); }
        ::selection { background: rgba(0,229,255,0.3); color: #fff; }
      `,
    },
  },
});

export default theme;
