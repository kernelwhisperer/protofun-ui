"use client";

import { Container, Fade, Stack } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React, { useState } from "react";

import { AppVerProps } from "../../stores/app";
import { isMobile } from "../../utils/client-utils";
import { Header } from "./Header";

interface AppProps extends AppVerProps {
  children: React.ReactNode;
}

export function App({ children, appVer, gitHash }: AppProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <SnackbarProvider
      domRoot={isMobile ? undefined : (anchorEl as HTMLElement)}
      TransitionComponent={Fade}
      // autoHideDuration={500000}
      anchorOrigin={{
        horizontal: isMobile ? "center" : "right",
        vertical: isMobile ? "bottom" : "top",
      }}
      maxSnack={isMobile ? 3 : 6}
    >
      <Header appVer={appVer} gitHash={gitHash} />
      <Container
        ref={setAnchorEl}
        maxWidth="lg"
        sx={{ padding: { xs: 0 }, position: "relative" }}
      >
        <Stack>
          {/* TODO: https://github.com/vercel/next.js/issues/49279 */}
          {children}
        </Stack>
        {/* <svg
          style={{
            opacity: 0,
            pointerEvents: "none",
            position: "absolute",
            top: 0,
          }}
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              stitchTiles="stitch"
            />
            <feColorMatrix
              in="colorNoise"
              type="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
            />
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
            <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
          </filter>
        </svg> */}
      </Container>
    </SnackbarProvider>
  );
}
