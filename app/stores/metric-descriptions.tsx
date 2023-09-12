"use client"

import React from "react"

import { MetricId } from "./metrics"
import { ProtocolId } from "./protocols"

type Descriptions = {
  description: React.ReactNode
  descriptionExtra: React.ReactNode
}

export const METRIC_DESC_MAP: Partial<Record<ProtocolId, Partial<Record<MetricId, Descriptions>>>> =
  {
    eth: {
      base_fee: {
        description: (
          <React.Fragment>
            Base fee per gas is the <i>minimum amount that you must pay for your transaction</i> to
            be considered valid and processed by the network.
          </React.Fragment>
        ),
        descriptionExtra: (
          <React.Fragment>
            It adjusts based on network activity: if many people are transacting, it can go up, but
            it&apos;s designed to stabilize over time.
            <br />
            <br />
            Unlike the tip you might add to get your transaction processed faster, this fee is
            burned and removed from circulation, ensuring a predictable and fair transaction cost.
          </React.Fragment>
        ),
      },
    },
  }
