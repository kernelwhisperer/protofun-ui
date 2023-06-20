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
      {/* <Box
        id="hey"
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
  );
}
