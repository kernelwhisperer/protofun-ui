"use client";

import { Container, Stack } from "@mui/material";
import React from "react";

import { AppVerProps } from "../../stores/app";
import ThemeProvider from "../Theme/ThemeProvider";
import { Header } from "./Header";

interface AppProps extends AppVerProps {
  children: React.ReactNode;
}

export function App({ children, appVer, gitHash }: AppProps) {
  return (
    <ThemeProvider>
      <Header appVer={appVer} gitHash={gitHash} />
      <Container
        maxWidth="lg"
        sx={{ padding: { xs: 0 }, position: "relative" }}
      >
        <Stack>
          {/* TODO: https://github.com/vercel/next.js/issues/49279 */}
          {/* <AnimatePresence>
            <m.div
              key={pathname}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -80 }}
     
              transition={{
                damping: 20,
                stiffness: 40,
                type: "spring",
              }}
            >
            </m.div>
          </AnimatePresence> */}
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
    </ThemeProvider>
  );
}
