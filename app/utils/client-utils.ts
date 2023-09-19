"use client"

import { AnimationConfig, config } from "@react-spring/web"
import { CandlestickSeriesPartialOptions } from "lightweight-charts"
import { atom } from "nanostores"
import { MetricFnsResult, MetricId, ProtocolId } from "protofun"
import { v4 as uuid } from "uuid"

import { patchPushSubscription } from "../api/users-api"
import { $user } from "../stores/app"

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
      ) || window.innerWidth < 520 // FIXME
    )

export const isProduction = isServerSide
  ? false
  : Boolean(window.location.toString().includes("https://protocol.fun")) // FIXME

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

export const $serviceWorker = atom<ServiceWorkerRegistration | undefined>()
export const $pushPubKey = atom<string>("")
export const $pushSubscription = atom<PushSubscription | null>(null)

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

export async function enableWebPush() {
  const serviceWorker = $serviceWorker.get()
  const user = $user.get()
  const pushPubKey = $pushPubKey.get()

  if (!serviceWorker || !user) return

  const convertedVapidKey = urlBase64ToUint8Array(pushPubKey)
  const subscription = await serviceWorker.pushManager.subscribe({
    applicationServerKey: convertedVapidKey,
    userVisibleOnly: true,
  })
  console.log("ServiceWorker subscription: ", !!subscription)
  $pushSubscription.set(subscription)

  await patchPushSubscription(getDeviceId(), subscription)
}

export async function disableWebPushOnDevice() {
  await $pushSubscription.get()?.unsubscribe()
  $pushSubscription.set(null)
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
  upColor: "rgb(0, 150, 108)",
  wickDownColor: "rgb(220, 60, 70)",
  wickUpColor: "rgb(0, 150, 108)",
}

/**
 * Hack https://github.com/vercel/next.js/discussions/33980
 */
export const METRIC_MODULE_MAP: any = {
  aave: {},
  comp: {
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
  const module = await METRIC_MODULE_MAP[protocolId][metricId]()
  const { default: query, subscribe } = module
  return { query, subscribe }
}
