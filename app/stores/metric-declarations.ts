export const METRIC_DECLARATIONS = {
  aave: [],
  comp: [],
  eth: ["base_fee", "eth_price", "tx_cost"],
  mkr: [],
} as const;

export type ProtocolId = keyof typeof METRIC_DECLARATIONS;

// Not working:
// type ValueOf<T> = T[keyof T];
// export type MetricId = ValueOf<typeof METRIC_LIST_DEFINITION>[number];

export type MetricIdForProtocol<T extends ProtocolId> =
  (typeof METRIC_DECLARATIONS)[T][number];

export type MetricId = MetricIdForProtocol<ProtocolId>;
