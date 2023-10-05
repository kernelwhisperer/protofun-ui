import { useStore } from "@nanostores/react"
import { useEffect } from "react"

import { $priceUnitIndex, $timeframe, $variantIndex } from "../stores/metric-page"

export function SearchParamSideEffect() {
  // console.log("📜 LOG > SearchParamSideEffect > render")

  const timeframe = useStore($timeframe)
  const priceUnitIndex = useStore($priceUnitIndex)
  const variantIndex = useStore($variantIndex)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const shouldPatch = !searchParams.get("timeframe")

    // console.log("📜 LOG > useSyncedSearchParams > useEffect", shouldPatch)

    if (timeframe !== searchParams.get("timeframe")) {
      searchParams.set("timeframe", timeframe)
    }

    if (String(priceUnitIndex) !== searchParams.get("unit")) {
      searchParams.set("unit", String(priceUnitIndex))
    }

    if (String(variantIndex) !== searchParams.get("variant")) {
      searchParams.set("variant", String(variantIndex))
    }

    if (!window.location.search.includes(searchParams.toString())) {
      const newParams = `${window.location.pathname}?${searchParams.toString()}`

      if (shouldPatch) {
        window.history.replaceState({}, "", newParams)
      } else {
        window.history.pushState({}, "", newParams)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe, priceUnitIndex, variantIndex])

  return null
}
