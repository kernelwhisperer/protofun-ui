"use client";

import { Box, useTheme } from "@mui/material";
import { createChart, IChartApi } from "lightweight-charts";
import React, { MutableRefObject, useEffect, useRef } from "react";

import { RobotoMonoFF } from "./Theme/fonts";

export interface ChartProps {
  chartRef: MutableRefObject<IChartApi | undefined>;
  onReady: () => void;
}

export function Chart(props: ChartProps) {
  const { chartRef, onReady } = props;

  const theme = useTheme();
  const containerRef = useRef<HTMLElement>();

  useEffect(() => {
    if (!containerRef.current) return;
    // console.log("📜 LOG > Chart > render");

    const handleResize = () => {
      chartRef.current?.applyOptions({
        height: containerRef.current?.clientHeight,
        width: containerRef.current?.clientWidth,
      });
    };
    const primaryColor = theme.palette.primary.main;
    const textColor = theme.palette.text.primary;
    const borderColor = theme.palette.divider;

    chartRef.current = createChart(containerRef.current, {
      crosshair: {
        horzLine: {
          labelBackgroundColor: primaryColor,
        },
        // mode: CrosshairMode.Normal,
        vertLine: {
          labelBackgroundColor: primaryColor,
        },
      },
      grid: {
        horzLines: {
          color: borderColor,
        },
        vertLines: {
          color: borderColor,
        },
      },
      // handleScroll: {
      //   mouseWheel: false,
      // },
      layout: {
        background: { color: "transparent" },
        fontFamily: RobotoMonoFF,
        textColor,
      },
      localization: {
        priceFormatter: (x: number) => `${x.toFixed(2)} Gwei`,
      },
      width: containerRef.current.clientWidth,
    });

    chartRef.current.timeScale().applyOptions({
      borderVisible: false,
      secondsVisible: true,
      timeVisible: true,
    });

    chartRef.current.priceScale("right").applyOptions({
      borderVisible: false,
    });

    window.addEventListener("resize", handleResize);
    onReady();

    return () => {
      window.removeEventListener("resize", handleResize);

      chartRef.current?.remove();
    };
  }, [chartRef, theme, onReady, containerRef]);

  return (
    <Box
      sx={{
        "& tr:first-child td": { cursor: "crosshair" },
        height: "100%",
        width: "100%",
      }}
      ref={containerRef}
    />
  );
}
