"use client";

import { Button, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";

import { Logo } from "./Logo";
import { Settings } from "./Settings";

export function Header() {
  return (
    <Stack
      gap={1}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      paddingX={2}
      marginBottom={3}
      marginTop={1}
    >
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
  );
}
