"use client"

import { useSearchParams } from "next/navigation"
import { METRICS_MAP, PROTOCOL_MAP, ProtocolId } from "protofun"
import React from "react"

import { METRIC_DESC_MAP } from "../../stores/metric-descriptions"
import { METRIC_ICONS_MAP } from "../../stores/metric-icons"
import { IconData } from "../../stores/protocol-icons"
import { BackButton } from "../BackButton"
import { LinkButtonMetric } from "../LinkButtonMetric"
import { PageTitle } from "../PageTitle"
import { StaggeredList } from "../StaggeredList"
import { Tooltip } from "../Tooltip"
import { Underline } from "../Underline"

interface ProtocolProps {
  protocolId: ProtocolId
}

export function ProtocolPage(props: ProtocolProps) {
  const { protocolId } = props
  const protocol = PROTOCOL_MAP[protocolId]
  const metrics = Object.values(METRICS_MAP[protocolId] || {})
  const searchParams = useSearchParams()

  return (
    <StaggeredList>
      <BackButton href={`/?${searchParams?.toString()}`}>Home</BackButton>
      <PageTitle>
        {protocol.title} metrics
        <Underline />
      </PageTitle>
      <StaggeredList
        direction="row"
        flexWrap="wrap"
        gap={2}
        // staggerChildren={0.5 / metrics.length}
      >
        {metrics.map((metric) => (
          <Tooltip key={metric.id} title={METRIC_DESC_MAP[protocolId]?.[metric.id]?.description}>
            <LinkButtonMetric
              iconPadding={(METRIC_ICONS_MAP[protocolId]?.[metric.id] as IconData).iconPadding}
              prefetch={false} // TODO this doesn't work. Homepage fetches the metric page as well
              href={`/${protocolId}/${metric.id}?${searchParams?.toString()}`}
              label={metric.title}
              wip={metric.wip}
              icon={(METRIC_ICONS_MAP[protocolId]?.[metric.id] as IconData).icon}
            />
          </Tooltip>
        ))}
      </StaggeredList>
    </StaggeredList>
  )
}
