import {
  DarkModeOutlined,
  LightMode,
  SettingsBrightness,
} from "@mui/icons-material";
import { Button, ButtonGroup, useColorScheme, useTheme } from "@mui/material";
import { Mode } from "fs";
import React, { useEffect, useState } from "react";

import { RETRO_BEIGE_1 } from "../../Theme/theme";

export function ThemeMode() {
  const { mode: muiMode = "system", setMode: setMuiMode } = useColorScheme();
  const [mode, setMode] = useState<Mode>("system");
  const theme = useTheme();

  useEffect(() => {
    setMode(muiMode);
  }, [muiMode]);

  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme.palette.background.default);
  }, [theme.palette.background.default]);

  return (
    <>
      <meta name="theme-color" content={RETRO_BEIGE_1} />
      <ButtonGroup variant="outlined" size="large">
        <Button
          className={mode === "light" ? "active" : ""}
          startIcon={<LightMode />}
          onClick={() => {
            setMuiMode("light");
          }}
        >
          Light
        </Button>
        <Button
          className={mode === "system" ? "active" : ""}
          startIcon={<SettingsBrightness />}
          onClick={() => {
            setMuiMode("system");
          }}
        >
          System
        </Button>
        <Button
          className={mode === "dark" ? "active" : ""}
          startIcon={<DarkModeOutlined />}
          onClick={() => {
            setMuiMode("dark");
          }}
        >
          Dark
        </Button>
      </ButtonGroup>
    </>
  );
}
