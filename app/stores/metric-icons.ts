"use client"
import { AttachMoney, LocalGasStationOutlined, Lock, ReceiptLong } from "@mui/icons-material"
import { MetricId, ProtocolId } from "protofun"

import { IconData } from "./protocol-icons"

export const METRIC_ICONS_MAP: Partial<Record<ProtocolId, Partial<Record<MetricId, IconData>>>> = {
  btc: {
    btc_price: {
      icon: AttachMoney,
      iconPadding: "16px",
    },
  },
  comp: {
    comp_price: {
      icon: AttachMoney,
      iconPadding: "16px",
    },
    tvl: {
      icon: Lock,
      iconPadding: "16px",
    },
  },
  eth: {
    base_fee: {
      icon: LocalGasStationOutlined,
      iconPadding: "16px",
    },
    eth_price: {
      icon: AttachMoney,
      iconPadding: "16px",
    },
    tx_cost: {
      icon: ReceiptLong,
      iconPadding: "16px",
    },
  },
}
