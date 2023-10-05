import { logger } from "@nanostores/logger"
import {
  IChartApi,
  ISeriesApi,
  // PriceScaleMode,
  SeriesType,
} from "lightweight-charts"
import { atom, map } from "nanostores"
import { Candle, isTimeframe, Metric, Timeframe } from "protofun"
import { MutableRefObject } from "react"

import { isProduction } from "../utils/client-utils"

export const variantDefault = 0
export const priceUnitDefault = 0
export const scaleModeDefault = 0
export const liveModeDefault = true
export const seriesTypeDefault: SeriesType = "Candlestick"
export const timeframeDefault: Timeframe = "Hour"

export const $timeframe = atom<Timeframe>(timeframeDefault)
export const $seriesType = atom<SeriesType>(seriesTypeDefault)
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

interface StateShape {
  legendTimestamp: string
  liveMode: boolean
  priceUnitIndex: number
  scaleMode: 0 | 1
  seriesType: SeriesType
  since: string
  timeframe: Timeframe
  until: string
  variantIndex: number
}

export function computeInitialState(
  metric: Metric,
  searchParams: {
    since?: string
    timeframe?: string
    unit?: string
    until?: string
    variant?: string
  }
): StateShape {
  const { timeframe = "", unit = "", variant = "", since = "", until = "" } = searchParams

  const legendTimestamp = ""
  const liveMode = since || until || metric.disallowLiveMode ? false : liveModeDefault
  const scaleMode = metric.preferredLogScale ? 1 : scaleModeDefault
  let t: Timeframe = timeframeDefault

  if (isTimeframe(timeframe)) {
    if (!metric.timeframes.includes(timeframe)) {
      t = metric.timeframes[0]
    } else {
      t = timeframe
    }
  } else if (!metric.timeframes.includes(timeframeDefault)) {
    t = metric.timeframes[0]
  }

  const seriesType = t === "Block" || metric.disallowCandleType ? "Line" : seriesTypeDefault

  const parsedUnit = parseInt(unit)
  const priceUnitIndex =
    !isNaN(parsedUnit) && parsedUnit < metric.priceUnits.length ? parsedUnit : priceUnitDefault

  const parsedVariant = parseInt(variant)
  const variantIndex =
    !isNaN(parsedVariant) && metric.variants && parsedVariant < metric.variants.length
      ? parsedVariant
      : variantDefault

  return {
    legendTimestamp,
    liveMode,
    priceUnitIndex,
    scaleMode,
    seriesType,
    since,
    timeframe: t,
    until,
    variantIndex,
  }
}

export function setInitialState(state: StateShape) {
  $legendTimestamp.set(state.legendTimestamp)
  $liveMode.set(state.liveMode)
  $priceUnitIndex.set(state.priceUnitIndex)
  $scaleMode.set(state.scaleMode)
  $seriesType.set(state.seriesType)
  $since.set(state.since)
  $timeframe.set(state.timeframe)
  $until.set(state.until)
  $variantIndex.set(state.variantIndex)
}

if (!isProduction) {
  logger(
    {
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
    },
    {
      messages: {
        mount: false,
        unmount: false,
      },
    }
  )
}
