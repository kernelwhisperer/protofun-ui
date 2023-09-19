import { useStore } from "@nanostores/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { $priceUnitIndex, $timeframe } from "../stores/metric-page"

export function useSyncedSearchParams() {
  const router = useRouter()

  const timeframe = useStore($timeframe)
  const priceUnitIndex = useStore($priceUnitIndex)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    if (timeframe !== searchParams.get("timeframe")) {
      searchParams.set("timeframe", timeframe)
    }

    if (String(priceUnitIndex) !== searchParams.get("unit")) {
      searchParams.set("unit", String(priceUnitIndex))
    }

    if (!window.location.search.includes(searchParams.toString())) {
      router.replace(`${window.location.pathname}?${searchParams.toString()}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe, priceUnitIndex])
}
