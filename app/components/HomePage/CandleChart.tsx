import { useTheme } from "@mui/material";
import { useStore } from "@nanostores/react";
import {
  IChartApi,
  ISeriesApi,
  MouseEventParams,
  Time,
} from "lightweight-charts";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { useNewCandlesSub } from "../../hooks/useNewCandlesSub";
import {
  $hourCandleMap,
  $hourCandles,
  $minCandleMap,
  $minCandles,
  CandleMap,
} from "../../stores/candle-data";
import {
  $legendTimestamp,
  $scaleMode,
  $seriesType,
  $timeframe,
} from "../../stores/home-page";
import {
  Candle,
  createCandleMapper,
  createLineMapper,
  queryCandles,
} from "../../utils/candle-utils";
import { TZ_OFFSET } from "../../utils/client-utils";
import { Chart } from "../Chart";
import { CandleChartLegend } from "./CandleChartLegend";

const mapCandleToCandleData = createCandleMapper(1e9);
const mapCandleToLineData = createLineMapper(1e9);

export function CandleChart() {
  console.log("📜 LOG > CandleChart render");
  const theme = useTheme();
  const chartRef = useRef<IChartApi>();
  const mainSeries = useRef<ISeriesApi<"Candlestick" | "Line">>();

  const timeframe = useStore($timeframe);
  const data = useStore(timeframe === "Minute" ? $minCandles : $hourCandles);
  const seriesType = useStore($seriesType);

  useEffect(() => {
    if (data.length) return;
    console.log("📜 LOG > CandleChart > fetching");

    // setLoading(true); TODO
    queryCandles(timeframe)
      .then((data) => {
        if (timeframe === "Hour") {
          $hourCandles.set(data);
          const candleMap = data.reduce((acc, curr) => {
            acc[curr.timestamp] = curr;
            return acc;
          }, {} as CandleMap);
          $hourCandleMap.set(candleMap);
        }
      })
      .then(() => {
        // setLoading(false);
      });
  }, [timeframe, data]);

  const mainSeriesData = useMemo(
    () =>
      seriesType === "Candlestick"
        ? data.map(mapCandleToCandleData)
        : data.map(mapCandleToLineData),

    [data, seriesType]
  );

  $scaleMode.subscribe((mode) => {
    chartRef.current?.priceScale("right").applyOptions({
      mode,
    });
  });

  $legendTimestamp.set(data[data.length - 1]?.timestamp);

  const handleNewCandle = useCallback((candle: Candle) => {
    if ($timeframe.get() === "Minute") {
      $minCandles.get().push(candle);
      $minCandleMap.setKey(candle.timestamp, candle);
    } else {
      $hourCandles.get().push(candle);
      $hourCandleMap.setKey(candle.timestamp, candle);
    }

    $legendTimestamp.set(candle.timestamp);
    mainSeries.current?.update(mapCandleToCandleData(candle));
  }, []);

  useNewCandlesSub(data[data.length - 1]?.timestamp, handleNewCandle);

  return (
    <>
      <CandleChartLegend />
      <Chart
        chartRef={chartRef}
        onReady={() => {
          console.log(
            "📜 LOG > CandleChart render chart ready",
            mainSeriesData.length,
            !!mainSeries.current
          );
          if (seriesType === "Candlestick") {
            mainSeries.current = chartRef.current?.addCandlestickSeries({
              borderDownColor: "#EB6666",
              borderUpColor: "#5e9a77",
              downColor: "#EB6666",
              upColor: "#5e9a77",
              wickDownColor: "#EB6666",
              wickUpColor: "#5e9a77",
            });
          } else {
            const primaryColor = theme.palette.primary.main;
            mainSeries.current = chartRef.current?.addLineSeries({
              color: primaryColor,
              lineType: 2,
            });
          }

          mainSeries.current?.setData(mainSeriesData);
          chartRef.current?.priceScale("right").applyOptions({
            mode: $scaleMode.get(),
          });

          const updateLegend = ({ time, point }: MouseEventParams) => {
            const validCrosshairPoint = !(
              !time ||
              !point?.x ||
              !point?.y ||
              point.x < 0 ||
              point.y < 0
            );

            if (!validCrosshairPoint) {
              const lastBar = mainSeries.current?.dataByIndex(Infinity, -1);
              time = lastBar?.time as Time;
            }

            $legendTimestamp.set(String((time as number) + TZ_OFFSET));
          };

          chartRef.current?.subscribeCrosshairMove(updateLegend);

          // chartRef.current?.timeScale().fitContent();
        }}
      />
    </>
  );
}
