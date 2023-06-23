import { useCallback, useEffect, useRef } from "react";
import { useInterval } from "usehooks-ts";

import { $timeframe } from "../stores/home-page";
import { Candle, queryCandles } from "../utils/candle-utils";

export function useNewCandlesSub(
  initialTimestamp: string,
  handleNewCandle: (candle: Candle) => void
) {
  const lastTimestamp = useRef<string>(initialTimestamp);

  useEffect(() => {
    lastTimestamp.current = initialTimestamp;
  }, [initialTimestamp]);

  const tryFetch = useCallback(async () => {
    console.log("📜 LOG > useLatestCandles > since", lastTimestamp.current);
    const timeframe = $timeframe.get();
    const candle = await queryCandles(timeframe, lastTimestamp.current);
    console.log("📜 LOG > useLatestCandles > response", candle);

    if (timeframe !== $timeframe.get()) {
      // TODO: this is not working
      console.log(
        "📜 LOG > useLatestCandles > discard because timeframe changed"
      );
      return;
    }
    if (candle.length) {
      lastTimestamp.current = candle[candle.length - 1].timestamp;
      candle.forEach(handleNewCandle);
    }
  }, [handleNewCandle]);

  useInterval(
    tryFetch,
    // Delay in milliseconds or null to stop it
    // 12 * 1000
    5 * 1000 // TODO
  );
}
