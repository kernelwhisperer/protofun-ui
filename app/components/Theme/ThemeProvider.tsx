"use client";

import CssBaseline from "@mui/material/CssBaseline";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  getInitColorSchemeScript,
} from "@mui/material/styles";
import { useStore } from "@nanostores/react";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import * as React from "react";

import { $reducedMotion } from "../../stores/app";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { theme } from "./theme";
console.log("📜 LOG > domAnimation:", domAnimation);

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const reducedMotion = useStore($reducedMotion);
  console.log("📜 LOG > ThemeProvider > reducedMotion:", reducedMotion);

  // const loadFeatures = import("./motion-features.ts").then(
  //   (res) => res.default
  // );

  return (
    <LazyMotion features={domAnimation} strict>
      <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
        <CssVarsProvider defaultMode="system" theme={theme}>
          {getInitColorSchemeScript({ defaultMode: "system" })}
          <CssBaseline enableColorScheme={true} />
          <MotionConfig reducedMotion={reducedMotion}>{children}</MotionConfig>
        </CssVarsProvider>
      </NextAppDirEmotionCacheProvider>
    </LazyMotion>
  );
}
