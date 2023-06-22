import { Stack, Typography, TypographyProps } from "@mui/material";
import { useStore } from "@nanostores/react";
import Decimal from "decimal.js";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { $hourCandleMap, $minCandleMap } from "../../stores/candle-data";
import {
  $legendTimestamp,
  $seriesType,
  $timeframe,
} from "../../stores/home-page";
import { formatNumber } from "../../utils/client-utils";
import { RobotoMonoFF } from "../Theme/fonts";

const LegendLabel = ({ sx, ...rest }: TypographyProps) => (
  <Typography
    variant="caption"
    sx={{
      backgroundColor: "var(--mui-palette-background-glass)",
      paddingX: 1,
      ...sx,
    }}
    {...rest}
  />
);

const LegendValue = (props: TypographyProps) => (
  <LegendLabel fontFamily={RobotoMonoFF} sx={{ paddingLeft: 0 }} {...props} />
);

export function CandleChartLegend() {
  console.log("📜 LOG > ChartLegend render");

  const seriesType = useStore($seriesType);
  const timestamp = useStore($legendTimestamp);
  const timeframe = useStore($timeframe);
  const candleMap = useStore(
    timeframe === "Minute" ? $minCandleMap : $hourCandleMap
  );

  const candle = candleMap[timestamp];

  const candleDatetime = new Date(parseInt(timestamp || "0") * 1000);

  return (
    <AnimatePresence>
      {!!candle && (
        <Stack
          sx={{
            alignItems: "flex-start",
            left: 0,
            paddingLeft: 1,
            paddingTop: 1,
            position: "absolute",
            top: 0,
            zIndex: 99999,
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Stack direction="row" sx={{ paddingBottom: 0.5 }}>
            <LegendLabel variant="body2">Timestamp</LegendLabel>
            <LegendValue variant="body2">
              {
                new Intl.DateTimeFormat(window.navigator.language, {
                  dateStyle: "long",
                  hourCycle: "h23",
                  timeStyle: "medium",
                }).format(candleDatetime)
                // .split(", ")[1]
              }{" "}
            </LegendValue>
          </Stack>
          {seriesType === "Candlestick" ? (
            <>
              <Stack direction="row">
                <LegendLabel>Open</LegendLabel>
                <LegendValue>
                  {formatNumber(new Decimal(candle.open).div(1e9).toNumber())}{" "}
                  Gwei
                </LegendValue>
              </Stack>
              <Stack direction="row">
                <LegendLabel>High</LegendLabel>
                <LegendValue>
                  {formatNumber(new Decimal(candle.high).div(1e9).toNumber())}{" "}
                  Gwei
                </LegendValue>
              </Stack>
              <Stack direction="row">
                <LegendLabel>Low</LegendLabel>
                <LegendValue>
                  {formatNumber(new Decimal(candle.low).div(1e9).toNumber())}{" "}
                  Gwei
                </LegendValue>
              </Stack>
              <Stack direction="row">
                <LegendLabel>Close</LegendLabel>
                <LegendValue>
                  {formatNumber(new Decimal(candle.close).div(1e9).toNumber())}{" "}
                  Gwei
                </LegendValue>
              </Stack>
            </>
          ) : (
            <Stack direction="row">
              <LegendLabel>Base fee per gas</LegendLabel>
              <LegendValue>
                {formatNumber(new Decimal(candle.close).div(1e9).toNumber())}{" "}
                Gwei
              </LegendValue>
            </Stack>
          )}
        </Stack>
      )}
    </AnimatePresence>
  );
}
