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

import { useNewBlocksSub } from "../../hooks/useNewBlocksSub";
import { $blockMap, $blocks, BlockMap } from "../../stores/block-data";
import { $legendTimestamp, $loading, $scaleMode } from "../../stores/home-page";
import {
  createBlockMapper,
  queryBlocks,
  SimpleBlock,
} from "../../utils/block-utils";
import { TZ_OFFSET } from "../../utils/client-utils";
import { Chart } from "../Chart";
import { ErrorOverlay } from "../ErrorOverlay";
import { BlockChartLegend } from "./BlockChartLegend";

const mapBlockToLine = createBlockMapper("baseFeePerGas", 1e9);

export function BlockChart() {
  // console.log("📜 LOG > BlockChart render");
  const theme = useTheme();
  const chartRef = useRef<IChartApi>();
  const mainSeries = useRef<ISeriesApi<"Line">>();

  const data = useStore($blocks);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (data.length) return;
    // console.log("📜 LOG > CandleChart > fetching");

    $loading.set(true);
    setError("");
    queryBlocks()
      .then((data) => {
        console.log("📜 LOG > .then > blocks:", data);
        const blockMap = data.reduce((acc, curr) => {
          acc[curr.timestamp] = curr;
          return acc;
        }, {} as BlockMap);

        $blockMap.set(blockMap);
        $blocks.set(data);
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
  }, [data]);

  const mainSeriesData = useMemo(() => data.map(mapBlockToLine), [data]);
  console.log("📜 LOG > BlockChart > mainSeriesData:", mainSeriesData);

  $scaleMode.subscribe((mode) => {
    chartRef.current?.priceScale("right").applyOptions({
      mode,
    });
  });

  useEffect(() => {
    $legendTimestamp.set(data[data.length - 1]?.timestamp);
  }, [data]);

  const handleNewBlock = useCallback((block: SimpleBlock) => {
    $blockMap.setKey(block.timestamp, block);
    $blocks.get().push(block);
    $legendTimestamp.set(block.timestamp);
    mainSeries.current?.update(mapBlockToLine(block));
  }, []);

  useNewBlocksSub(data[data.length - 1]?.timestamp, handleNewBlock, !error);
  console.log("📜 LOG > BlockChart > data.length:", data.length);

  return (
    <>
      <ErrorOverlay errorMessage={error} />
      <BlockChartLegend />
      {!!data.length && (
        <Chart
          chartRef={chartRef}
          onReady={() => {
            console.log(
              "📜 LOG > BlockChart render chart ready",
              mainSeriesData.length,
              !!mainSeries.current
            );

            const primaryColor = theme.palette.primary.main;
            mainSeries.current = chartRef.current?.addLineSeries({
              color: primaryColor,
              lineType: 2,
            });

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
