"use client";

import { Container, Stack } from "@mui/material";
import React from "react";

import { AppVerProps } from "../../stores/app";
import { Header } from "./Header";

interface AppProps extends AppVerProps {
  children: React.ReactNode;
}

export function App({ children, appVer, gitHash }: AppProps) {
  return (
    <>
      <Header appVer={appVer} gitHash={gitHash} />
      <Container
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
    </>
  );
}
