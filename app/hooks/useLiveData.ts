import { useStore } from "@nanostores/react";
import { useCallback, useEffect, useRef } from "react";
import { useInterval } from "usehooks-ts";

import { $liveMode, $timeframe } from "../stores/metric-page";
import { queryBlocksSince, SimpleBlock } from "../utils/block-utils";
import { Candle, queryCandles } from "../utils/candle-utils";

export function useLiveData(
  initialTimestamp: string,
  handleNewData: (data: Candle | SimpleBlock) => void,
  active: boolean
) {
  const lastTimestamp = useRef<string>(initialTimestamp);
  const liveMode = useStore($liveMode);

  useEffect(() => {
    lastTimestamp.current = initialTimestamp;
  }, [initialTimestamp]);

  const tryFetch = useCallback(async () => {
    const timeframe = $timeframe.get();
    // console.log(
    //   "📜 LOG > useLiveData > since",
    //   lastTimestamp.current,
    //   timeframe
    // );

    const fetchPromise =
      timeframe === "Block"
        ? queryBlocksSince(lastTimestamp.current)
        : queryCandles(timeframe, lastTimestamp.current);

    const data = await fetchPromise;
    // console.log("📜 LOG > useLiveData > response", timeframe, data);

    if (data.length) {
      lastTimestamp.current = data[data.length - 1].timestamp;
      data.forEach(handleNewData);
    }
  }, [handleNewData]);

  useInterval(
    tryFetch,
    // Delay in milliseconds or null to stop it
    // 12 * 1000
    liveMode && active ? 3 * 1000 : null // TODO
  );
}
