import { CandlestickData, LineData, UTCTimestamp } from "lightweight-charts";

import { execute } from "../../.graphclient";
import { Timeframe } from "../stores/home-page";
import { TZ_OFFSET } from "./client-utils";
import { IndexerError } from "./errors";

const getEntityId = (timeframe: Timeframe) =>
  `baseFeePerGas${timeframe}Candles`;

const fetchLatestQuery = (entityId: string) => `
query FetchLatest($since: BigInt!) {
  ${entityId}(first: 1000, orderBy: timestamp, orderDirection: desc, where: { timestamp_gte: $since }) {
    timestamp
    open
    high
    low
    close
  }
}
`;

export async function queryCandles(
  timeframe: Timeframe,
  since = "0"
): Promise<Candle[]> {
  const entityId = getEntityId(timeframe);
  const response = await execute(fetchLatestQuery(entityId), { since });

  if (response.errors) {
    let errorMessage = response.errors.map((x) => x.message).join("\n");
    if (
      errorMessage.includes("ECONNREFUSED api.protocol.fun") ||
      errorMessage.includes("Failed to fetch")
    ) {
      errorMessage = "Connection failed";
    }

    throw new IndexerError(errorMessage);
  }

  return response.data[entityId].reverse();
}

export function createCandleMapper(precision: number) {
  return function customMapper(candle: Candle): CandlestickData {
    return {
      close: parseInt(candle.close) / precision,
      high: parseInt(candle.high) / precision,
      low: parseInt(candle.low) / precision,
      open: parseInt(candle.open) / precision,
      time: (parseInt(candle.timestamp) - TZ_OFFSET) as UTCTimestamp,
    };
  };
}
export function createLineMapper(precision: number) {
  return function customMapper(candle: Candle): LineData {
    return {
      time: (parseInt(candle.timestamp) - TZ_OFFSET) as UTCTimestamp,
      value: parseInt(candle.close) / precision,
    };
  };
}

export type Candle = {
  close: string;
  high: string;
  low: string;
  open: string;
  timestamp: string;
};
