"use client";

import CssBaseline from "@mui/material/CssBaseline";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  getInitColorSchemeScript,
} from "@mui/material/styles";
import { useStore } from "@nanostores/react";
import { Globals, useReducedMotion } from "@react-spring/web";
import React, { useEffect, useMemo } from "react";

import {
  $loopsAllowed,
  $reducedMotion,
  ReducedMotionSetting,
} from "../../stores/app";
import { isMobile } from "../../utils/client-utils";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { themeOptions } from "./theme";

Globals.assign({ skipAnimation: true });

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const reducedMotion = useStore($reducedMotion);
  const userPreference = useReducedMotion();

  useEffect(() => {
    const localSettings = localStorage.getItem("reduced-motion");
    if (localSettings) {
      $reducedMotion.set(localSettings as ReducedMotionSetting);
    }
  }, []);

  const skipAnimation = useMemo(() => {
    if (reducedMotion === "never") {
      return false;
    } else if (reducedMotion === "always") {
      return true;
    } else if (userPreference) {
      return userPreference;
    } else {
      return isMobile;
    }
  }, [reducedMotion, userPreference]);

  useEffect(() => {
    const loopsAllowed = skipAnimation === false;

    if (loopsAllowed === $loopsAllowed.get()) {
      $loopsAllowed.set(loopsAllowed);
    }
  }, [skipAnimation]);

  useEffect(() => {
    Globals.assign({ skipAnimation });
  }, [skipAnimation]);

  const extendedTheme = useMemo(
    () =>
      extendTheme({
        ...themeOptions,
        ...(skipAnimation
          ? {
              transitions: {
                // So we have `transition: none;` everywhere
                create: () => "none",
              },
            }
          : {}),
      }),
    [skipAnimation]
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <CssVarsProvider defaultMode="system" theme={extendedTheme}>
        {getInitColorSchemeScript({ defaultMode: "system" })}
        <CssBaseline enableColorScheme={true} />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
