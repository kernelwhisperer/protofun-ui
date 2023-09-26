import { Stack } from "@mui/material"
import { useStore } from "@nanostores/react"
import Decimal from "decimal.js"
import { formatNumber } from "protofun"
import React from "react"

import { $entryMap, $legendTimestamp, $seriesType } from "../../stores/metric-page"
import { isCandle } from "../../utils/candle-utils"
import { isMobile } from "../../utils/client-utils"
import { LegendLabel } from "./LegendLabel"
import { LegendValue } from "./LegendValue"

export type CandleChartLegendProps = {
  metricTitle: string
  precision: number
  significantDigits: number
  unitLabel: string
}

export function CandleChartLegend(props: CandleChartLegendProps) {
  const { precision, unitLabel, metricTitle, significantDigits } = props

  const seriesType = useStore($seriesType)
  const timestamp = useStore($legendTimestamp)
  const candleMap = useStore($entryMap)

  const candle = candleMap[timestamp]
  const candleDatetime = new Date(parseInt(timestamp || "0") * 1000)

  return (
    <>
      {!!candle && isCandle(candle) && (
        <Stack
          id="chart-legend"
          sx={{
            alignItems: "flex-start",
            left: 0,
            paddingLeft: 1,
            paddingTop: 1,
            position: "absolute",
            top: 0,
            zIndex: 999,
          }}
        >
          <Stack direction="row" sx={{ paddingBottom: 0.5 }}>
            {isMobile ? (
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
                    new Decimal(candle.open).div(precision).toNumber(),
                    significantDigits
                  )}{" "}
                  {unitLabel}
                </LegendValue>
              </Stack>
              <Stack direction="row">
                <LegendLabel>High</LegendLabel>
                <LegendValue>
                  {formatNumber(
                    new Decimal(candle.high).div(precision).toNumber(),
                    significantDigits
                  )}{" "}
                  {unitLabel}
                </LegendValue>
              </Stack>
              <Stack direction="row">
                <LegendLabel>Low</LegendLabel>
                <LegendValue>
                  {formatNumber(
                    new Decimal(candle.low).div(precision).toNumber(),
                    significantDigits
                  )}{" "}
                  {unitLabel}
                </LegendValue>
              </Stack>
              <Stack direction="row">
                <LegendLabel>Close</LegendLabel>
                <LegendValue>
                  {formatNumber(
                    new Decimal(candle.close).div(precision).toNumber(),
                    significantDigits
                  )}{" "}
                  {unitLabel}
                </LegendValue>
              </Stack>
            </>
          ) : (
            <Stack direction="row">
              <LegendLabel>{metricTitle}</LegendLabel>
              <LegendValue>
                {formatNumber(
                  new Decimal(candle.close).div(precision).toNumber(),
                  significantDigits,
                  isMobile ? "compact" : undefined
                )}{" "}
                {unitLabel}
              </LegendValue>
            </Stack>
          )}
        </Stack>
      )}
    </>
  )
}
