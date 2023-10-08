"use client"
import { InfoOutlined } from "@mui/icons-material"
import { Paper, Stack } from "@mui/material"
import dynamic from "next/dynamic"
import { Candle, Metric, MetricId, METRICS_MAP, PROTOCOL_MAP, ProtocolId } from "protofun"
import React from "react"

import { DocumentTitleSideEffect } from "../../side-effects/DocumentTitleSideEffect"
import { SearchParamSideEffect } from "../../side-effects/SearchParamSideEffect"
import { METRIC_DESC_MAP } from "../../stores/metric-descriptions"
import { computeInitialState, setInitialState } from "../../stores/metric-page"
import { BackButton } from "../BackButton"
import { PageTitle } from "../PageTitle"
import { StaggeredList } from "../StaggeredList"
import { Tooltip } from "../Tooltip"
import { Underline } from "../Underline"
import { ChartActionBar } from "./ChartActionBar"
import { MetricVariantSelector } from "./MetricVariantSelector"

export interface MetricPageProps {
  data: Candle[]
  metricId: MetricId
  protocolId: ProtocolId
  searchParams: {
    since?: string
    timeframe?: string
    unit?: string
    until?: string
    variant?: string
  }
}

const MetricChart = dynamic(() => import("./MetricChart"))

export function MetricPage(props: MetricPageProps) {
  // console.log("📜 LOG > MetricPage > render:", isServerSide, props)
  const { metricId, protocolId, searchParams } = props
  const protocol = PROTOCOL_MAP[protocolId]
  const metric = METRICS_MAP[protocolId]?.[metricId] as Metric
  const metricDesc = METRIC_DESC_MAP[protocolId]?.[metric.id]

  // TODO
  // if ($entries.get().length === 0) {
  //   const map = (data as Array<Candle | SimpleBlock>).reduce((acc, curr) => {
  //     acc[curr.timestamp] = curr;
  //     return acc;
  //   }, {} as EntryMap);

  //   $entryMap.set(map);
  //   $entries.set(data);
  // }
  // console.log("📜 LOG > MetricPage > data:", data.length);

  const state = computeInitialState(metric, searchParams)
  // console.log("📜 LOG > MetricPage > state:", state)
  setInitialState(state)

  return (
    <StaggeredList>
      <DocumentTitleSideEffect metric={metric} />
      <SearchParamSideEffect />
      <BackButton href={`/${PROTOCOL_MAP[protocolId].id}`}>{protocol.title}</BackButton>
      <PageTitle>
        <span style={{ marginRight: 12, position: "relative" }}>
          {metric.title}
          <Underline />
        </span>
        <MetricVariantSelector
          variants={metric.variants}
          sx={{
            marginRight: "12px",
          }}
        />
        {metricDesc?.description && (
          <Tooltip
            title={
              <>
                {metricDesc?.description}
                {!!metricDesc?.descriptionExtra && (
                  <>
                    <br />
                    <br />
                    {metricDesc?.descriptionExtra}
                  </>
                )}
              </>
            }
            enterDelay={100}
            leaveDelay={800}
            disableInteractive={false}
          >
            <InfoOutlined
              sx={{
                "&:not(:hover)": {
                  color: "var(--mui-palette-action-focus)",
                },
                cursor: "help",
              }}
            />
          </Tooltip>
        )}
      </PageTitle>
      <Stack gap={1} style={{ width: "100%" }}>
        <ChartActionBar metric={metric} />
        <Paper
          elevation={0}
          sx={{
            height: "calc(100vh - 372px)",
            maxHeight: "800px",
            minHeight: "400px",
            paddingLeft: 0.5,
            paddingTop: 0.5,
            position: "relative",
          }}
        >
          <MetricChart metric={metric} />
        </Paper>
      </Stack>
    </StaggeredList>
  )
}
