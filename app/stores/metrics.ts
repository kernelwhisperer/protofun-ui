import {
  CandlestickSeriesPartialOptions,
  PriceScaleMode,
  SeriesType,
} from "lightweight-charts";
import { atom, map } from "nanostores";

import { SimpleBlock } from "../utils/block-utils";
import { Candle } from "../utils/candle-utils";
import { queryBaseFeePerGas } from "../utils/metrics/eth/base-fee-per-gas";
import { queryEtherPrice } from "../utils/metrics/eth/ether-price";
import { queryTxCost } from "../utils/metrics/eth/tx-cost";
import { PROTOCOL_IDS, ProtocolId } from "./protocols";

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

export const $timeframe = atom<Timeframe>("Hour");
export const $seriesType = atom<SeriesType>("Candlestick");
export const $scaleMode = atom<PriceScaleMode>(PriceScaleMode.Logarithmic);
export const $liveMode = atom<boolean>(true);
export const $priceUnitIndex = atom<number>(0);
export const $variantIndex = atom<number>(0);

export const $legendTimestamp = atom<string>("");
export const $loading = atom<boolean>(false);

export type MetricId = "base_fee" | "eth_price" | "tx_cost";

export type QueryFn = (
  timeframe: Timeframe,
  since?: string,
  priceUnit?: PriceUnit
) => Promise<Candle[] | SimpleBlock[]>;

export type Variant = {
  label: string;
  precision: number;
  value?: string;
};

export enum PriceUnit {
  ETH = "ETH",
  USD = "USD",
  GWEI = "Gwei",
}

export type Metric = {
  iconPadding?: string;
  id: MetricId;
  precision: number;
  priceUnits: PriceUnit[];
  protocol: ProtocolId;
  queryFn: QueryFn;
  significantDigits: number[];
  timeframes?: string[];
  title: string;
  variants?: Variant[];
};

export const METRICS_MAP: Partial<
  Record<ProtocolId, Record<MetricId, Metric>>
> = {
  eth: {
    base_fee: {
      iconPadding: "16px",
      id: "base_fee",
      precision: 1e9,
      priceUnits: [PriceUnit.GWEI],
      protocol: "eth",
      queryFn: queryBaseFeePerGas,
      significantDigits: [2],
      title: "Base fee per gas",
    },
    eth_price: {
      iconPadding: "16px",
      id: "eth_price",
      precision: 1,
      priceUnits: [PriceUnit.USD],
      protocol: "eth",
      queryFn: queryEtherPrice,
      significantDigits: [2],
      timeframes: ["Day", "Hour", "Minute", "Week"],
      title: "Ether price",
    },
    tx_cost: {
      iconPadding: "16px",
      id: "tx_cost",
      precision: 1,
      priceUnits: [PriceUnit.USD, PriceUnit.ETH],
      protocol: "eth",
      queryFn: queryTxCost,
      significantDigits: [2, 5],
      timeframes: ["Day", "Hour", "Minute", "Week"],
      title: "Transaction cost",
      variants: [
        { label: "ETH Transfer", precision: 1e18 / 21_000 },
        { label: "ERC20 Approval", precision: 1e18 / 45_000 },
        { label: "ERC20 Transfer", precision: 1e18 / 65_000 },
        { label: "NFT Transfer", precision: 1e18 / 85_000 },
        { label: "Uniswap V2 Swap", precision: 1e18 / 150_000 },
        { label: "Uniswap V3 Swap", precision: 1e18 / 185_000 },
        { label: "L2 Deposit", precision: 1e18 / 250_000 },
      ],
    },
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
