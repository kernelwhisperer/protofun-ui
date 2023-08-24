import { cacheExchange, createClient, fetchExchange, gql } from "urql";

import { PriceUnit, Timeframe } from "../../../stores/metrics";
import { SimpleBlock } from "../../block-utils";
import { Candle } from "../../candle-utils";
import { IndexerError } from "../../errors";
import { MarketDailySnapshot } from "./types";

// const API_KEY = "6e951d2948be69a241891fb15ec9cefb";
const API_KEY = "2760f1cc7d18310012284ffc4be34ebc";

const API_URL = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/6PaB6tKFqrL6YoAELEhFGU6Gc39cEynLbo6ETZMF3sCy`;

const getGraphQuery = (entityId: string) => gql`
  query {
    ${entityId}(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: {
        market_: {
          id: "0xc3d688b66703497daa19211eedff47f25384cdc3c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        }
      }
    ) {
      totalValueLockedUSD
      market {
        id
        name
      }
      timestamp
    }
  }
`;

const client = createClient({
  exchanges: [cacheExchange, fetchExchange],
  url: API_URL,
});

const timeframeMapping: Partial<Record<Timeframe, string>> = {
  Day: "Daily",
  Hour: "Hourly",
};

const getEntityId = (timeframe: Timeframe) =>
  `market${timeframeMapping[timeframe]}Snapshots`;

export async function queryCandles(
  timeframe: Timeframe,
  since = "0"
): Promise<Candle[]> {
  const entityId = getEntityId(timeframe);
  const response = await client.query(getGraphQuery(entityId), {}).toPromise();

  if (response.error) {
    let errorMessage = response.error.toString();
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

  const data = response.data[entityId] as MarketDailySnapshot[];
  const parsed = [];

  for (let i = data.length - 1; i >= 0; i--) {
    parsed.push({
      close: data[i].totalValueLockedUSD,
      high: data[i].totalValueLockedUSD,
      low: data[i].totalValueLockedUSD,
      open: data[i].totalValueLockedUSD,
      timestamp: data[i].timestamp,
    });
  }

  return parsed;
}

export default async function query(
  timeframe: Timeframe,
  since?: string,
  _priceUnit?: PriceUnit
): Promise<Candle[] | SimpleBlock[]> {
  const interval = timeframeMapping[timeframe];

  if (!interval)
    throw new Error(
      `Timeframe '${timeframe}' is not supported for this metric.`
    );

  if (since) {
    throw new Error(`Live data  is not supported for this metric.`);
  }

  return queryCandles(timeframe, since);
}
