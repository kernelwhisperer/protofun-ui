"use client";

import { Box, Container } from "@mui/material";
import React from "react";

import ThemeRegistry from "../Theme/ThemeRegistry";
import { Header } from "./Header";

interface AppProps {
  appVer: string;
  children: React.ReactNode;
  gitHash: string;
}

export function App({ children }: AppProps) {
  return (
    <ThemeRegistry>
      <Header />
      <Container
        maxWidth="lg"
        sx={{ padding: { xs: 0 }, position: "relative" }}
      >
        <Box
          sx={{
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link
              underline="hover"
              color="inherit"
              href="/"
              component={NextLink}
            >
              Home
            </Link>
          </Breadcrumbs> */}
          {/* <LazyMotion features={domAnimation}> */}
          {/* TODO: https://github.com/vercel/next.js/issues/49279 */}
          {/* <AnimatePresence>
            <motion.div
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
            </motion.div>
          </AnimatePresence> */}
          {children}
          {/* <Typography sx={{ margin: 2, opacity: 0.5 }} variant="body2">
            App version {`${appVer}@${gitHash}`}
          </Typography> */}
        </Box>
        <svg
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
        </svg>
      </Container>
    </ThemeRegistry>
  );
}
