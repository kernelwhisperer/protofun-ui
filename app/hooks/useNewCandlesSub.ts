import { useStore } from "@nanostores/react";
import { useCallback, useEffect, useRef } from "react";
import { useInterval } from "usehooks-ts";

import { $liveMode, $timeframe } from "../stores/metric-page";
import { Candle, queryCandles } from "../utils/candle-utils";

export function useNewCandlesSub(
  initialTimestamp: string,
  handleNewCandle: (candle: Candle) => void,
  active: boolean
) {
  const lastTimestamp = useRef<string>(initialTimestamp);
  const liveMode = useStore($liveMode);

  useEffect(() => {
    lastTimestamp.current = initialTimestamp;
  }, [initialTimestamp]);

  const tryFetch = useCallback(async () => {
    console.log("📜 LOG > useLatestCandles > since", lastTimestamp.current);
    const timeframe = $timeframe.get();
    const candles = await queryCandles(timeframe, lastTimestamp.current);
    console.log("📜 LOG > useLatestCandles > response", candles);

    if (timeframe !== $timeframe.get()) {
      // TODO: this is not working
      console.log(
        "📜 LOG > useLatestCandles > discard because timeframe changed"
      );
      return;
    }
    if (candles.length) {
      lastTimestamp.current = candles[candles.length - 1].timestamp;
      candles.forEach(handleNewCandle);
    }
  }, [handleNewCandle]);

  useInterval(
    tryFetch,
    // Delay in milliseconds or null to stop it
    // 12 * 1000
    liveMode && active ? 5 * 1000 : null // TODO
  );
}
