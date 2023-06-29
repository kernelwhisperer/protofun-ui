import { CandlestickData, LineData, UTCTimestamp } from "lightweight-charts";

import { TZ_OFFSET } from "./client-utils";

export function createCandleMapper(precision: number) {
  return function customMapper(candle: Candle): CandlestickData {
    return {
      close: parseFloat(candle.close) / precision,
      high: parseFloat(candle.high) / precision,
      low: parseFloat(candle.low) / precision,
      open: parseFloat(candle.open) / precision,
      time: (parseInt(candle.timestamp) - TZ_OFFSET) as UTCTimestamp,
    };
  };
}
export function createLineMapper(precision: number) {
  return function customMapper(candle: Candle): LineData {
    return {
      time: (parseInt(candle.timestamp) - TZ_OFFSET) as UTCTimestamp,
      value: parseFloat(candle.close) / precision,
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

export function isCandle(value: unknown): value is Candle {
  return typeof value === "object" && value !== null && "open" in value;
}

export function isCandleArray(value: unknown[]): value is Candle[] {
  return Array.isArray(value) && value.length > 0 && isCandle(value[0]);
}
