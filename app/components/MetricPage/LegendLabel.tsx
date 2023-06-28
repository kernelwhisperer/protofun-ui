import { Typography, TypographyProps } from "@mui/material";
import React from "react";

export function LegendLabel({ sx, ...rest }: TypographyProps) {
  return (
    <Typography
      component="span"
      variant="caption"
      sx={{
        backgroundColor: "var(--mui-palette-background-glass)",
        paddingX: 1,
        ...sx,
      }}
      {...rest}
    />
  );
}
