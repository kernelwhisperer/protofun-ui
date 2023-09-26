import { CameraAlt, CandlestickChart, ShowChart } from "@mui/icons-material"
import {
  alpha,
  Button,
  ButtonGroup,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  useTheme,
} from "@mui/material"
import { useStore } from "@nanostores/react"
import { Metric, PROTOCOL_MAP, TIME_FRAMES, Timeframe } from "protofun"
import React, { useCallback } from "react"

import { useSyncedSearchParams } from "../../hooks/useSyncedSearchParams"
import { $chartRef } from "../../stores/app"
import {
  $legendTimestamp,
  $liveMode,
  $priceUnitIndex,
  $scaleMode,
  $seriesType,
  $timeframe,
  $variantIndex,
} from "../../stores/metric-page"
import { downloadImage } from "../../utils/client-utils"
import { RobotoSerifFF } from "../Theme/fonts"

export function ChartActionBar({ metric }: { metric: Metric }) {
  const { timeframes, priceUnits } = metric
  const timeframe = useStore($timeframe)
  const seriesType = useStore($seriesType)
  const scaleMode = useStore($scaleMode)
  const liveMode = useStore($liveMode)
  const priceUnitIndex = useStore($priceUnitIndex)
  const theme = useTheme()

  const handlePriceUnitChange = useCallback((event: SelectChangeEvent) => {
    $priceUnitIndex.set(parseInt(event.target.value))
  }, [])

  useSyncedSearchParams()

  return (
    <Stack direction="row" gap={1} justifyContent="space-between" flexWrap="wrap">
      <ButtonGroup size="small">
        {Object.keys(TIME_FRAMES).map((x) => (
          <Button
            key={x}
            disabled={timeframes ? !timeframes.includes(x as Timeframe) : false}
            className={timeframe === x ? "active" : undefined}
            onClick={() => {
              if (x === "Block" && seriesType !== "Line") {
                $seriesType.set("Line")
              }
              $timeframe.set(x as Timeframe)
            }}
          >
            {TIME_FRAMES[x as Timeframe]}
          </Button>
        ))}
      </ButtonGroup>
      <Stack direction="row" gap={1} flexWrap="wrap">
        <ButtonGroup size="small">
          <Button
            className={seriesType === "Line" ? "active" : undefined}
            onClick={() => {
              $seriesType.set("Line")
            }}
            aria-label="Switch to Line chart"
          >
            <ShowChart />
          </Button>
          <Button
            disabled={timeframe === "Block" || metric.disallowCandleType}
            className={seriesType === "Candlestick" ? "active" : undefined}
            onClick={() => {
              $seriesType.set("Candlestick")
            }}
            aria-label="Switch to Candlestick chart"
          >
            <CandlestickChart />
          </Button>
        </ButtonGroup>
        <Button
          size="small"
          className={scaleMode === 1 ? "active" : undefined}
          variant="outlined"
          onClick={() => {
            const nextMode = scaleMode === 1 ? 0 : 1
            $scaleMode.set(nextMode)
          }}
        >
          Log scale
        </Button>
        {!metric.disallowLiveMode && (
          <Button
            size="small"
            className={liveMode ? "active" : undefined}
            variant="outlined"
            onClick={() => {
              $liveMode.set(!liveMode)
            }}
          >
            Live data
          </Button>
        )}
        <Button
          size="small"
          sx={{ minWidth: 44 }}
          variant="outlined"
          onClick={() => {
            const protocol = PROTOCOL_MAP[metric.protocol]
            const chartRef = $chartRef.get().current
            if (!chartRef) return
            const variantIndex = $variantIndex.get()

            let chartTitle = `${protocol.title}'s ${metric.title}`

            if (metric.variants && metric.variants.length > 0) {
              chartTitle += ` (${metric.variants[variantIndex].label})`
            }

            chartRef.applyOptions({
              watermark: {
                color: alpha(theme.palette.primary.main, 0.33),
                fontFamily: RobotoSerifFF,
                fontSize: 22,
                horzAlign: "center",
                text: chartTitle,
                // text: `https://protocol.fun/${metric.protocol}/${metric.id}`,
                vertAlign: "center",
                visible: true,
              },
            })

            downloadImage(
              chartRef.takeScreenshot(),
              // `${chartTitle} ${new Date().toISOString()}.png`
              `${metric.protocol}-${
                metric.id
              }-${variantIndex}-${priceUnitIndex}-${timeframe.toLowerCase()}-${$legendTimestamp.get()}.png`
            )

            chartRef.applyOptions({
              watermark: {
                visible: false,
              },
            })
          }}
          id="screenshot-button"
          aria-label="Take screenshot"
        >
          <CameraAlt />
        </Button>
        {priceUnits.length > 1 && (
          <Select
            sx={{
              "& .MuiSelect-select": {
                paddingTop: 0.5,
              },
              background: "transparent",
              border: "1px solid rgba(var(--mui-palette-primary-mainChannel) / 0.5)",
              borderRadius: 0,
              fontSize: "0.8125rem",
            }}
            variant="filled"
            value={String(priceUnitIndex)}
            onChange={handlePriceUnitChange}
            disableUnderline
            MenuProps={{
              BackdropProps: {
                invisible: false,
              },
              MenuListProps: {
                dense: true,
              },
              elevation: 0,
            }}
            size="small"
          >
            {priceUnits.map((priceUnit, index) => (
              <MenuItem key={index} value={index}>
                {priceUnit}
              </MenuItem>
            ))}
          </Select>
        )}
      </Stack>
    </Stack>
  )
}
