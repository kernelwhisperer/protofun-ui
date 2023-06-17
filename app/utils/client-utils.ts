import { LineData, UTCTimestamp } from "lightweight-charts";

import {
  Block,
  // Scalars as TGScalars
} from "../../.graphclient";

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

export function formatNumber(number: number) {
  return new Intl.NumberFormat([], {
    maximumFractionDigits: 2,
    notation: "compact",
  }).format(number);
}

const timezoneOffset = new Date().getTimezoneOffset() * 60;

export function mapBlockToLineData(block: SimpleBlock): LineData {
  return {
    time: (parseInt(block.timestamp) - timezoneOffset) as UTCTimestamp,
    value: parseInt(block.baseFeePerGas) / 1e9,
  };
}
