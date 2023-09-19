"use client"

import { MetricId, ProtocolId } from "protofun"
import React from "react"

type Descriptions = {
  description: React.ReactNode
  descriptionExtra: React.ReactNode
}

export const METRIC_DESC_MAP: Partial<Record<ProtocolId, Partial<Record<MetricId, Descriptions>>>> =
  {
    eth: {
      base_fee: {
        description: (
          <>
            Base fee per gas is the <i>minimum amount that you must pay for your transaction</i> to
            be considered valid and processed by the Ethereum network.
          </>
        ),
        descriptionExtra: (
          <>
            It adjusts based on network activity: if many people are transacting, it can go up, but
            it&apos;s designed to stabilize over time.
            <br />
            <br />
            Unlike the tip you might add to get your transaction processed faster, this fee is
            burned and removed from circulation, ensuring a predictable and fair transaction cost.
          </>
        ),
      },
      eth_price: {
        description: (
          <>
            Ether is the native currency of Ethereum, a resource spent when transacting on the
            network. This metric plots the its price data over time.
            <br />
            <br />
            Source: Binance.com
          </>
        ),
        descriptionExtra: null,
      },
      tx_cost: {
        description: (
          <>
            This metric is built on top of <i>Base fee per gas</i> and <i>Ether price</i> and it
            represents a very close approximation of how much it costs to transact on the network.
          </>
        ),
        descriptionExtra: null,
      },
    },
  }
