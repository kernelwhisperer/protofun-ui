"use client";

import { Box, Container } from "@mui/material";
import * as Sentry from "@sentry/nextjs";
import React, { useEffect } from "react";

import ThemeRegistry from "../Theme/ThemeRegistry";
import { Blobs } from "./Blobs";
import { Header } from "./Header";

interface AppProps {
  appVer: string;
  children: React.ReactNode;
  gitHash: string;
}

export function App({ children, appVer, gitHash }: AppProps) {
  console.log("App version:", appVer, " git hash:", gitHash);

  useEffect(() => {
    Sentry.init({
      // Setting this option to true will print useful information to the console while you're setting up Sentry.
      debug: false,

      dsn: "https://672b2daf06ae4f9d8ca9956097e75502@o4505410061795328.ingest.sentry.io/4505410080931840",

      // You can remove this option if you're not planning to use the Sentry Session Replay feature:
      integrations: [
        new Sentry.Replay({
          blockAllMedia: true,
          // Additional Replay configuration goes in here, for example:
          maskAllText: true,
        }),
      ],
      release: `${appVer}@${gitHash}`,

      replaysOnErrorSampleRate: 1.0,

      // This sets the sample rate to be 10%. You may want this to be 100% while
      // in development and sample at a lower rate in production
      replaysSessionSampleRate: 0.1,

      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1,

      tunnel: "/monitoring?o=4505410061795328&p=4505410080931840",
    });
  }, []);

  return (
    <ThemeRegistry>
      <Header />
      <Container
        maxWidth="lg"
        sx={{ padding: { sm: 0 }, position: "relative" }}
      >
        <Blobs />
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
