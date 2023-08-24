"use client";
import { Paper, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import React from "react";

import {
  $legendTimestamp,
  $liveMode,
  $priceUnitIndex,
  $scaleMode,
  $seriesType,
  $timeframe,
  isTimeframe,
  liveModeDefault,
  Metric,
  MetricId,
  METRICS_MAP,
  scaleModeDefault,
  seriesTypeDefault,
} from "../../stores/metrics";
import { PROTOCOL_MAP, ProtocolId } from "../../stores/protocols";
import { SimpleBlock } from "../../utils/block-utils";
import { Candle } from "../../utils/candle-utils";
import { BackButton } from "../BackButton";
import { PageTitle } from "../PageTitle";
import { Progress } from "../Progress";
import { StaggeredList } from "../StaggeredList";
import { Underline } from "../Underline";
import { ChartActionBar } from "./ChartActionBar";
import { MetricVariantSelector } from "./MetricVariantSelector";

export interface MetricPageProps {
  data: SimpleBlock[] | Candle[];
  metricId: MetricId;
  protocolId: ProtocolId;
  searchParams: { timeframe?: string; unit?: string };
}

const MetricChart = dynamic(() => import("./MetricChart"), {
  loading: () => <Progress loading />,
});

function configureStores(metric: Metric, timeframe: string, unit: string) {
  /**
   * Reset
   */
  $legendTimestamp.set("");
  $liveMode.set(metric.disallowLiveMode ? false : liveModeDefault);
  $scaleMode.set(metric.preferredLogScale ? 1 : scaleModeDefault);
  $seriesType.set(seriesTypeDefault);

  /**
   * Timeframe
   */
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

  /**
   * Series type
   */
  if (metric.disallowCandleType && $seriesType.get() === "Candlestick") {
    $seriesType.set("Line");
  }

  /**
   * Price unit
   */
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
}

export function MetricPage(props: MetricPageProps) {
  // console.log("📜 LOG > MetricPage render");
  const { metricId, protocolId, searchParams, data } = props;
  const protocol = PROTOCOL_MAP[protocolId];
  const metric = METRICS_MAP[protocolId]?.[metricId] as Metric;

  const { timeframe = "", unit = "" } = searchParams;
  const searchParamsObj = useSearchParams();

  configureStores(metric, timeframe, unit);

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

  return (
    <StaggeredList>
      <BackButton
        href={`/${PROTOCOL_MAP[protocolId].id}?${searchParamsObj?.toString()}`}
      >
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
