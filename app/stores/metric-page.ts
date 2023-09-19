import {
  // PriceScaleMode,
  SeriesType,
} from "lightweight-charts"
import { atom, map } from "nanostores"
import { Timeframe } from "protofun"

import { Candle } from "../utils/candle-utils"

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

export const $legendTimestamp = atom<string>("")
export const $loading = atom<boolean>(false)

export const $entries = atom<Candle[]>([])

export type EntryMap = Record<string, Candle>
export const $entryMap = map<EntryMap>({})
