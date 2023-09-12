import { execute, getBuiltGraphSDK } from "../../../../.graphclient"
import { PriceUnit, Timeframe } from "../../../stores/metrics"
import { Candle } from "../../candle-utils"
import { IndexerError } from "../../errors"

const sdk = getBuiltGraphSDK()

export async function queryBlocks() {
  try {
    const res = await sdk.FetchLastBlocks()

    if (res.blocks.length === 0) {
      throw new IndexerError("Empty response. Has the subgraph finish syncing?")
    }

    return res.blocks.reverse()
  } catch (error) {
    let errorMessage = (error as Error).message
    if (errorMessage.includes("ECONNREFUSED")) {
      errorMessage = "Connection failed"
    }

    throw new IndexerError(errorMessage)
  }
}

export async function queryBlocksSince(timestamp: string) {
  try {
    const res = await sdk.FetchBlocksSince({
      since: timestamp,
    })

    return res.blocks.reverse()
  } catch (error) {
    let errorMessage = (error as Error).message
    if (errorMessage.includes("ECONNREFUSED")) {
      errorMessage = "Connection failed"
    }

    throw new IndexerError(errorMessage)
  }
}

const getEntityId = (timeframe: Timeframe) => `baseFeePerGas${timeframe}Candles`

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
`

export async function queryCandles(timeframe: Timeframe, since = "0"): Promise<Candle[]> {
  const entityId = getEntityId(timeframe)
  const response = await execute(fetchLatestQuery(entityId), { since })

  if (response.errors) {
    let errorMessage = response.errors.map((x) => x.message).join("\n")
    if (errorMessage.includes("ECONNREFUSED") || errorMessage.includes("Failed to fetch")) {
      errorMessage = "Connection failed"
    }

    throw new IndexerError(errorMessage)
  }

  if (response.data[entityId].length === 0) {
    throw new IndexerError("Empty response. Has the subgraph finish syncing?")
  }

  return response.data[entityId].reverse()
}

// TODO enable text compression
export default async function queryBaseFeePerGas(
  timeframe: Timeframe,
  since?: string,
  _priceUnit?: PriceUnit
) {
  if (timeframe === "Block" && since) {
    return queryBlocksSince(since)
  }

  return timeframe === "Block" ? queryBlocks() : queryCandles(timeframe, since)
}
