import { useStore } from "@nanostores/react";
import { useEffect } from "react";

import { $priceUnitIndex, $timeframe } from "../stores/metrics";

function updateSearchParams(searchParams: string) {
  window.history.pushState(
    {},
    "",
    `${window.location.pathname}?${searchParams}`
  );
}

export function useSyncedSearchParams() {
  const timeframe = useStore($timeframe);
  const priceUnitIndex = useStore($priceUnitIndex);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (timeframe !== searchParams.get("timeframe")) {
      searchParams.set("timeframe", timeframe);
      updateSearchParams(searchParams.toString());
    }
  }, [timeframe]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (String(priceUnitIndex) !== searchParams.get("unit")) {
      searchParams.set("unit", String(priceUnitIndex));
      updateSearchParams(searchParams.toString());
    }
  }, [priceUnitIndex]);
}
