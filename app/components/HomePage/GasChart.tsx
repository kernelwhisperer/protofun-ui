"use client";

import { Box, useTheme } from "@mui/material";
import { createChart, ISeriesApi, MouseEventParams } from "lightweight-charts";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { useBlockMap } from "../../hooks/useBlockMapContext";
import { useLegend } from "../../hooks/useLegendContext";
import { useNewBlocksSub } from "../../hooks/useNewBlocksSub";
import {
  createBlockMapper,
  mapBlockToCandleData,
  SimpleBlock,
  timezoneOffset,
} from "../../utils/client-utils";
import { RobotoMonoFF } from "../Theme/fonts";

export interface GasChartProps {
  initialData: SimpleBlock[];
}

const mapBlockToBaseGasFee = createBlockMapper("baseFeePerGas", 1e9);
// const mapBlockToBurnedFees = createBlockMapper("burnedFees", 1e18);

export function GasChart(props: GasChartProps) {
  const { initialData } = props;

  const rightSeriesData = useMemo(
    () => initialData.map(mapBlockToBaseGasFee),
    [initialData]
  );

  // const leftSeriesData = useMemo(
  //   () => initialData.map(mapBlockToBurnedFees),
  //   [initialData]
  // );

  const leftSeriesData = useMemo(
    () => initialData.map(mapBlockToCandleData),
    [initialData]
  );

  const theme = useTheme();

  const containerRef = useRef<HTMLElement>();
  const rightSeries = useRef<ISeriesApi<"Line">>();
  const leftSeries = useRef<ISeriesApi<"Candlestick">>();

  const { setTimestamp: setLegendTimestamp } = useLegend();
  const { setItem } = useBlockMap();

  const handleNewBlock = useCallback(
    (data: SimpleBlock) => {
      setItem(data);
      rightSeries.current?.update(mapBlockToBaseGasFee(data));
      leftSeries.current?.update(mapBlockToCandleData(data));
    },
    [setItem]
  );

  useNewBlocksSub(
    initialData[initialData.length - 1]?.timestamp,
    handleNewBlock
  );

  useEffect(() => {
    if (!containerRef.current) return;
    console.log("📜 LOG > useEffect");

    const handleResize = () => {
      chart.applyOptions({
        width: containerRef.current?.clientWidth,
      });
    };
    const lineColor = theme.palette.primary.main;
    const secondaryColor = theme.palette.secondary.main;
    const textColor = theme.palette.text.primary;
    const borderColor = theme.palette.divider;

    const chart = createChart(containerRef.current, {
      crosshair: {
        // mode: 0,
        horzLine: {
          labelBackgroundColor: secondaryColor,
        },
        vertLine: {
          labelBackgroundColor: secondaryColor,
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
      height: 500,
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
    chart.timeScale().applyOptions({
      // barSpacing: 10,
      borderVisible: false,
      // borderColor,

      secondsVisible: true,
      timeVisible: true,
    });
    // chart.timeScale().fitContent();

    // leftSeries.current = chart.addCandlestickSeries({
    //   borderDownColor: "white",
    //   borderUpColor: "black",
    //   downColor: "white",
    //   upColor: "black",
    //   wickDownColor: "white",
    //   wickUpColor: "black",
    // });
    // leftSeries.current.setData(leftSeriesData);

    rightSeries.current = chart.addLineSeries({
      color: lineColor,
      lineType: 2,
    });
    rightSeries.current.setData(rightSeriesData);

    // leftSeries.current = chart.addLineSeries({
    //   color: secondaryColor,
    //   priceScaleId: "left",
    // });
    // leftSeries.current.setData(leftSeriesData);

    chart.priceScale("right").applyOptions({
      // LOG
      // autoScale: true,
      // borderColor,
      borderVisible: false,
      mode: 1, // LOG scale
    });
    // chart.priceScale("left").applyOptions({
    //   mode: 1,
    //   // borderColor,
    //   // borderVisible: true,
    //   textColor: secondaryColor,
    //   // LOG
    //   // autoScale: true,
    //   ticksVisible: true, // LOG scale
    //   visible: true,
    // });

    const updateLegend = ({ time, point }: MouseEventParams) => {
      const validCrosshairPoint = !(
        !time ||
        !point?.x ||
        !point?.y ||
        point.x < 0 ||
        point.y < 0
      );

      if (validCrosshairPoint) {
        setLegendTimestamp(String((time as number) + timezoneOffset));
      } else {
        setLegendTimestamp(undefined);
      }
    };

    chart.subscribeCrosshairMove(updateLegend);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    rightSeriesData,
    // leftSeriesData,
    theme,
    setLegendTimestamp,
    containerRef,
  ]);

  return <Box ref={containerRef} />;
}
