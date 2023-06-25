"use client";

import {
  AppBar,
  AppBarProps,
  Button,
  Container,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import Link from "next/link";
import React from "react";

import { Logo } from "./Logo";
import { Settings } from "./Settings";

function StyledAppBar(props: AppBarProps) {
  const shouldElevate = useScrollTrigger({
    disableHysteresis: true,
    threshold: 16,
  });

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={(theme) => ({
        border: "none",
        borderBottom: "1px solid transparent",
        boxShadow: { xs: "none" },
        transition: theme.transitions.create("background"),
        ...(shouldElevate
          ? {
              "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))":
                {
                  backdropFilter: "blur(12px)",
                  background: theme.palette.background.glass,
                },
              borderColor: theme.palette.divider,
            }
          : {}),
      })}
      {...props}
    />
  );
}

export function Header() {
  return (
    <StyledAppBar>
      <Toolbar disableGutters>
        <Container
          maxWidth="lg"
          sx={{ padding: { xs: 0 }, position: "relative" }}
        >
          <Stack
            gap={1}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            paddingX={2}
            marginY={1}
          >
            {/* <Box
        sx={{
          filter: "blur(40px) url(#noiseFilter) blur(1px)",
          left: 0,
          // opacity: 1,
          opacity: 0.33,
          padding: 5,
          // mixBlendMode: "color-dodge",
          position: "absolute",
          top: 0,
          zIndex: -1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "var(--mui-palette-secondary-main)",
            borderRadius: "100px",
            height: 200,
            width: 200,
          }}
        />
      </Box> */}
            <Button
              href="/"
              LinkComponent={Link}
              sx={{
                borderRadius: 8,
                padding: 1,
                textTransform: "none",
              }}
            >
              <Logo />
            </Button>
            <Settings />
          </Stack>
        </Container>
      </Toolbar>
    </StyledAppBar>
  );
}
