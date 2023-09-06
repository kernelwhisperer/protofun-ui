"use client";

import {
  AppBar,
  AppBarProps,
  Button,
  Container,
  Stack,
  Toolbar,
} from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

import { AppVerProps } from "../../stores/app";
import { Blobs } from "./Blobs";
import { HamburgerMenu } from "./HamburgerMenu";
import { Logo } from "./Logo";

const Notifications = dynamic(() => import("./Notifications"));
const Profile = dynamic(() => import("./Profile"));

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
  );
}

export function Header({ appVer, gitHash }: AppVerProps) {
  const searchParams = useSearchParams();
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
              href={`/?${searchParams?.toString()}`}
              aria-label="Homepage"
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
            <Stack direction="row" sx={{ marginRight: -1 }}>
              <Notifications />
              <Profile />
              <HamburgerMenu appVer={appVer} gitHash={gitHash} />
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </StyledAppBar>
  );
}
