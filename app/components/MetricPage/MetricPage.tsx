"use client";
import { Paper, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

import {
  $legendTimestamp,
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
import { isServerSide } from "../../utils/client-utils";
import { BackButton } from "../BackButton";
import { PageTitle } from "../PageTitle";
import { Progress } from "../Progress";
import { StaggeredList } from "../StaggeredList";
import { Underline } from "../Underline";
import { ChartActionBar } from "./ChartActionBar";
import { MetricVariantSelector } from "./MetricVariantSelector";

export interface MetricPageProps {
  blocks: SimpleBlock[];
  candles: Candle[];
  metricId: MetricId;
  protocolId: ProtocolId;
  searchParams: { timeframe?: string; unit?: string };
}

const MetricChart = dynamic(() => import("./MetricChart"), {
  loading: () => <Progress loading />,
});

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

  if (isServerSide) {
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

    $legendTimestamp.set("");
  }

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
