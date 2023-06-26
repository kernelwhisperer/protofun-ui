"use client";

import {
  AppBar,
  AppBarProps,
  Button,
  Container,
  Stack,
  Toolbar,
} from "@mui/material";
import Link from "next/link";
import React from "react";

import { Blobs } from "./Blobs";
import { Logo } from "./Logo";
import { Settings } from "./Settings";

function StyledAppBar(props: AppBarProps) {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={(theme) => ({
        border: "none",
        borderBottom: "1px solid transparent",
        boxShadow: { xs: "none" },
        transition: theme.transitions.create("background"),
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
            <Blobs />
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
