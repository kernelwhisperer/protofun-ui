import { useTheme } from "@mui/material";
import {
  IChartApi,
  ISeriesApi,
  MouseEventParams,
  Time,
} from "lightweight-charts";
import React, { useCallback, useMemo, useRef } from "react";

import { useNewBlocksSub } from "../../hooks/useNewBlocksSub";
import { $blockMap, $blocks } from "../../stores/block-data";
import { $legendTimestamp, $scaleMode } from "../../stores/home-page";
import { createBlockMapper, SimpleBlock } from "../../utils/block-utils";
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

  const data = $blocks.get();
  const mainSeriesData = useMemo(() => data.map(mapBlockToLine), [data]);

  $scaleMode.subscribe((mode) => {
    chartRef.current?.priceScale("right").applyOptions({
      mode,
    });
  });

  $legendTimestamp.set(data[data.length - 1]?.timestamp);

  const handleNewBlock = useCallback((block: SimpleBlock) => {
    $blockMap.setKey(block.timestamp, block);
    $blocks.get().push(block);
    $legendTimestamp.set(block.timestamp);
    mainSeries.current?.update(mapBlockToLine(block));
  }, []);

  useNewBlocksSub(
    data[data.length - 1]?.timestamp,
    handleNewBlock,
    !!data.length
  );

  return (
    <>
      <ErrorOverlay errorMessage={!data.length ? "Nothing to see here." : ""} />
      <BlockChartLegend />
      {!!data.length && (
        <Chart
          chartRef={chartRef}
          onReady={() => {
            // console.log(
            //   "📜 LOG > BlockChart render chart ready",
            //   mainSeriesData.length,
            //   !!mainSeries.current
            // );

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
