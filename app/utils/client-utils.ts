"use client";

import { config } from "@react-spring/web";

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatNumber(number: number, digits: number) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    notation: "standard",
  }).format(number);
}

export function formatBigInt(number: number) {
  return new Intl.NumberFormat().format(number);
}

export const TZ_OFFSET = new Date().getTimezoneOffset() * 60;

export const SPRING_CONFIGS = {
  ...config,
  quick: { friction: 200, mass: 5, tension: 2000 },
  // slow: { friction: 20, mass: 5, tension: 200 },
};

export const isServerSide = typeof window === "undefined";

export const isMobile = isServerSide
  ? true
  : Boolean(
      window.navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
