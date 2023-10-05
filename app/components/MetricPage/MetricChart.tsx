import { useTheme } from "@mui/material"
import { useStore } from "@nanostores/react"
import { animated, useSpring } from "@react-spring/web"
import Decimal from "decimal.js"
import { IPriceLine, MouseEventHandler, MouseEventParams, Time } from "lightweight-charts"
import isEqual from "lodash.isequal"
import dynamic from "next/dynamic"
import { Candle, getMetricPrecision, getSignificantDigits, Metric, wait } from "protofun"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { $alerts, findAlertsForMetric } from "../../api/alerts-api"
import { useLiveData } from "../../hooks/useLiveData"
import { $loopsAllowed } from "../../stores/app"
import {
  $chartRef,
  $entries,
  $entryMap,
  $legendTimestamp,
  $loading,
  $mainSeries,
  $priceUnitIndex,
  $scaleMode,
  $seriesType,
  $since,
  $timeframe,
  $until,
  $variantIndex,
  EntryMap,
} from "../../stores/metric-page"
import { AlertDraft } from "../../utils/alert-utils"
import {
  createCandleMapper,
  createLineMapper,
  isCandle,
  isCandleArray,
} from "../../utils/candle-utils"
import { createPriceFormatter } from "../../utils/chart"
import {
  candleStickOptions,
  loadMetricFns,
  logError,
  retry,
  SPRING_CONFIGS,
  TZ_OFFSET,
} from "../../utils/client-utils"
import { MemoChart } from "../Chart"
import { ErrorOverlay, FetchError } from "../ErrorOverlay"
import { ProtocolProgress } from "../ProtocolProgress"
import { CandleChartLegend } from "./CandleChartLegend"

const AlertModal = dynamic(() => import("./AlertModal"))

