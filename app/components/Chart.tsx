"use client";

import { Box, useMediaQuery, useTheme } from "@mui/material";
import { createChart, IChartApi } from "lightweight-charts";
import React, { memo, MutableRefObject, useEffect, useRef } from "react";

import { RobotoMonoFF } from "./Theme/fonts";

export interface ChartProps {
  chartRef: MutableRefObject<IChartApi | undefined>;
}

function Chart(props: ChartProps) {
  const { chartRef } = props;

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
        priceFormatter: smallDevice
          ? undefined
          : (x: number) => `${x.toFixed(2)} Gwei`,
      },
      width: containerRef.current.clientWidth,
    });

    chartRef.current.timeScale().applyOptions({
      borderVisible: false,
      rightOffset: smallDevice ? 4 : 8,
      secondsVisible: true, // TODO: make it dissapear for higher timeframes
      timeVisible: true,
    });

    chartRef.current.priceScale("right").applyOptions({
      borderVisible: false,
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chartRef.current?.remove();
    };
  }, [chartRef, theme, smallDevice, containerRef]);

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
