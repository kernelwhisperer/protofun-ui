import { useTheme } from "@mui/material";
import { ColorType, createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

interface ChartProps {
  data: { time: number; value: number }[];
}

export const Chart = ({ data = [] }: ChartProps) => {
  const theme = useTheme();

  const {
    lineColor = theme.palette.primary.main,
    textColor = theme.palette.text.primary,
  } = {};

  const chartContainerRef = useRef<HTMLElement>();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
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
      width: chartContainerRef.current.clientWidth,
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

    const newSeries = chart.addLineSeries({
      color: lineColor,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data, lineColor, textColor, chartContainerRef]);

  return <div ref={chartContainerRef} />;
};
