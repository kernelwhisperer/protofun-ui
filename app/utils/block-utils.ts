import { captureException } from "@sentry/nextjs";
import { LineData, UTCTimestamp } from "lightweight-charts";

import { Block } from "../../.graphclient";
import { sdk, TZ_OFFSET } from "./client-utils";

// TODO
// declare module "../../.graphclient" {
//   export type Scalars = TGScalars & {
//     BigDecimal: string;
//     BigInt: string;
//     Bytes: string;
//     Int8: string;
//   };
// }

export type SimpleBlock = Omit<Block, "txns">;

export async function queryBlocks(suppressError = false) {
  try {
    const res = await sdk.FetchLastBlocks();
    return res.blocks.reverse();
  } catch (error) {
    let errorMessage = (error as Error).message;
    if (errorMessage.includes("ECONNREFUSED 127.0.0.1:8000")) {
      errorMessage = "Indexer offline.";
    }

    if (suppressError) {
      captureException(new Error(errorMessage));
      return [];
    }

    throw new Error(errorMessage);
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
