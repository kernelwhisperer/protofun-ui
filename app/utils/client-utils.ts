import { Variants } from "framer-motion";

import { getBuiltGraphSDK } from "../../.graphclient";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function formatNumber(number: number, digits = 2) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    // minimumFractionDigits: digits,
    notation: "standard",
  }).format(number);
}

export function formatBigInt(number: number) {
  return new Intl.NumberFormat().format(number);
}

export const TZ_OFFSET = new Date().getTimezoneOffset() * 60;

export const sdk = getBuiltGraphSDK();

export const variants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
      // damping: 40,
      // stiffness: 240,
      // type: "spring",
    },
    y: 50,
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
      // damping: 40,
      // stiffness: 240,
      // type: "spring",
    },
    y: 0,
  },
};
