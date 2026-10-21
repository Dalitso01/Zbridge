import { createTheme } from "@mui/material";

// Modern-art palette: warm paper, black ink and bold Bauhaus primaries.
const INK = "#14110f";
const PAPER = "#f3ecdf";
const CARD = "#fffaf0";
const COBALT = "#1f40d6";
const VERMILION = "#e8432e";
const SUN = "#ffc21a";
const EMERALD = "#0e8a5f";

export const ART_SHADOW = `5px 5px 0 ${INK}`;

export const ZB_COLORS = {
  ink: INK,
  paper: PAPER,
  cobalt: COBALT,
  vermilion: VERMILION,
  sun: SUN,
  emerald: EMERALD,
  black: INK,
  bg: PAPER,
  bgMid: CARD,
  surface: CARD,
  surfaceHover: "#fff3d6",
  // "cyan" is the main accent name used across the app; it is now cobalt blue
  cyan: COBALT,
  cyanDim: "rgba(31,64,214,0.1)",
  cyanGlow: "transparent",
  magenta: VERMILION,
  lime: EMERALD,
  white: CARD,
  textPrimary: INK,
  textMuted: "rgba(20,17,15,0.62)",
  border: INK,
  borderBright: INK,
  cardBg: CARD,
  cardHover: "#fff3d6",
  // legacy aliases so older components still work
  navy: PAPER,
  navyMid: CARD,
  blue: COBALT,
  gold: COBALT,
  goldDim: "rgba(31,64,214,0.1)",
};

const DISPLAY = "'Syne', 'Space Grotesk', sans-serif";
const BODY = "'Space Grotesk', sans-serif";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: COBALT, contrastText: CARD },
    secondary: { main: VERMILION, contrastText: CARD },
    success: { main: EMERALD },
    warning: { main: "#d98300" },
    error: { main: VERMILION },
    background: { default: PAPER, paper: CARD },
    text: { primary: INK, secondary: ZB_COLORS.textMuted },
    divider: "rgba(20,17,15,0.2)",
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: BODY,
    h1: { fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.035em" },
    h2: { fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em" },
    h3: { fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.025em" },
    h4: { fontFamily: DISPLAY, fontWeight: 700, letterSpacing: "-0.02em" },
    h5: { fontFamily: DISPLAY, fontWeight: 700 },
    h6: { fontFamily: DISPLAY, fontWeight: 700 },
    body1: { fontFamily: BODY, lineHeight: 1.7 },
    body2: { fontFamily: BODY, lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "none",
          fontFamily: BODY,
          fontWeight: 700,
          transition: "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease",
        },
        contained: {
          border: `2px solid ${INK}`,
          boxShadow: `4px 4px 0 ${INK}`,
          "&:hover": { boxShadow: `6px 6px 0 ${INK}`, transform: "translate(-2px, -2px)" },
          "&:active": { boxShadow: `1px 1px 0 ${INK}`, transform: "translate(3px, 3px)" },
        },
        containedPrimary: {
          background: COBALT,
          color: CARD,
          "&:hover": { background: "#2a4cf0" },
        },
        outlined: {
          border: `2px solid ${INK}`,
          color: INK,
          "&:hover": { border: `2px solid ${INK}`, background: SUN },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: CARD,
          border: `2px solid ${INK}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { boxShadow: `8px 8px 0 ${INK}` },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            fontFamily: BODY,
            background: CARD,
            "& fieldset": { borderColor: INK, borderWidth: 2 },
            "&:hover fieldset": { borderColor: INK },
            "&.Mui-focused fieldset": { borderColor: COBALT, boxShadow: `3px 3px 0 ${INK}` },
          },
          "& .MuiInputLabel-root": { fontFamily: BODY },
          "& .MuiInputLabel-root.Mui-focused": { color: COBALT },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: BODY, fontSize: "0.75rem", fontWeight: 600 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        * { box-sizing: border-box; }
        body {
          background-color: ${PAPER};
          background-image: radial-gradient(rgba(20,17,15,0.07) 1px, transparent 1px);
          background-size: 22px 22px;
          margin: 0;
        }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: ${PAPER}; }
        ::-webkit-scrollbar-thumb { background: ${INK}; border-radius: 0; border: 2px solid ${PAPER}; }
        ::selection { background: ${SUN}; color: ${INK}; }
      `,
    },
  },
});

export default theme;
