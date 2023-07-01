"use client";
import {
  AttachMoney,
  LocalGasStationOutlined,
  Send,
  SvgIconComponent,
} from "@mui/icons-material";

import { MetricId } from "./metrics";
import { ProtocolId } from "./protocols";

export const METRIC_ICONS_MAP: Partial<
  Record<ProtocolId, Record<MetricId, SvgIconComponent>>
> = {
  eth: {
    base_fee: LocalGasStationOutlined,
    eth_price: AttachMoney,
    transfer_cost: Send,
    transfer_cost_usd: Send,
  },
};
