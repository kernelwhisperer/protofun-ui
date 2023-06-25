"use client";
import { KeyboardBackspace } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { $blockMap, $blocks, BlockMap } from "../../stores/block-data";
import {
  $minCandleMap,
  $minCandles,
  CandleMap,
} from "../../stores/candle-data";
import { SimpleBlock } from "../../utils/block-utils";
import { Candle } from "../../utils/candle-utils";
import { variants } from "../../utils/client-utils";
import { RobotoSerifFF } from "../Theme/fonts";
import { ChartGroup } from "./ChartGroup";

const UNDERLINE_WIDTH = 280;
const UNDERLINE_OFFSET = 12;

export interface MetricPageProps {
  blocks: SimpleBlock[];
  candles: Candle[];
}

export function MetricPage(props: MetricPageProps) {
  const { blocks, candles } = props;
  // console.log("📜 LOG > GasPage render");

  const blockMap = blocks.reduce((acc, curr) => {
    acc[curr.timestamp] = curr;
    return acc;
  }, {} as BlockMap);

  $blocks.set(blocks);
  $blockMap.set(blockMap);

  const candleMap = candles.reduce((acc, curr) => {
    acc[curr.timestamp] = curr;
    return acc;
  }, {} as CandleMap);

  $minCandles.set(candles);
  $minCandleMap.set(candleMap);

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
          Ethereum
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
          Base fee per gas
        </Typography>
        <motion.div
          style={{
            background: "var(--mui-palette-secondary-main)",
            bottom: 2,
            content: '""',
            height: 12,
            left: 0,
            opacity: 1,
            position: "absolute",
            width: UNDERLINE_WIDTH,
            zIndex: -1,
          }}
          animate={{
            scaleX: [0, 1, 0],
            x: [
              -UNDERLINE_WIDTH / 2 + UNDERLINE_OFFSET,
              UNDERLINE_OFFSET,
              UNDERLINE_WIDTH / 2 + UNDERLINE_OFFSET,
            ],
          }}
          transition={{
            delay: 0.2,
            duration: 1,
            ease: "easeInOut",
          }}
        ></motion.div>
      </motion.div>
      <motion.div style={{ width: "100%" }} variants={variants}>
        <ChartGroup />
      </motion.div>
    </Stack>
  );
}
