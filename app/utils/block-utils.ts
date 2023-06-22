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

export async function getLatestBlocks() {
  const { blocks } = await sdk.FetchLastBlocks();
  return blocks.reverse();
}

export function createBlockMapper(value: keyof SimpleBlock, precision: number) {
  return function customMapper(block: SimpleBlock): LineData {
    return {
      time: (parseInt(block.timestamp) - TZ_OFFSET) as UTCTimestamp,
      value: parseInt(block[value]) / precision,
    };
  };
}
