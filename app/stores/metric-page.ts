import {
  CandlestickSeriesPartialOptions,
  PriceScaleMode,
  SeriesType,
} from "lightweight-charts";
import { atom, map } from "nanostores";

import { SimpleBlock } from "../utils/block-utils";
import { Candle } from "../utils/candle-utils";
import { PROTOCOL_IDS, ProtocolId } from "./protocol-page";

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
export const $liveMode = atom<boolean>(true);

export const $legendTimestamp = atom<string>("");
export const $loading = atom<boolean>(false);

export type MetricId = "base_fee";

export type Metric = {
  id: MetricId;
  protocol: ProtocolId;
  title: string;
};

export const METRICS_MAP: Partial<
  Record<ProtocolId, Record<MetricId, Metric>>
> = {
  eth: {
    base_fee: { id: "base_fee", protocol: "eth", title: "Base fee per gas" },
  },
};

export const METRICS = PROTOCOL_IDS.map((protocolId) =>
  Object.values(METRICS_MAP[protocolId] || {})
).flat();

export function isMetric(
  protocol: ProtocolId,
  value: string
): value is MetricId {
  return !!METRICS_MAP[protocol]?.[value as MetricId];
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
};

export const $entries = atom<Candle[] | SimpleBlock[]>([]);

export type CandleMap = Record<string, Candle>;
export type BlockMap = Record<string, SimpleBlock>;
export type EntryMap = CandleMap | BlockMap;
export const $entryMap = map<EntryMap>({});
