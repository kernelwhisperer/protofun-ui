import { logger } from "@nanostores/logger"
import {
  IChartApi,
  ISeriesApi,
  // PriceScaleMode,
  SeriesType,
} from "lightweight-charts"
import { atom, map } from "nanostores"
import { Candle, Timeframe } from "protofun"
import { MutableRefObject } from "react"

import { isProduction } from "../utils/client-utils"

export const scaleModeDefault = 0
export const liveModeDefault = true
export const seriesTypeDefault: SeriesType = "Candlestick"

export const $timeframe = atom<Timeframe>("Hour")
export const $seriesType = atom<SeriesType>("Candlestick")
/**
 * Price scale shows prices. Price range changes linearly.
 */
// Normal = 0,
/**
 * Price scale shows prices. Price range changes logarithmically.
 */
// Logarithmic = 1,
export const $scaleMode = atom<0 | 1>(scaleModeDefault)
export const $liveMode = atom<boolean>(liveModeDefault)
export const $priceUnitIndex = atom<number>(0)
export const $variantIndex = atom<number>(0)
export const $since = atom<string>("")
export const $until = atom<string>("")

export const $legendTimestamp = atom<string>("")
export const $loading = atom<boolean>(false)

export const $entries = atom<Candle[]>([])

export type EntryMap = Record<string, Candle>
export const $entryMap = map<EntryMap>({})

export const $chartRef = atom<MutableRefObject<IChartApi | undefined>>({ current: undefined })
export const $mainSeries = atom<MutableRefObject<ISeriesApi<"Candlestick" | "Line"> | undefined>>({
  current: undefined,
})

if (!isProduction) {
  logger({
    $chartRef,
    $entries,
    $entryMap,
    $legendTimestamp,
    $liveMode,
    $loading,
    $mainSeries,
    $priceUnitIndex,
    $scaleMode,
    $seriesType,
    $since,
    $timeframe,
    $until,
    $variantIndex,
  })
}
