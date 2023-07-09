import { LineData, UTCTimestamp } from "lightweight-charts";

import { Block } from "../../.graphclient";
import { TZ_OFFSET } from "./client-utils";

export type SimpleBlock = Omit<Block, "txns" | "timestamp"> & {
  timestamp: string;
};
// TODO
// declare module "../../.graphclient" {
//   export type Scalars = TGScalars & {
//     BigDecimal: string;
//     BigInt: string;
//     Bytes: string;
//     Int8: string;
//   };
// }

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
