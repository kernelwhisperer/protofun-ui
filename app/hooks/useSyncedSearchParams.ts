import { useStore } from "@nanostores/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { $priceUnitIndex, $timeframe, $variantIndex } from "../stores/metric-page"

export function useSyncedSearchParams() {
  const router = useRouter()

  const timeframe = useStore($timeframe)
  const priceUnitIndex = useStore($priceUnitIndex)
  const variantIndex = useStore($variantIndex)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

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
      router.replace(`${window.location.pathname}?${searchParams.toString()}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeframe, priceUnitIndex, variantIndex])
}
