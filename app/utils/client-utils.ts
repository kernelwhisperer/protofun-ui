"use client"

import { config } from "@react-spring/web"
import { CandlestickSeriesPartialOptions } from "lightweight-charts"
import { MetricFnsResult, MetricId, ProtocolId, wait } from "protofun"
import { v4 as uuid } from "uuid"

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export const TZ_OFFSET = new Date().getTimezoneOffset() * 60

export const SPRING_CONFIGS = {
  ...config,
  quick: { friction: 200, mass: 5, tension: 2000 },
  semiSlow: { friction: 90, tension: 280 },
  veryQuick: { friction: 100, mass: 5, tension: 2000 },
} as const

export const isServerSide = typeof window === "undefined"

export const isMobile = isServerSide
  ? true
  : Boolean(
      window.navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
      ) || window.innerWidth < 520 // FIXME
    )

export const isProduction = isServerSide
  ? false
  : Boolean(window.location.toString().includes("https://protocol.fun"))

export function logError(error: unknown) {
  console.error(error)
  import("@sentry/nextjs").then(({ captureException }) => {
    captureException(error)
  })
}

export interface PopoverToggleProps {
  open: boolean
  toggleOpen: () => void
}

export function getDeviceId() {
  let deviceId = localStorage.getItem("fun-device-uuid")

  if (!deviceId) {
    deviceId = uuid()
    localStorage.setItem("fun-device-uuid", deviceId)
  }

  return deviceId
}

export const candleStickOptions: CandlestickSeriesPartialOptions = {
  // ----default
  // rgb(227, 96, 85)
  // rgb(72, 163, 154)
  // ----tv-mobile
  // rgb(229, 75, 74)
  // rgb(58, 151, 129)
  // ----tv-web
  // rgb(242, 54, 69)
  // rgb(8, 153, 129)
  //
  borderDownColor: "rgb(220, 60, 70)",
  borderUpColor: "rgb(0, 150, 108)",
  downColor: "rgb(220, 60, 70)",
  // title: "hey",
  upColor: "rgb(0, 150, 108)",
  wickDownColor: "rgb(220, 60, 70)",
  wickUpColor: "rgb(0, 150, 108)",
}

/**
 * Hack https://github.com/vercel/next.js/discussions/33980
 */
export const METRIC_MODULE_MAP: Record<ProtocolId, Partial<Record<MetricId, any>>> = {
  aave: {},
  btc: {
    btc_price: () => import("protofun/dist/metrics/btc/btc_price"),
  },
  comp: {
    comp_price: () => import("protofun/dist/metrics/comp/comp_price"),
    tvl: () => import("protofun/dist/metrics/comp/tvl"),
  },
  eth: {
    base_fee: () => import("protofun/dist/metrics/eth/base_fee"),
    eth_price: () => import("protofun/dist/metrics/eth/eth_price"),
    tx_cost: () => import("protofun/dist/metrics/eth/tx_cost"),
  },
  mkr: {},
} as const

export async function loadMetricFns(
  protocolId: ProtocolId,
  metricId: MetricId
): Promise<MetricFnsResult> {
  const loadedModule = await METRIC_MODULE_MAP[protocolId][metricId]()
  const { default: query, subscribe } = loadedModule
  return { query, subscribe }
}

export function downloadImage(img?: HTMLCanvasElement, name = "screenshot.png") {
  img?.toBlob((blob) => {
    if (!blob) return
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = name
    link.click()
    URL.revokeObjectURL(link.href) // Free up storage--optional
  }, "image/png")
}

export function measurePerformance() {
  let fcp = -1
  let dom = -1
  let pageLoad = -1

  if ("performance" in window && "getEntriesByType" in window.performance) {
    /**
     * FCP
     */
    const paint = window.performance.getEntriesByType("paint") as PerformancePaintTiming[]
    paint.forEach((perf) => {
      if (perf.name === "first-contentful-paint") {
        fcp = Math.round(perf.startTime)
      }
    })

    /**
     * DOM interactive & Page load
     */
    const nav = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
    if (nav.length > 0) {
      dom = Math.round(nav[0].domInteractive)
      pageLoad = Math.round(nav[0].loadEventEnd)
    }
  }

  return { dom, fcp, pageLoad }
}

export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  onRetryAttempt: (attempt: number, cooldown: number, error: unknown) => void = noop
): Promise<T> {
  let currentAttempt = 0
  let cooldown = 3_000

  while (currentAttempt <= maxRetries) {
    try {
      return await fn()
    } catch (error) {
      currentAttempt += 1
      if (currentAttempt <= maxRetries) {
        onRetryAttempt(currentAttempt, cooldown, error)
        await wait(cooldown)
        cooldown = 3 ** currentAttempt * 1_000
      } else {
        throw error
      }
    }
  }

  throw new Error("Maximum retry limit exceeded")
}
