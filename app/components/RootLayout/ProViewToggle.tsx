"use client"

import { Chip, IconButton, Stack } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import { RobotoMonoFF } from "../Theme/fonts"
import { Tooltip } from "../Tooltip"

export function ProViewToggle() {
  const pathname = usePathname()

  return (
    <>
      {pathname !== "/pro" && (
        <Tooltip
          title={
            <Stack direction="row" alignItems="baseline">
              <span>Open Pro view</span>
              <Chip
                label="BETA"
                size="small"
                color="secondary"
                sx={{ fontFamily: RobotoMonoFF, letterSpacing: 1, marginLeft: 1 }}
              />
            </Stack>
          }
        >
          <IconButton href={`/pro`} LinkComponent={Link} aria-label="Open Pro view" color="primary">
            <svg
              pointerEvents="none"
              width="24"
              height="24"
              viewBox="0 -1 36 28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 22H7V11H0V4h14v18zM28 22h-8l7.5-18h8L28 22z" fill="currentColor"></path>
              <circle cx="20" cy="8" r="4" fill="currentColor"></circle>
            </svg>
          </IconButton>
        </Tooltip>
      )}
    </>
  )
}
