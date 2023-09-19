import { useStore } from "@nanostores/react"
import { Metric, PriceUnit, SubscribeResult } from "protofun"
import { useCallback, useEffect, useRef } from "react"

import { $liveMode, $timeframe } from "../stores/metric-page"
import { Candle } from "../utils/candle-utils"
import { loadMetricFns } from "../utils/client-utils"

export function useLiveData(
  initialTimestamp: string,
  metric: Metric,
  priceUnit: PriceUnit,
  onNewData: (data: Candle) => void,
  active: boolean
) {
  const lastTimestamp = useRef<string>(initialTimestamp)
  const liveMode = useStore($liveMode)

  useEffect(() => {
    lastTimestamp.current = initialTimestamp
  }, [initialTimestamp])

  const setup = useCallback(async () => {
    const { subscribe } = await loadMetricFns(metric.protocol, metric.id)
    const timeframe = $timeframe.get()

    const unsubscribe = subscribe({
      onNewData,
      priceUnit,
      since: lastTimestamp.current,
      timeframe,
    })

    return unsubscribe
  }, [metric, onNewData, priceUnit])

  useEffect(() => {
    let cleanup: SubscribeResult
    let isCancelled = false

    if (liveMode && active) {
      setup().then((unsubscribe) => {
        if (!isCancelled) {
          cleanup = unsubscribe
        } else {
          unsubscribe()
        }
      })
    }

    return () => {
      isCancelled = true
      if (cleanup) cleanup()
    }
  }, [active, liveMode, setup])
}
