import { IChartApi, ISeriesApi } from "lightweight-charts"
import { Mixpanel } from "mixpanel-browser"
import { atom } from "nanostores"
import { User } from "protofun-service"
import { MutableRefObject } from "react"

export const $fullAppVersion = atom<string>("")
export const $mixpanel = atom<Mixpanel | undefined>()

export type ReducedMotionSetting = "always" | "never" | "user"
export const $reducedMotion = atom<ReducedMotionSetting>("user")
export const $loopsAllowed = atom<boolean>(false)

export interface AppVerProps {
  appVer: string
  gitHash: string
}

export const $user = atom<User | null>(null)

export const $chartRef = atom<MutableRefObject<IChartApi | undefined>>({ current: undefined })
export const $mainSeries = atom<MutableRefObject<ISeriesApi<"Candlestick" | "Line"> | undefined>>({
  current: undefined,
})
