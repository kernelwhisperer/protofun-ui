"use client";
import { Paper, Stack } from "@mui/material";
import React from "react";

import {
  $seriesType,
  $timeframe,
  isTimeframe,
  Metric,
  MetricId,
  METRICS_MAP,
} from "../../stores/metric-page";
import { PROTOCOL_MAP, ProtocolId } from "../../stores/protocol-page";
import { SimpleBlock } from "../../utils/block-utils";
import { Candle } from "../../utils/candle-utils";
import { BackButton } from "../BackButton";
import { PageTitle } from "../PageTitle";
import { StaggeredList } from "../StaggeredList";
import { Underline } from "../Underline";
import { ChartActionBar } from "./ChartActionBar";
import { MetricChart } from "./MetricChart";

export interface MetricPageProps {
  blocks: SimpleBlock[];
  candles: Candle[];
  metricId: MetricId;
  protocolId: ProtocolId;
  searchParams: { timeframe?: string };
}

export function MetricPage(props: MetricPageProps) {
  const {
    // blocks,
    // candles,
    metricId,
    protocolId,
    searchParams,
  } = props;
  // console.log("📜 LOG > MetricPage render");

  const { timeframe = "" } = searchParams;
  if (isTimeframe(timeframe)) {
    $timeframe.set(timeframe);
    if (timeframe === "Block") {
      $seriesType.set("Line");
    }
  }

  const protocol = PROTOCOL_MAP[protocolId];
  const metric = METRICS_MAP[protocolId]?.[metricId] as Metric;

  // TODO
  // const blockMap = blocks.reduce((acc, curr) => {
  //   acc[curr.timestamp] = curr;
  //   return acc;
  // }, {} as BlockMap);

  // $blocks.set(blocks);
  // $blockMap.set(blockMap);

  // const candleMap = candles.reduce((acc, curr) => {
  //   acc[curr.timestamp] = curr;
  //   return acc;
  // }, {} as CandleMap);

  // $minCandles.set(candles);
  // $minCandleMap.set(candleMap);

  return (
    <StaggeredList>
      <BackButton href={`/${PROTOCOL_MAP[protocolId].id}`}>
        {protocol.title}
      </BackButton>
      <PageTitle>
        {metric.title}
        <Underline />
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
  );
}
