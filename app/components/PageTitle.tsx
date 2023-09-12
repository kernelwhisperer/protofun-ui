import { Typography, TypographyProps } from "@mui/material"
import React from "react"

import { RobotoSerifFF } from "./Theme/fonts"

export function PageTitle({ sx, ...rest }: TypographyProps) {
  return (
    <Typography
      sx={{
        display: "inline-block",
        marginBottom: 4,
        marginTop: 2,
        position: "relative",
        zIndex: "var(--mui-zIndex-title)",
        ...sx,
      }}
      variant="h4"
      fontWeight={500}
      fontFamily={RobotoSerifFF}
      {...rest}
    />
  )
}
