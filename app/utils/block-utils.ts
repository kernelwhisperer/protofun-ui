import { LineData, UTCTimestamp } from "lightweight-charts";

import { Block } from "../../.graphclient";
import { sdk, TZ_OFFSET } from "./client-utils";
import { IndexerError } from "./errors";

// TODO
// declare module "../../.graphclient" {
//   export type Scalars = TGScalars & {
//     BigDecimal: string;
//     BigInt: string;
//     Bytes: string;
//     Int8: string;
//   };
// }

export type SimpleBlock = Omit<Block, "txns" | "timestamp"> & {
  timestamp: string;
};

export async function queryBlocks() {
  try {
    const res = await sdk.FetchLastBlocks();

    if (res.blocks.length === 0) {
      throw new IndexerError(
        "Empty response. Has the subgraph finish syncing?"
      );
    }

    return res.blocks.reverse();
  } catch (error) {
    let errorMessage = (error as Error).message;
    if (errorMessage.includes("ECONNREFUSED")) {
      errorMessage = "Connection failed";
    }

    throw new IndexerError(errorMessage);
  }
}

export async function queryBlocksSince(timestamp: string) {
  try {
    const res = await sdk.FetchBlocksSince({
      since: timestamp,
    });

    return res.blocks.reverse();
  } catch (error) {
    let errorMessage = (error as Error).message;
    if (errorMessage.includes("ECONNREFUSED")) {
      errorMessage = "Connection failed";
    }

    throw new IndexerError(errorMessage);
  }
}

export function createBlockMapper(value: keyof SimpleBlock, precision: number) {
  return function customMapper(block: SimpleBlock): LineData {
    return {
      time: (parseInt(block.timestamp) - TZ_OFFSET) as UTCTimestamp,
      value: parseInt(block[value]) / precision,
    };
  };
}

export function isBlock(value: unknown): value is SimpleBlock {
  return (
    typeof value === "object" && value !== null && "baseFeePerGas" in value
  );
}

export function isBlockArray(value: unknown[]): value is SimpleBlock[] {
  return Array.isArray(value) && value.length > 0 && isBlock(value[0]);
}
