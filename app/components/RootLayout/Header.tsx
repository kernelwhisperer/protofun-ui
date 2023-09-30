"use client"

import {
  AppBar,
  AppBarProps,
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

import { AppVerProps } from "../../stores/app"
import { RobotoMonoFF } from "../Theme/fonts"
import { Tooltip } from "../Tooltip"
import { Blobs } from "./Blobs"
import { HamburgerMenu } from "./HamburgerMenu"
import { Logo } from "./Logo"
import Notifications from "./Notifications"

function StyledAppBar(props: AppBarProps) {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        border: "none",
        boxShadow: { xs: "none" },
        // transition: theme.transitions.create("background"),
        // willChange: "background"
      }}
      {...props}
    />
  )
}

export function Header({ appVer, gitHash }: AppVerProps) {
  const pathname = usePathname()

  return (
    <StyledAppBar>
      <Toolbar disableGutters>
        <Container maxWidth="lg" sx={{ padding: { xs: 0 }, position: "relative" }}>
          <Stack
            gap={1}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            paddingX={2}
            marginY={1}
          >
            <Blobs />
            <Tooltip title="Visit Homepage">
              <Button
                href={`/`}
                aria-label="Visit Homepage"
                LinkComponent={Link}
                sx={{
                  borderRadius: 8,
                  marginLeft: -1,
                  padding: 1,
                  textTransform: "none",
                }}
              >
                <Logo />
              </Button>
            </Tooltip>
            <Stack direction="row" sx={{ marginRight: -1 }}>
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
                  <IconButton
                    href={`/pro`}
                    LinkComponent={Link}
                    aria-label="Open Pro view"
                    color="primary"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 -1 36 28"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 22H7V11H0V4h14v18zM28 22h-8l7.5-18h8L28 22z"
                        fill="currentColor"
                      ></path>
                      <circle cx="20" cy="8" r="4" fill="currentColor"></circle>
                    </svg>
                  </IconButton>
                </Tooltip>
              )}
              <Notifications />
              <HamburgerMenu appVer={appVer} gitHash={gitHash} />
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </StyledAppBar>
  )
}
