import { Divider, createTheme } from "@mui/material";
import React from "react";
const theme = createTheme();
export function DividerLine({ color = theme.palette.primary.main, gap }) {
  return (
    <Divider
      style={{
        background: color,
        borderRadius: 20,
        height: 2,
        margin: gap ? "30px 0" : "",
      }}
    />
  );
}
