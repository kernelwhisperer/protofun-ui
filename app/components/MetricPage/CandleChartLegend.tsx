import { Stack, useMediaQuery } from "@mui/material";
import { useStore } from "@nanostores/react";
import Decimal from "decimal.js";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import {
  $entryMap,
  $legendTimestamp,
  $seriesType,
  CandleMap,
  Metric,
} from "../../stores/metric-page";
import { isCandle } from "../../utils/candle-utils";
import { formatNumber } from "../../utils/client-utils";
import { LegendLabel } from "./LegendLabel";
import { LegendValue } from "./LegendValue";

export function CandleChartLegend({
  precision,
  unitLabel,
}: Pick<Metric, "precision" | "unitLabel">) {
  const smallDevice = !useMediaQuery("(min-width:600px)");

  const seriesType = useStore($seriesType);
  const timestamp = useStore($legendTimestamp);
  const candleMap = useStore($entryMap) as CandleMap;

  const candle = candleMap[timestamp];
  const candleDatetime = new Date(parseInt(timestamp || "0") * 1000);

  return (
    <AnimatePresence>
      {!!candle && isCandle(candle) && (
        <Stack
          sx={{
            alignItems: "flex-start",
            left: 0,
            paddingLeft: 1,
            paddingTop: 1,
            position: "absolute",
            top: 0,
            zIndex: 999,
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Stack direction="row" sx={{ paddingBottom: 0.5 }}>
            {smallDevice ? (
              <>
                <LegendLabel>
                  <LegendValue variant="body2">
                    {
                      new Intl.DateTimeFormat(window.navigator.language, {
                        dateStyle: "short",
                        hourCycle: "h23",
                        timeStyle: "short",
                      }).format(candleDatetime)
                      // .split(", ")[1]
                    }
                  </LegendValue>
                </LegendLabel>
              </>
            ) : (
              <>
                <LegendLabel variant="body2">Timestamp</LegendLabel>
                <LegendValue variant="body2">
                  {
                    new Intl.DateTimeFormat(window.navigator.language, {
                      dateStyle: "long",
                      hourCycle: "h23",
                      timeStyle: "short",
                    }).format(candleDatetime)
                    // .split(", ")[1]
                  }
                </LegendValue>
              </>
            )}
          </Stack>
          {seriesType === "Candlestick" ? (
            <>
              <Stack direction="row">
                <LegendLabel>Open</LegendLabel>
                <LegendValue>
                  {formatNumber(
                    new Decimal(candle.open).div(precision).toNumber()
                  )}{" "}
                  {unitLabel}
                </LegendValue>
              </Stack>
              <Stack direction="row">
                <LegendLabel>High</LegendLabel>
                <LegendValue>
                  {formatNumber(
                    new Decimal(candle.high).div(precision).toNumber()
                  )}{" "}
                  {unitLabel}
                </LegendValue>
              </Stack>
              <Stack direction="row">
                <LegendLabel>Low</LegendLabel>
                <LegendValue>
                  {formatNumber(
                    new Decimal(candle.low).div(precision).toNumber()
                  )}{" "}
                  {unitLabel}
                </LegendValue>
              </Stack>
              <Stack direction="row">
                <LegendLabel>Close</LegendLabel>
                <LegendValue>
                  {formatNumber(
                    new Decimal(candle.close).div(precision).toNumber()
                  )}{" "}
                  {unitLabel}
                </LegendValue>
              </Stack>
            </>
          ) : (
            <Stack direction="row">
              <LegendLabel>Base fee per gas</LegendLabel>
              <LegendValue>
                {formatNumber(
                  new Decimal(candle.close).div(precision).toNumber()
                )}{" "}
                {unitLabel}
              </LegendValue>
            </Stack>
          )}
        </Stack>
      )}
    </AnimatePresence>
  );
}
