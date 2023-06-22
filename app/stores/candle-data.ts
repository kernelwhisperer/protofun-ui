import { atom, map } from "nanostores";

import { Candle } from "../utils/candle-utils";

export const $minCandles = atom<Candle[]>([]);
export const $hourCandles = atom<Candle[]>([]);

export type CandleMap = Record<string, Candle>;
export const $minCandleMap = map<CandleMap>({});
export const $hourCandleMap = map<CandleMap>({});
