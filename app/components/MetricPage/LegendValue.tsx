import { TypographyProps } from "@mui/material"
import React from "react"

import { RobotoMonoFF } from "../Theme/fonts"
import { LegendLabel } from "./LegendLabel"

export function LegendValue(props: TypographyProps) {
  return <LegendLabel fontFamily={RobotoMonoFF} sx={{ paddingLeft: 0 }} {...props} />
}
