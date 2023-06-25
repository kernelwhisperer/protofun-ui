"use client";

import CssBaseline from "@mui/material/CssBaseline";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  getInitColorSchemeScript,
} from "@mui/material/styles";
import { MotionConfig } from "framer-motion";
import * as React from "react";

import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { theme } from "./theme";

export default function ThemeRegistry(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <CssVarsProvider defaultMode="system" theme={theme}>
        {getInitColorSchemeScript({ defaultMode: "system" })}
        <CssBaseline enableColorScheme={true} />
        <MotionConfig reducedMotion={"user"}>{children}</MotionConfig>
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
