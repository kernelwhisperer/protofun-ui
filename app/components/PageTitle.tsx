import { Typography, TypographyProps } from "@mui/material";
import React from "react";

import { RobotoSerifFF } from "./Theme/fonts";

export function PageTitle(props: TypographyProps) {
  return (
    <Typography
      sx={{
        display: "inline-block",
        marginBottom: 4,
        marginTop: 2,
        position: "relative",
      }}
      variant="h4"
      fontWeight={500}
      fontFamily={RobotoSerifFF}
      {...props}
    />
  );
}
