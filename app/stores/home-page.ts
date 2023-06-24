import { PriceScaleMode, SeriesType } from "lightweight-charts";
import { atom } from "nanostores";

export type Timeframe = "Block" | "Minute" | "Hour" | "Day" | "Week";
export const TIME_FRAMES: Record<Timeframe, string> = {
  Block: "Block",
  Minute: "1m",
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  Hour: "1h",
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  Day: "D",
  Week: "W",
};

export const $timeframe = atom<Timeframe>("Hour");
export const $seriesType = atom<SeriesType>("Candlestick");
export const $scaleMode = atom<PriceScaleMode>(PriceScaleMode.Normal);

export const $legendTimestamp = atom<string>("");
export const $loading = atom<boolean>(false);
