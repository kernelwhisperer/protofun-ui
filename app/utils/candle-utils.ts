import { CandlestickData, LineData, UTCTimestamp } from "lightweight-charts";

import { execute } from "../../.graphclient";
import { Timeframe } from "../stores/home-page";
import { TZ_OFFSET } from "./client-utils";

const getEntityId = (timeframe: Timeframe) =>
  `baseFeePerGas${timeframe}Candles`;

export async function getLatestCandles(
  timeframe: Timeframe
): Promise<Candle[]> {
  const entityId = getEntityId(timeframe);
  return execute(
    `
  query FetchLatest {
    ${entityId}(first: 1000, orderBy: timestamp, orderDirection: desc) {
      timestamp
      open
      high
      low
      close
    }
  }
  `,
    {}
  ).then((res) => res.data[entityId].reverse());
}

export async function getCandlesSince(
  timeframe: Timeframe,
  since: string
): Promise<Candle[]> {
  const entityId = getEntityId(timeframe);
  return (
    execute(
      `
  query FetchLatest($since: BigInt!) {
    ${entityId}(first: 1000, orderBy: timestamp, orderDirection: desc, where: { timestamp_gte: $since }) {
      timestamp
      open
      high
      low
      close
    }
  }
  `,
      { since }
    )
      // .then(console.log);
      .then((x) => x.data[entityId].reverse())
  );
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
