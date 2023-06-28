import { PriceScaleMode, SeriesType } from "lightweight-charts";
import { atom } from "nanostores";

import { ProtocolId, PROTOCOLS } from "./protocol-page";

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
export function isTimeframe(value: string): value is Timeframe {
  return Object.keys(TIME_FRAMES).includes(value);
}

export const $timeframe = atom<Timeframe>("Minute");
export const $seriesType = atom<SeriesType>("Candlestick");
export const $scaleMode = atom<PriceScaleMode>(PriceScaleMode.Logarithmic);
export const $liveMode = atom<boolean>(false);

export const $legendTimestamp = atom<string>("");
export const $loading = atom<boolean>(false);

export type MetricId = "base_fee";

export type Metric = {
  id: MetricId;
  protocol: ProtocolId;
  title: string;
};

export const METRICS_MAP: Record<ProtocolId, Record<MetricId, Metric>> = {
  eth: {
    base_fee: { id: "base_fee", protocol: "eth", title: "Base fee per gas" },
  },
};

export const METRICS = PROTOCOLS.map((x) =>
  Object.values(METRICS_MAP[x])
).flat();

export function isMetric(
  protocol: ProtocolId,
  value: string
): value is MetricId {
  return !!METRICS_MAP[protocol][value as MetricId];
}
