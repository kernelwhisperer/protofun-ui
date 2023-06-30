import { Timeframe } from "../../../stores/metrics";

export const TIMEFRAME_TO_INTERVAL_MAP: Record<Timeframe, string | null> = {
  Block: null,
  Day: "1d",
  Hour: "1h",
  Minute: "1m",
  Week: "1w",
};

export async function queryEtherPrice(timeframe: Timeframe, since?: string) {
  const interval = TIMEFRAME_TO_INTERVAL_MAP[timeframe];

  if (!interval) throw new Error("Timeframe unsupported for this metric.");

  let apiUrl = `https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=${interval}&limit=1000`;
  if (since) {
    const timestamp = parseInt(since) * 1000;
    apiUrl = `${apiUrl}&startTime=${timestamp}&endTime=${timestamp + 1e5}`;
  }

  const res = await fetch(apiUrl);
  const data = await res.json();

  return data.map((x: any) => ({
    close: x[4],
    high: x[2],
    low: x[3],
    open: x[1],
    timestamp: x[0] / 1000,
  }));
}
