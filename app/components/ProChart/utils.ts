import { Metric, METRICS, PROTOCOL_MAP, Timeframe } from "protofun"

import {
  LibrarySymbolInfo,
  ResolutionString,
  SearchSymbolResultItem,
} from "./charting_library/charting_library"

type ProSymbol = LibrarySymbolInfo & SearchSymbolResultItem

export function toSymbol(metric: Metric): ProSymbol {
  const name = `${metric.protocol}_${metric.id}`
  const protocol = PROTOCOL_MAP[metric.protocol]

  const exchange = name.includes("_price") ? "Binance" : "Protofun"
  const exchangeLogo =
    exchange === "Binance"
      ? "https://s3-symbol-logo.tradingview.com/provider/binance.svg"
      : "https://protocol.fun/icon-512x512.png"

  return {
    currency_code: "USD",
    data_status: "streaming",
    description: `${protocol.title} ${metric.title}`,
    exchange,
    exchange_logo: exchangeLogo,
    format: "price",
    full_name: `${exchange.toLowerCase()}:${name}`,
    has_intraday: true,
    industry: "Blockchain",
    listed_exchange: exchange,
    logo_urls: [`/assets/${metric.protocol}.svg`],
    minmov: 0.01,
    // TODO
    name,

    pricescale: 100,
    // TODO
    // sector: "DeFi",
    session: "24x7",
    supported_resolutions: ["1", "60", "1D", "1W"] as ResolutionString[],
    symbol: name,
    timezone: "Etc/UTC",
    type: exchange === "Binance" ? "token price" : "fundamental",
    // intraday_multipliers: [supportedResolutions],
    // supported_resolutions: ["60"] as ResolutionString[],
    // ticker: metric.id,
    // visible_plots_set: "ohlcv",
    // volume_precision: 8,
  }
}

export const SYMBOLS = METRICS.map(toSymbol)

export const RESOLUTION_TO_TIMEFRAME: Record<string, Timeframe> = {
  "1": "Minute",
  "1D": "Day",
  "1W": "Week",
  "60": "Hour",
}
