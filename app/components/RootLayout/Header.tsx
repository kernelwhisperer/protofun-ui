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

import { AppVerProps } from "../../stores/app";
import { Blobs } from "./Blobs";
import { HamburgerMenu } from "./HamburgerMenu";
import { Logo } from "./Logo";

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

export function Header({ appVer, gitHash }: AppVerProps) {
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
            <Button
              href="/"
              aria-label="Homepage"
              LinkComponent={Link}
              sx={{
                borderRadius: 8,
                padding: 1,
                textTransform: "none",
              }}
            >
              <Logo />
            </Button>
            <HamburgerMenu appVer={appVer} gitHash={gitHash} />
          </Stack>
        </Container>
      </Toolbar>
    </StyledAppBar>
  );
}
