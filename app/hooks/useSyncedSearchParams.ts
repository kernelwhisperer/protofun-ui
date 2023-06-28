import { useStore } from "@nanostores/react";
import { useEffect } from "react";

import { $timeframe } from "../stores/metric-page";

function updateSearchParams(searchParams: string) {
  window.history.pushState(
    {},
    "",
    `${window.location.pathname}?${searchParams}`
  );
}

export function useSyncedSearchParams() {
  const timeframe = useStore($timeframe);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (timeframe !== searchParams.get("timeframe")) {
      searchParams.set("timeframe", timeframe);
      updateSearchParams(searchParams.toString());
    }
  }, [timeframe]);
}
