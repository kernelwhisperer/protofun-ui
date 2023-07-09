"use client";

import CssBaseline from "@mui/material/CssBaseline";
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  getInitColorSchemeScript,
} from "@mui/material/styles";
import { useStore } from "@nanostores/react";
import { Globals, useReducedMotion } from "@react-spring/web";
import throttle from "lodash.throttle";
import React, { useEffect, useMemo } from "react";

import {
  $loopsAllowed,
  $reducedMotion,
  ReducedMotionSetting,
} from "../../stores/app";
import { isMobile } from "../../utils/client-utils";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { themeOptions } from "./theme";

// this only runs once, on the server
Globals.assign({ skipAnimation: true });

// TODO: Hack: investigate the loop: true and skipAnimation: true bug
const applyAnimationSetting = throttle((skipAnimation) => {
  if (skipAnimation === false) {
    // 1. enable animations
    Globals.assign({ skipAnimation: false });
    setTimeout(() => {
      // 2. enable loops
      $loopsAllowed.set(true);
    }, 200);
  } else {
    // 1. disable loops
    $loopsAllowed.set(false);
    // 2. disable animations
    setTimeout(() => {
      Globals.assign({ skipAnimation: true });
    }, 200);
  }
}, 400);

export default function ThemeProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const reducedMotion = useStore($reducedMotion);
  const userPreference = useReducedMotion();

  useEffect(() => {
    // thi only runs once, on the client
    Globals.assign({ skipAnimation: true });
    const localSettings = localStorage.getItem("reduced-motion");
    if (localSettings && localSettings !== $reducedMotion.get()) {
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
    applyAnimationSetting(skipAnimation);
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
