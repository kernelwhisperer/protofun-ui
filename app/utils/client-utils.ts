"use client"

import { AnimationConfig, config } from "@react-spring/web"

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

type NumberNotation = "standard" | "scientific" | "engineering" | "compact" | undefined

export function formatNumber(
  number: number,
  digits: number,
  notation: NumberNotation = "standard"
) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
    notation,
  }).format(number)
}

export function formatBigInt(number: number) {
  return new Intl.NumberFormat().format(number)
}

export const TZ_OFFSET = new Date().getTimezoneOffset() * 60

export const SPRING_CONFIGS: Record<string, Partial<AnimationConfig>> = {
  ...config,
  quick: { friction: 200, mass: 5, tension: 2000 },
  veryQuick: { friction: 100, mass: 5, tension: 2000 },
  // slow: { friction: 20, mass: 5, tension: 200 },
}

export const isServerSide = typeof window === "undefined"

export const isMobile = isServerSide
  ? true
  : Boolean(
      window.navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )

export function logError(error: Error) {
  console.error(error)
  import("@sentry/nextjs").then(({ captureException }) => {
    captureException(error)
  })
}

export interface PopoverToggleProps {
  open: boolean
  toggleOpen: () => void
}

export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
