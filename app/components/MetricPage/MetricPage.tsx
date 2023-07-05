"use client";
import { Paper, Stack } from "@mui/material";
import React from "react";

import {
  $priceUnitIndex,
  $seriesType,
  $timeframe,
  isTimeframe,
  Metric,
  MetricId,
  METRICS_MAP,
} from "../../stores/metrics";
import { PROTOCOL_MAP, ProtocolId } from "../../stores/protocols";
import { SimpleBlock } from "../../utils/block-utils";
import { Candle } from "../../utils/candle-utils";
import { BackButton } from "../BackButton";
import { PageTitle } from "../PageTitle";
import { StaggeredList } from "../StaggeredList";
import { Underline } from "../Underline";
import { ChartActionBar } from "./ChartActionBar";
import { MetricChart } from "./MetricChart";
import { MetricVariantSelector } from "./MetricVariantSelector";

export interface MetricPageProps {
  blocks: SimpleBlock[];
  candles: Candle[];
  metricId: MetricId;
  protocolId: ProtocolId;
  searchParams: { timeframe?: string; unit?: string };
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
  const protocol = PROTOCOL_MAP[protocolId];
  const metric = METRICS_MAP[protocolId]?.[metricId] as Metric;

  const { timeframe = "", unit = "" } = searchParams;

  if (isTimeframe(timeframe)) {
    $timeframe.set(timeframe);
    if (metric.timeframes && !metric.timeframes.includes(timeframe)) {
      $timeframe.set(metric.timeframes[0]);
    } else if (timeframe === "Block") {
      $seriesType.set("Line");
    }
  } else if (
    metric.timeframes &&
    !metric.timeframes.includes($timeframe.get())
  ) {
    $timeframe.set(metric.timeframes[0]);
  }

  const priceUnit = parseInt(unit);
  if (!isNaN(priceUnit)) {
    if (metric.priceUnits.length > priceUnit) {
      $priceUnitIndex.set(priceUnit);
    } else {
      $priceUnitIndex.set(0);
    }
  } else {
    $priceUnitIndex.set(0);
  }

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
        <span style={{ marginRight: 12, position: "relative" }}>
          {metric.title}
          <Underline />
        </span>
        <MetricVariantSelector variants={metric.variants} />
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
