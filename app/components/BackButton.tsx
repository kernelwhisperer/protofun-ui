import { KeyboardBackspace } from "@mui/icons-material"
import { Button, ButtonProps } from "@mui/material"
import Link, { LinkProps } from "next/link"
import React, { ReactNode } from "react"

export function BackButton(
  props: Omit<ButtonProps<"a">, "component"> & LinkProps & { children?: ReactNode }
) {
  return (
    <Button
      component={Link}
      size="small"
      sx={{ borderRadius: 16, height: 31, paddingLeft: 1, paddingRight: 2 }}
      startIcon={<KeyboardBackspace sx={{ pointerEvents: "none" }} />}
      {...props}
    />
  )
}