export default function MetricChart({ metric }: { metric: Metric }) {
  const { priceUnits, title, allowCompactPriceScale } = metric

  const priceUnitIndex = useStore($priceUnitIndex)
  const priceUnit = priceUnits[priceUnitIndex]
  const significantDigits = getSignificantDigits(metric, priceUnitIndex)

  const theme = useTheme()
  const crosshairSubRef = useRef<MouseEventHandler<Time>>()
  const clickSubRef = useRef<MouseEventHandler<Time>>()
  const chartRef = $chartRef.get()
  const mainSeries = $mainSeries.get()
  const alertPriceLinesRef = useRef<IPriceLine[]>([])
  const loading = useStore($loading)

  const timeframe = useStore($timeframe)
  const data = useStore($entries)
  const seriesType = useStore($seriesType)
  const variantIndex = useStore($variantIndex)
  const precision = getMetricPrecision(metric, variantIndex)

  const [error, setError] = useState<FetchError | string>("")
  const [alertDraft, setAlertDraft] = useState<AlertDraft>()
  const alertPreviewRef = useRef<IPriceLine>()

  // console.log("📜 LOG > MetricChart render", data.length, loading);
  useEffect(() => {
    async function setup() {
      const { query } = await loadMetricFns(metric.protocol, metric.id)

      if (!metric.timeframes.includes(timeframe)) return
      if ($loading.get()) return
      // console.log("📜 LOG > MetricChart > fetching");

      $loading.set(true)
      setError("")

      Promise.all([
        retry(
          () => query({ priceUnit, since: $since.get(), timeframe, until: $until.get() }),
          3,
          (attemptNumber, cooldown, error) => {
            if (error instanceof Error) {
              setError({
                attemptNumber,
                message: `${error.name}: ${error.message}`,
              })
              error.message = `${error.message} attempt #${attemptNumber}`
              logError(error)
            } else {
              logError(error)
            }
          }
        ),
        wait($loopsAllowed.get() ? 333 : 100),
      ])
        .then(([data]) => {
          const map = data.reduce((acc, curr) => {
            acc[curr.timestamp] = curr
            return acc
          }, {} as EntryMap)

          $entryMap.set(map)
          $entries.set(data)
          // console.log("📜 LOG > MetricChart > fetching finished");
        })
        .catch((error) => {
          logError(error)
          setError({
            attemptNumber: 3,
            finished: true,
            message: `${error.name}: ${error.message}`,
          })
        })
        .finally(() => {
          $loading.set(false)
        })
    }

    setup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe, priceUnit])

  const mainSeriesData = useMemo(() => {
    if (data.length === 0) return []

    if (!isCandleArray(data)) {
      throw new Error("This should never happen!")
    }

    const mapCandleToCandleData = createCandleMapper(precision)
    const mapCandleToLineData = createLineMapper(precision)
    return seriesType === "Candlestick"
      ? data.map(mapCandleToCandleData)
      : data.map(mapCandleToLineData)
  }, [data, precision, seriesType])

  useEffect(() => {
    const cleanup = $scaleMode.subscribe((mode) => {
      chartRef.current?.priceScale("right").applyOptions({
        mode,
      })
    })

    return cleanup
  }, [])

  useEffect(() => {
    $legendTimestamp.set(data[data.length - 1]?.timestamp)
  }, [data])

  useEffect(() => {
    // console.log(
    //   // "📜 LOG > MetricChart > useEffect > createSeries:",
    //   // !!mainSeries.current,
    //   !!chartRef.current,
    //   mainSeriesData.length
    // );
    if (mainSeriesData.length === 0) return
    if (mainSeries.current) {
      try {
        chartRef.current?.removeSeries(mainSeries.current)
      } catch (e) {}
    }

    if (seriesType === "Candlestick") {
      mainSeries.current = chartRef.current?.addCandlestickSeries(candleStickOptions)
    } else {
      const primaryColor = theme.palette.primary.main
      mainSeries.current = chartRef.current?.addLineSeries({
        color: primaryColor,
        lineType: 2,
      })
    }

    mainSeries.current?.setData(mainSeriesData)
    mainSeries.current?.applyOptions({
      priceFormat: {
        minMove: 1 / 10 ** significantDigits,
      },
    })
    chartRef.current?.priceScale("right").applyOptions({
      mode: $scaleMode.get(),
    })

    // const volumeSeries = chartRef.current?.addHistogramSeries({
    //   color: "#000",
    //   priceFormat: {
    //     type: "volume",
    //   },
    //   priceScaleId: "", // set as an overlay by setting a blank priceScaleId
    // })

    // volumeSeries?.priceScale().applyOptions({
    //   scaleMargins: {
    //     bottom: 0,
    //     top: 0.25,
    //   },
    // })

    // volumeSeries?.setData(mainSeriesData.map((x) => ({ time: x.time, value: x.volume })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainSeriesData, theme, seriesType, significantDigits])

  useEffect(() => {
    if (crosshairSubRef.current) {
      chartRef.current?.unsubscribeCrosshairMove(crosshairSubRef.current)
    }

    const subRef = ({ time, point }: MouseEventParams) => {
      const validCrosshairPoint = !(!time || !point?.x || !point?.y || point.x < 0 || point.y < 0)

      if (!validCrosshairPoint) {
        const lastBar = mainSeries.current?.dataByIndex(Infinity, -1)
        time = lastBar?.time as Time
      }

      $legendTimestamp.set(String((time as number) + TZ_OFFSET))
    }
    chartRef.current?.subscribeCrosshairMove(subRef)

    crosshairSubRef.current = subRef

    const chart = chartRef.current
    return function cleanup() {
      chart?.unsubscribeCrosshairMove(subRef)
    }
  }, [mainSeriesData])

  useEffect(() => {
    if (clickSubRef.current) {
      chartRef.current?.unsubscribeClick(clickSubRef.current)
    }

    const subRef = ({ time, point, sourceEvent }: MouseEventParams) => {
      if (!point || !sourceEvent) {
        return
      }
      // console.log(`Click at ${point.x}, ${point.y}. The time is ${time}. `);
      setAlertDraft({
        clientX: sourceEvent.clientX,
        clientY: sourceEvent.clientY,
        value: parseFloat(
          (mainSeries.current?.coordinateToPrice(point.y) as number).toFixed(significantDigits)
        ),
      })
    }
    chartRef.current?.subscribeClick(subRef)

    clickSubRef.current = subRef

    const chart = chartRef.current
    return function cleanup() {
      chart?.unsubscribeClick(subRef)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainSeriesData, chartRef.current])

  useEffect(() => {
    setTimeout(
      () => {
        chartRef.current?.applyOptions({
          localization: {
            priceFormatter: createPriceFormatter(
              significantDigits,
              priceUnit,
              allowCompactPriceScale
            ),
          },
        })
      },
      $loopsAllowed.get() ? 300 : 80
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceUnit])

  useEffect(() => {
    chartRef.current?.timeScale().applyOptions({
      secondsVisible: ["Block"].includes(timeframe),
      timeVisible: ["Hour", "Minute", "Block"].includes(timeframe),
    })
  }, [timeframe])

  const handleNewData = useCallback(
    (data: Candle) => {
      const precision = getMetricPrecision(metric, $variantIndex.get())

      if (priceUnit !== priceUnits[$priceUnitIndex.get()]) {
        return
      }

      const entries = $entries.get()
      if (entries.length === 0) return
      if (entries[entries.length - 1].timestamp > data.timestamp) {
        return
      }

      if (isCandleArray(entries) && isCandle(data)) {
        if (isEqual(data, $entryMap.get()[data.timestamp])) return
        if (entries[entries.length - 1].timestamp !== data.timestamp) {
          // for candles we want to update the last value because high/low/close has likely changed
          entries.push(data)
        } else {
          entries[entries.length - 1] = data
        }
        $entryMap.setKey(data.timestamp, data)
        $legendTimestamp.set(data.timestamp)

        const mapCandleToCandleData = createCandleMapper(precision)
        const mapCandleToLineData = createLineMapper(precision)
        try {
          if ($seriesType.get() === "Line") {
            mainSeries.current?.update(mapCandleToLineData(data))
          } else {
            mainSeries.current?.update(mapCandleToCandleData(data))
          }
        } catch {
          // Suppress error, the page was probably changed
        }
      }
    },
    [metric, priceUnit, priceUnits]
  )

  useLiveData(
    data[data.length - 1]?.timestamp,
    metric,
    priceUnit,
    handleNewData,
    !loading && !error && data.length > 0
  )

  const { opacity } = useSpring({
    config: SPRING_CONFIGS.quick,
    from: { opacity: 0 },
    to: error || loading ? { opacity: 0 } : { opacity: 1 },
  })

  useEffect(() => {
    if (alertPreviewRef.current) {
      mainSeries.current?.removePriceLine(alertPreviewRef.current)
    }

    if (!alertDraft) {
      return
    }

    const primaryColor = theme.palette.primary.main
    alertPreviewRef.current = mainSeries.current?.createPriceLine({
      // LightweightCharts.LineStyle.Dotted,
      axisLabelVisible: true,
      color: primaryColor,
      lineStyle: 3,
      lineWidth: 1,
      price: alertDraft?.value,
      title: "🕒",
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertDraft])

  useEffect(() => {
    const cleanup = $alerts.subscribe(() => {
      // delete existing
      alertPriceLinesRef.current.forEach((line) => {
        mainSeries.current?.removePriceLine(line)
      })
      alertPriceLinesRef.current = []
      // re-create all
      if (!mainSeries.current) {
        return
      }
      const primaryColor = theme.palette.primary.main
      findAlertsForMetric(metric.id, $priceUnitIndex.get(), $variantIndex.get()).forEach(
        (alert) => {
          if (alert.paused) return
          const line = mainSeries.current?.createPriceLine({
            // LightweightCharts.LineStyle.Dotted,
            axisLabelVisible: true,
            color: primaryColor,
            lineStyle: 3,
            lineWidth: 1,
            price: new Decimal(alert.triggerValue).div(precision).toNumber(),
            title: "🕒",
          })
          if (line) {
            alertPriceLinesRef.current.push(line)
          }
        }
      )
    })

    return cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!mainSeries.current) {
      return
    }
    const primaryColor = theme.palette.primary.main
    findAlertsForMetric(metric.id, $priceUnitIndex.get(), $variantIndex.get()).forEach((alert) => {
      if (alert.paused) return
      const line = mainSeries.current?.createPriceLine({
        // LightweightCharts.LineStyle.Dotted,
        axisLabelVisible: true,
        color: primaryColor,
        lineStyle: 3,
        lineWidth: 1,
        price: new Decimal(alert.triggerValue).div(precision).toNumber(),
        title: "🕒",
      })
      if (line) {
        alertPriceLinesRef.current.push(line)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainSeries.current])

  return (
    <>
      <ProtocolProgress loading={loading} protocolId={metric.protocol} />
      <ErrorOverlay error={error} />
      <animated.div
        style={{
          height: "100%",
          opacity,
          width: "100%",
        }}
      >
        <CandleChartLegend
          precision={precision}
          unitLabel={priceUnit}
          significantDigits={significantDigits}
          metricTitle={title}
        />
        <MemoChart
          chartRef={chartRef}
          unitLabel={priceUnit}
          significantDigits={significantDigits}
          allowCompactPriceScale={allowCompactPriceScale}
        />
      </animated.div>
      <AlertModal
        metric={metric}
        precision={precision}
        unitLabel={priceUnit}
        significantDigits={significantDigits}
        draft={alertDraft}
        setDraft={setAlertDraft}
      />
    </>
  )
}
