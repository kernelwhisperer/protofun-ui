import { getSignificantDigits, Metric, METRICS, PROTOCOL_MAP, Timeframe } from "protofun"

import {
  LibrarySymbolInfo,
  ResolutionString,
  SearchSymbolResultItem,
} from "./charting_library/charting_library"

export const RESOLUTION_TO_TIMEFRAME: Record<string, Timeframe> = {
  "1": "Minute",
  "1D": "Day",
  "1W": "Week",
  "60": "Hour",
}
export const TIMEFRAME_TO_RESOLUTION: Record<Timeframe, string> = {
  Block: "1",
  Day: "1D",
  Hour: "60",
  Minute: "1",
  Week: "1W",
}

type ProSymbol = LibrarySymbolInfo & SearchSymbolResultItem

export function toSymbol(metric: Metric): ProSymbol {
  const name = `${metric.protocol}_${metric.id}`.toUpperCase()
  const protocol = PROTOCOL_MAP[metric.protocol]

  const exchange = name.includes("_PRICE") ? "Binance" : "Protofun"
  const exchangeLogo =
    exchange === "Binance"
      ? "https://s3-symbol-logo.tradingview.com/provider/binance.svg"
      : "https://protocol.fun/icon-512x512.png"

  const priceScale = 10 ** getSignificantDigits(metric, 0)
  const minMove = 100 / priceScale
  const fullName = `${exchange.toUpperCase()}:${name}`

  const result: ProSymbol = {
    currency_code: metric.priceUnits[0],
    data_status: "streaming",
    description: `${protocol.title} ${metric.title}`,
    exchange,
    exchange_logo: exchangeLogo,
    format: "price",
    full_name: fullName,
    has_intraday: true,
    industry: "Blockchain",
    listed_exchange: exchange,
    logo_urls: [`/assets/${metric.protocol}.svg`],
    minmov: minMove,
    name,
    pricescale: priceScale,
    // sector: "DeFi", // TODO
    session: "24x7",
    supported_resolutions: metric.timeframes
      .filter((x) => x !== "Block")
      .map((x) => TIMEFRAME_TO_RESOLUTION[x]) as ResolutionString[],
    symbol: name,
    ticker: fullName,
    timezone: "Etc/UTC",
    type: exchange === "Binance" ? "token price" : "fundamental",
    // original_currency_code: "USD",
    // intraday_multipliers: [supportedResolutions],
    // supported_resolutions: ["60"] as ResolutionString[],
    // ticker: metric.id,
    visible_plots_set: metric.disallowCandleType ? "c" : "ohlc",
    // volume_precision: 8,
  }

  // console.log("📜 LOG > toSymbol > result:", Object.assign({}, result))
  return result
}

export const SYMBOLS = METRICS.map(toSymbol)

export const CHART_DATA_KEY = "PRO_CHART_DATA"

export const saveChartData = (state: object) => {
  window.localStorage.setItem(CHART_DATA_KEY, JSON.stringify(state))
}

export const loadChartData = () => {
  const rawChartData = window.localStorage.getItem(CHART_DATA_KEY)
  return rawChartData ? JSON.parse(rawChartData) : undefined
}
