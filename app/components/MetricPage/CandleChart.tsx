import { useTheme } from "@mui/material";
import { useStore } from "@nanostores/react";
import { captureException } from "@sentry/nextjs";
import {
  IChartApi,
  ISeriesApi,
  MouseEventParams,
  Time,
} from "lightweight-charts";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  $loading,
  $scaleMode,
  $seriesType,
  $timeframe,
} from "../../stores/metric-page";
import {
  Candle,
  createCandleMapper,
  createLineMapper,
  queryCandles,
} from "../../utils/candle-utils";
import { TZ_OFFSET } from "../../utils/client-utils";
import { Chart } from "../Chart";
import { ErrorOverlay } from "../ErrorOverlay";
import { CandleChartLegend } from "./CandleChartLegend";

const mapCandleToCandleData = createCandleMapper(1e9);
const mapCandleToLineData = createLineMapper(1e9);

export function CandleChart() {
  // console.log("📜 LOG > CandleChart render");
  const theme = useTheme();
  const chartRef = useRef<IChartApi>();
  const mainSeries = useRef<ISeriesApi<"Candlestick" | "Line">>();

  const timeframe = useStore($timeframe);
  const data = useStore(timeframe === "Minute" ? $minCandles : $hourCandles);
  const seriesType = useStore($seriesType);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (data.length || $loading.get()) return;
    // console.log("📜 LOG > CandleChart > fetching");

    $loading.set(true);
    setError("");
    queryCandles(timeframe)
      .then((data) => {
        if (timeframe === "Hour") {
          $hourCandles.set(data);
          const candleMap = data.reduce((acc, curr) => {
            acc[curr.timestamp] = curr;
            return acc;
          }, {} as CandleMap);
          $hourCandleMap.set(candleMap);
        } else {
          $minCandles.set(data);
          const candleMap = data.reduce((acc, curr) => {
            acc[curr.timestamp] = curr;
            return acc;
          }, {} as CandleMap);
          $minCandleMap.set(candleMap);
        }
      })
      .then(() => {
        $loading.set(false);
      })
      .catch((error) => {
        console.error(error);
        captureException(error);
        setError(`${error.name}: ${error.message}`);
        $loading.set(false);
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

  useEffect(() => {
    $legendTimestamp.set(data[data.length - 1]?.timestamp);
  }, [data]);

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

  useNewCandlesSub(data[data.length - 1]?.timestamp, handleNewCandle, !error);
  console.log("📜 LOG > CandleChart > data.length:", data.length);

  return (
    <>
      <ErrorOverlay errorMessage={error} />
      <CandleChartLegend />
      {!!data.length && (
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
                // ----default
                // rgb(227, 96, 85)
                // rgb(72, 163, 154)
                // ----tv-mobile
                // rgb(229, 75, 74)
                // rgb(58, 151, 129)
                // ----tv-web
                // rgb(242, 54, 69)
                // rgb(8, 153, 129)
                //
                borderDownColor: "rgb(220, 60, 70)",
                borderUpColor: "rgb(0, 150, 108)",
                downColor: "rgb(220, 60, 70)",
                upColor: "rgb(0, 150, 108)",
                wickDownColor: "rgb(220, 60, 70)",
                wickUpColor: "rgb(0, 150, 108)",
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
      )}
    </>
  );
}
