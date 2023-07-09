"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { createChart, CrosshairMode, IChartApi } from "lightweight-charts";
import React, { memo, MutableRefObject, useEffect, useRef } from "react";

import { $timeframe } from "../stores/metrics";
import { RobotoMonoFF } from "./Theme/fonts";

export type ChartProps = {
  chartRef: MutableRefObject<IChartApi | undefined>;
  significantDigits: number;
  unitLabel: string;
};

function Chart(props: ChartProps) {
  const { chartRef, unitLabel, significantDigits } = props;

  const theme = useTheme();
  const containerRef = useRef<HTMLElement>();
  const smallDevice = !useMediaQuery("(min-width:600px)");

  useEffect(() => {
    if (!containerRef.current) return;

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
        mode: CrosshairMode.Normal,
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
        priceFormatter: smallDevice
          ? undefined
          : (x: number) => `${x.toFixed(significantDigits)} ${unitLabel}`,
      },
      width: containerRef.current.clientWidth,
    });

    console.log(
      "📜 LOG > chartRef.current.timeScale > smallDevice:",
      smallDevice
    );
    chartRef.current.timeScale().applyOptions({
      borderVisible: false,
      rightOffset: smallDevice ? 4 : 8,
      secondsVisible: ["Block"].includes($timeframe.get()),
      timeVisible: ["Hour", "Minute", "Block"].includes($timeframe.get()),
    });

    chartRef.current.priceScale("right").applyOptions({
      borderVisible: false,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chartRef.current?.remove();
    };
  }, [
    chartRef,
    theme,
    smallDevice,
    containerRef,
    unitLabel,
    significantDigits,
  ]);

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

export const MemoChart = memo(Chart, () => true);
