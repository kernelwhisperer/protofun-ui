"use client";

import { Box, useTheme } from "@mui/material";
import { ColorType, createChart, ISeriesApi } from "lightweight-charts";
import React, { useCallback, useEffect, useMemo, useRef } from "react";

import { useNewBlocksSub } from "../../hooks/useNewBlocksSub";
import { mapBlockToLineData, SimpleBlock } from "../../utils/client-utils";

interface ChartProps {
  initialData: SimpleBlock[];
}

export function GasChart(props: ChartProps) {
  const { initialData } = props;

  const data = useMemo(
    () => initialData.map(mapBlockToLineData),
    [initialData]
  );

  const theme = useTheme();

  const containerRef = useRef<HTMLElement>();
  const lineSeries = useRef<ISeriesApi<"Line">>();

  const handleNewBlock = useCallback((data: SimpleBlock) => {
    lineSeries.current?.update(mapBlockToLineData(data));
  }, []);

  useNewBlocksSub(
    initialData[initialData.length - 1].timestamp,
    handleNewBlock
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({
        width: containerRef.current?.clientWidth,
      });
    };
    const lineColor = theme.palette.primary.main;
    const textColor = theme.palette.text.primary;

    const chart = createChart(containerRef.current, {
      crosshair: {
        horzLine: {
          labelVisible: false,
          visible: false,
        },
        vertLine: {
          color: "rgba(32, 38, 46, 0.1)",
          labelVisible: false,
          style: 0,
          visible: true,
          width: 2,
        },
      },
      grid: {
        horzLines: {
          color: "transparent",
        },
        vertLines: {
          color: "transparent",
        },
      },
      height: 300,
      layout: {
        background: { color: "transparent", type: ColorType.Solid },
        textColor,
      },
      width: containerRef.current.clientWidth,
    });
    chart.timeScale().applyOptions({
      secondsVisible: true,
      // barSpacing: 10,
      timeVisible: true,
    });
    chart.timeScale().fitContent();
    // chart.priceScale().applyOptions({
    //   //  mode: 1
    //   autoScale: false,
    // });

    lineSeries.current = chart.addLineSeries({
      color: lineColor,
    });
    lineSeries.current.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, theme, containerRef]);

  return <Box sx={{ position: "relative" }} ref={containerRef} />;
}

// const toolTipWidth = 96;

// // Create and style the tooltip html element
// const toolTip = document.createElement("div");
// toolTip.style = `width: ${toolTipWidth}px; height: 300px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border-radius: 4px 4px 0px 0px; border-bottom: none; box-shadow: 0 2px 5px 0 rgba(117, 134, 150, 0.45);font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
// toolTip.style.background = `rgba(${"255, 255, 255"}, 0.25)`;
// toolTip.style.color = "black";
// toolTip.style.borderColor = "rgba( 239, 83, 80, 1)";
// chartContainerRef.current.appendChild(toolTip);

// // update tooltip
// chart.subscribeCrosshairMove((param) => {
//   if (
//     param.point === undefined ||
//     !param.time ||
//     param.point.x < 0 ||
//     param.point.x > chartContainerRef.current.clientWidth ||
//     param.point.y < 0 ||
//     param.point.y > chartContainerRef.current.clientHeight
//   ) {
//     toolTip.style.display = "none";
//   } else {
//     // time will be in the same format that we supplied to setData.
//     // thus it will be YYYY-MM-DD
//     const dateStr = param.time;
//     toolTip.style.display = "block";
//     // const data = param.seriesData.get(series);
//     const price = 12; // data.value !== undefined ? data.value : data.close;
//     toolTip.innerHTML = `<div style="color: ${"rgba( 239, 83, 80, 1)"}">⬤ ABC Inc.</div><div style="font-size: 24px; margin: 4px 0px; color: ${"black"}">
// 	${Math.round(100 * price) / 100}
// 	</div><div style="color: ${"black"}">
// 	${dateStr}
// 	</div>`;

//     let left = param.point.x; // relative to timeScale
//     const timeScaleWidth = chart.timeScale().width();
//     const priceScaleWidth = chart.priceScale("left").width();
//     const halfTooltipWidth = toolTipWidth / 2;
//     left += priceScaleWidth - halfTooltipWidth;
//     left = Math.min(left, priceScaleWidth + timeScaleWidth - toolTipWidth);
//     left = Math.max(left, priceScaleWidth);

//     toolTip.style.left = left + "px";
//     toolTip.style.top = 0 + "px";
//   }
// });
