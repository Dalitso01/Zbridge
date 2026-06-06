import React from "react";
import { Box } from "@mui/material";

// Drop-in replacement for the old MUI Grid (v5/v6) API.
// MUI v7 removed `<Grid item xs md>`, breaking layouts. This re-implements
// the same API using CSS Grid, which handles gaps correctly without overflow.

export function Grid({ container, item, spacing = 0, xs, sm, md, lg, children, sx = {}, ...rest }) {
  if (container) {
    // Children carry their own column-span via data attrs; we use a 12-col grid.
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: typeof spacing === "number" ? spacing : 0,
          width: "100%",
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }

  const colSpan = (n) => `span ${n}`;
  return (
    <Box
      sx={{
        minWidth: 0,
        gridColumn: xs != null ? colSpan(xs) : "span 12",
        ...(sm != null && { "@media (min-width:600px)": { gridColumn: colSpan(sm) } }),
        ...(md != null && { "@media (min-width:900px)": { gridColumn: colSpan(md) } }),
        ...(lg != null && { "@media (min-width:1200px)": { gridColumn: colSpan(lg) } }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default Grid;
