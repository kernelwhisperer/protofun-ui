import { useStore } from "@nanostores/react"
import { Metric, PROTOCOL_MAP, TIME_FRAMES } from "protofun"
import { useEffect } from "react"

import { $priceUnitIndex, $timeframe, $variantIndex } from "../stores/metric-page"

export function DocumentTitleSideEffect({ metric }: { metric: Metric }) {
  const timeframe = useStore($timeframe)
  const priceUnitIndex = useStore($priceUnitIndex)
  const variantIndex = useStore($variantIndex)

  useEffect(() => {
    // using setTimeout so that it runs after SearchParamSideEffect
    setTimeout(() => {
      const variantLabel = metric.variants ? `(${metric.variants[variantIndex].label}) ` : ""

      window.document.title = `${metric.title} ${variantLabel}· ${TIME_FRAMES[timeframe]} · ${
        metric.priceUnits[priceUnitIndex]
      } · ${PROTOCOL_MAP[metric.protocol].title} · Protocol Fundamentals`
    }, 0)
  }, [metric, timeframe, priceUnitIndex, variantIndex])

  return null
}
