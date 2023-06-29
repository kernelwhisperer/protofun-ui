"use client";
import {
  AttachMoney,
  LocalGasStationOutlined,
  SvgIconComponent,
} from "@mui/icons-material";

import { MetricId } from "./metric-page";
import { ProtocolId } from "./protocol-page";

export const METRIC_ICONS_MAP: Partial<
  Record<ProtocolId, Record<MetricId, SvgIconComponent>>
> = {
  eth: {
    base_fee: LocalGasStationOutlined,
    eth_price: AttachMoney,
  },
};
