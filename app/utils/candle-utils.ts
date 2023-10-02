import { CandlestickData, LineData, UTCTimestamp } from "lightweight-charts"
import { Candle } from "protofun"

import { TZ_OFFSET } from "./client-utils"

type CandlestickDataWithVolume = CandlestickData & {
  volume?: number
}

export function createCandleMapper(precision: number) {
  return function customMapper(candle: Candle): CandlestickDataWithVolume {
    return {
      close: parseFloat(candle.close) / precision,
      high: parseFloat(candle.high) / precision,
      low: parseFloat(candle.low) / precision,
      open: parseFloat(candle.open) / precision,
      time: (parseInt(candle.timestamp) - TZ_OFFSET) as UTCTimestamp,
      volume: candle.volume ? parseFloat(candle.volume) / precision : undefined,
    }
  }
}
export function createLineMapper(precision: number) {
  return function customMapper(candle: Candle): LineData {
    return {
      time: (parseInt(candle.timestamp) - TZ_OFFSET) as UTCTimestamp,
      value: parseFloat(candle.close) / precision,
    }
  }
}

export function isCandle(value: unknown): value is Candle {
  return typeof value === "object" && value !== null && "open" in value
}

export function isCandleArray(value: unknown[]): value is Candle[] {
  return Array.isArray(value) && value.length > 0 && isCandle(value[0])
}
