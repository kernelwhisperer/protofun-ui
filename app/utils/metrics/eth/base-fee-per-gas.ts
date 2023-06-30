import { execute } from "../../../../.graphclient";
import { Timeframe } from "../../../stores/metrics";
import { queryBlocks, queryBlocksSince } from "../../block-utils";
import { Candle } from "../../candle-utils";
import { IndexerError } from "../../errors";

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
      errorMessage.includes("ECONNREFUSED") ||
      errorMessage.includes("Failed to fetch")
    ) {
      errorMessage = "Connection failed";
    }

    throw new IndexerError(errorMessage);
  }

  if (response.data[entityId].length === 0) {
    throw new IndexerError("Empty response. Has the subgraph finish syncing?");
  }

  return response.data[entityId].reverse();
}

export async function queryBaseFeePerGas(timeframe: Timeframe, since?: string) {
  if (timeframe === "Block" && since) {
    return queryBlocksSince(since);
  }

  return timeframe === "Block" ? queryBlocks() : queryCandles(timeframe, since);
}
