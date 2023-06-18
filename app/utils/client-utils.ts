import { LineData, UTCTimestamp } from "lightweight-charts";

import {
  Block,
  // Scalars as TGScalars
} from "../../.graphclient";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

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

export function formatNumber(number: number, digits = 2) {
  return new Intl.NumberFormat([], {
    maximumFractionDigits: digits,
    // minimumFractionDigits: digits,
    notation: "compact",
  }).format(number);
}

export const timezoneOffset = new Date().getTimezoneOffset() * 60;

export function mapBlockToLineData(block: SimpleBlock): LineData {
  return {
    time: (parseInt(block.timestamp) - timezoneOffset) as UTCTimestamp,
    value: parseInt(block.baseFeePerGas) / 1e9,
  };
}
