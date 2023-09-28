import { Candle, getMetric, getMetricPrecision, MetricId, ProtocolId } from "protofun"

import { $variantIndex } from "../../stores/metric-page"
import { loadMetricFns } from "../../utils/client-utils"
import { Bar, IBasicDataFeed, ResolutionString } from "./charting_library/charting_library"
import { RESOLUTION_TO_TIMEFRAME, SYMBOLS } from "./utils"

export function createCandleMapper(precision: number) {
  return function customMapper(candle: Candle): Bar {
    return {
      close: parseFloat(candle.close) / precision,
      high: parseFloat(candle.high) / precision,
      low: parseFloat(candle.low) / precision,
      open: parseFloat(candle.open) / precision,
      time: parseInt(candle.timestamp) * 1000,
    }
  }
}

export const datafeed: IBasicDataFeed = {
  getBars: async (symbolInfo, resolution, periodParams, onResult, onError) => {
    if (!periodParams.firstDataRequest) return onResult([]) // TODO
    console.log(
      "📜 LOG > getBars: > symbolInfo, resolution, periodParams:",
      symbolInfo.name,
      resolution,
      new Date(periodParams.from * 1000),
      new Date(periodParams.to * 1000),
      periodParams.firstDataRequest,
      periodParams.countBack
    )

    try {
      const delimiter = symbolInfo.name.indexOf("_")
      const protocolId = symbolInfo.name.substring(0, delimiter) as ProtocolId
      const metricId = symbolInfo.name.substring(delimiter + 1) as MetricId
      const metric = getMetric(protocolId, metricId)

      // const variantIndex = useStore($variantIndex) TODO
      const variantIndex = $variantIndex.get()
      const precision = getMetricPrecision(metric, variantIndex)
      const mapCandleToCandleData = createCandleMapper(precision)
      const { query } = await loadMetricFns(metric.protocol, metric.id)

      const candles = await query({
        // limit: periodParams.countBack, TODO
        timeframe: RESOLUTION_TO_TIMEFRAME[resolution],
      })

      const parsed = candles.map(mapCandleToCandleData)
      onResult(parsed as Bar[])
    } catch (error: unknown) {
      onError(String(error))
    }
  },
  onReady: (onReadyCallback) => {
    setTimeout(() => {
      onReadyCallback({
        currency_codes: [
          { code: "USD", description: "$", id: "USD" },
          { code: "EUR", description: "€", id: "EUR" },
        ],
        exchanges: [
          {
            desc: "",
            name: "All",
            value: "",
          },
          {
            desc: "https://protocol.fun",
            name: "Protofun",
            value: "Protofun",
          },
          {
            desc: "https://binance.com",
            name: "Binance",
            value: "Binance",
          },
        ],
        supported_resolutions: ["1", "60", "1D", "1W"] as ResolutionString[],
        supports_time: true, // TODO
        symbols_types: [
          {
            name: "All",
            value: "",
          },
          {
            name: "Token price",
            value: "token price",
          },
          {
            name: "Fundamental",
            value: "fundamental",
          },
        ],
      })
    }, 0)
  },
  resolveSymbol: (fullName, onResolve, onError) => {
    // console.log("📜 LOG > createDatafeed > resolveSymbol", fullName)
    setTimeout(() => {
      const symbolName = fullName.includes(":") ? fullName.split(":")[1] : fullName

      const symbol = SYMBOLS.find((x) => x.name === symbolName)
      if (symbol) {
        onResolve(symbol)
      } else {
        onError(`Cannot find symbol ${symbolName}`)
      }
    }, 0)
  },
  searchSymbols: (userInput, exchange, symbolType, onResult) => {
    // console.log("📜 LOG > createDatafeed > searchSymbols:", userInput, exchange, symbolType)
    userInput = userInput.toLowerCase()

    const symbols = SYMBOLS.filter(
      (x) =>
        (!userInput ||
          x.name.includes(userInput) ||
          x.description.toLowerCase().includes(userInput)) &&
        (!symbolType || symbolType === x.type) &&
        (!exchange || exchange === x.exchange)
    )
    onResult(symbols)
  },
  subscribeBars: (
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) => {
    // console.log("📜 LOG >[subscribeBars]: Method call with subscriberUID:", subscriberUID)
  },
  unsubscribeBars: (subscriberUID) => {
    // console.log("📜 LOG >[unsubscribeBars]: Method call with subscriberUID:", subscriberUID)
  },
}
