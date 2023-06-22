import { getBuiltGraphSDK } from "../../.graphclient";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function formatNumber(number: number, digits = 2) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    // minimumFractionDigits: digits,
    notation: "compact",
  }).format(number);
}

export function formatBigInt(number: number) {
  return new Intl.NumberFormat().format(number);
}

export const TZ_OFFSET = new Date().getTimezoneOffset() * 60;

export const sdk = getBuiltGraphSDK();
