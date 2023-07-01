import { Timeframe } from "../../../stores/metrics";
import { Candle } from "../../candle-utils";

export const TIMEFRAME_TO_INTERVAL_MAP: Record<Timeframe, string | null> = {
  Block: null,
  Day: "1d",
  Hour: "1h",
  Minute: "1m",
  Week: "1w",
};

export async function queryEtherPrice(
  timeframe: Timeframe,
  since?: string
): Promise<Candle[]> {
  const interval = TIMEFRAME_TO_INTERVAL_MAP[timeframe];

  if (!interval) throw new Error("Timeframe unsupported for this metric.");

  let apiUrl = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=${interval}&limit=1000`;
  if (since) {
    const timestamp = parseInt(since) * 1000;
    apiUrl = `${apiUrl}&startTime=${timestamp}&endTime=${timestamp + 1e5}`;
  }

  const res = await fetch(apiUrl);
  const data = await res.json();

  // [
  //   [
  //     1499040000000,      // Kline open time
  //     "0.01634790",       // Open price
  //     "0.80000000",       // High price
  //     "0.01575800",       // Low price
  //     "0.01577100",       // Close price
  //     "148976.11427815",  // Volume
  //     1499644799999,      // Kline Close time
  //     "2434.19055334",    // Quote asset volume
  //     308,                // Number of trades
  //     "1756.87402397",    // Taker buy base asset volume
  //     "28.46694368",      // Taker buy quote asset volume
  //     "0"                 // Unused field, ignore.
  //   ]
  // ]
  return data.map((x: any) => ({
    close: x[4],
    high: x[2],
    low: x[3],
    open: x[1],
    timestamp: String(x[0] / 1000),
  }));
}
