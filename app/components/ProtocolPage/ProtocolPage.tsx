"use client";

import { SvgIconComponent } from "@mui/icons-material";
import React from "react";

import { METRIC_ICONS_MAP } from "../../stores/metric-icons";
import { METRICS_MAP } from "../../stores/metric-page";
import { PROTOCOL_MAP, ProtocolId } from "../../stores/protocol-page";
import { BackButton } from "../BackButton";
import { LinkButton } from "../LinkButton";
import { PageTitle } from "../PageTitle";
import { StaggeredList } from "../StaggeredList";
import { Underline } from "../Underline";

interface ProtocolProps {
  protocolId: ProtocolId;
}

export function ProtocolPage(props: ProtocolProps) {
  const { protocolId } = props;
  const protocol = PROTOCOL_MAP[protocolId];
  const metrics = Object.values(METRICS_MAP[protocolId] || {});

  return (
    <StaggeredList>
      <BackButton href="/">Home</BackButton>
      <PageTitle>
        {protocol.title} metrics
        <Underline />
      </PageTitle>
      <StaggeredList
        direction="row"
        flexWrap="wrap"
        gap={2}
        staggerChildren={0.5 / metrics.length}
      >
        {metrics.map((metric) => (
          <LinkButton
            key={metric.id}
            iconPadding={metric.iconPadding}
            href={`/${protocolId}/${metric.id}`}
            label={metric.title}
            icon={METRIC_ICONS_MAP[protocolId]?.[metric.id] as SvgIconComponent}
          />
        ))}
      </StaggeredList>
    </StaggeredList>
  );
}
