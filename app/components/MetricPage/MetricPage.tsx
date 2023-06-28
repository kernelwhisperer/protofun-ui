"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import {
  $timeframe,
  isTimeframe,
  MetricId,
  METRICS_MAP,
} from "../../stores/metric-page";
import { PROTOCOL_LABELS, ProtocolId } from "../../stores/protocol-page";
import { SimpleBlock } from "../../utils/block-utils";
import { Candle } from "../../utils/candle-utils";
import { variants } from "../../utils/client-utils";
import { RobotoSerifFF } from "../Theme/fonts";
import { Underline } from "../Underline";
import { ChartGroup } from "./ChartGroup";

export interface MetricPageProps {
  blocks: SimpleBlock[];
  candles: Candle[];
  metric: MetricId;
  protocol: ProtocolId;
  searchParams: { timeframe?: string };
}

export function MetricPage(props: MetricPageProps) {
  const {
    // blocks,
    // candles,
    metric,
    protocol,
    searchParams,
  } = props;
  console.log("📜 LOG > MetricPage render");

  const { timeframe = "" } = searchParams;
  if (isTimeframe(timeframe)) {
    $timeframe.set(timeframe);
  }

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
    <Stack
      alignItems={"flex-start"}
      gap={0}
      component={motion.div}
      initial={"closed"}
      animate={"open"}
      variants={{
        closed: {
          // transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
        open: {
          transition: { staggerChildren: 0.15 },
        },
      }}
      transition={{ duration: 5 }}
    >
      <motion.div variants={variants}>
        <Button
          href="/eth"
          component={Link}
          size="small"
          sx={{ borderRadius: 16, paddingLeft: 1, paddingRight: 2 }}
          startIcon={<KeyboardBackspace />}
        >
          {PROTOCOL_LABELS[protocol]}
        </Button>
      </motion.div>
      <motion.div
        variants={variants}
        style={{
          marginBottom: 32,
          marginTop: 16,
          position: "relative",
        }}
      >
        <Typography variant="h4" fontWeight={500} fontFamily={RobotoSerifFF}>
          {METRICS_MAP[protocol][metric].title}
        </Typography>
        <Underline />
      </motion.div>
      <motion.div style={{ width: "100%" }} variants={variants}>
        <ChartGroup />
      </motion.div>
    </Stack>
  );
}
