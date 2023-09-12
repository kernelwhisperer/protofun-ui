import { PriceUnit, Timeframe } from "../../../stores/metrics"
import { Candle } from "../../candle-utils"
import queryBaseFeePerGas from "./base-fee-per-gas"
import query from "./ether-price"

export default async function queryTxCost(
  timeframe: Timeframe,
  since?: string,
  priceUnit?: PriceUnit
): Promise<Candle[]> {
  if (timeframe === "Block") {
    throw new Error("queryTransferCostUsd: Block timeframe unsupported.")
  }

  let [baseFeePerGas, etherPrice] = await Promise.all([
    queryBaseFeePerGas(timeframe, since),
    priceUnit === PriceUnit.ETH ? Promise.resolve([]) : query(timeframe, since),
  ])

  if (priceUnit === PriceUnit.ETH) {
    return baseFeePerGas as Candle[]
  }

  etherPrice = etherPrice.slice(etherPrice.length - baseFeePerGas.length)
  baseFeePerGas = baseFeePerGas as Candle[]

  if (baseFeePerGas.length !== etherPrice.length) {
    console.log("📜 LOG > baseFeePerGas, etherPrice:", baseFeePerGas, etherPrice)
    throw new Error("queryTransferCostUsd: This should never happen!")
  }

  return baseFeePerGas.map((x, index) => ({
    ...x,
    close: String(parseFloat(x.close) * parseFloat(etherPrice[index].close)),
    high: String(parseFloat(x.high) * parseFloat(etherPrice[index].high)),
    low: String(parseFloat(x.low) * parseFloat(etherPrice[index].low)),
    open: String(parseFloat(x.open) * parseFloat(etherPrice[index].open)),
    timestamp: x.timestamp,
  }))
}
