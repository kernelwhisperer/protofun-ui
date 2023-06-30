import { Transition, Variants } from "framer-motion";

import { getBuiltGraphSDK } from "../../.graphclient";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function formatNumber(number: number, digits: number) {
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

const revealTransition: Transition = {
  duration: 0.3,
  ease: "easeOut",
  // damping: 40,
  // damping: 14,
  // mass: 100,
  // stiffness: 220,
  // type: "spring",
};

export const revealVariants: Variants = {
  hide: {
    opacity: 0,
    transition: revealTransition,
    y: 60,
  },
  show: {
    opacity: 1,
    transition: revealTransition,
    y: 0,
  },
};
