"use client";
import { Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { BlockMap, BlockMapProvider } from "../../hooks/useBlockMapContext";
import { LegendProvider } from "../../hooks/useLegendContext";
import { SimpleBlock } from "../../utils/client-utils";
import { RobotoSerifFF } from "../Theme/fonts";
import { ChartLegend } from "./ChartLegend";
import { GasChart } from "./GasChart";

interface GasPageProps {
  initialData: SimpleBlock[];
}

const variants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
    y: 50,
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
    y: 0,
  },
};

export function GasPage(props: GasPageProps) {
  const { initialData } = props;
  const blockMap = initialData.reduce((acc, curr) => {
    acc[curr.timestamp] = curr;
    return acc;
  }, {} as BlockMap);

  return (
    <BlockMapProvider initialValue={blockMap}>
      <LegendProvider>
        <Stack
          gap={1}
          component={motion.div}
          initial={"closed"}
          animate={true ? "open" : "closed"}
          variants={{
            closed: {
              transition: { staggerChildren: 0.05, staggerDirection: -1 },
            },
            open: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          transition={{ duration: 5 }}
        >
          <Typography
            component={motion.div}
            variants={variants}
            variant="subtitle1"
          >
            Ethereum
          </Typography>
          <Typography
            component={motion.div}
            variants={variants}
            variant="h4"
            fontFamily={RobotoSerifFF}
            sx={{ paddingBottom: 3 }}
          >
            Historical gas prices
          </Typography>
          <Paper
            component={motion.div}
            variants={variants}
            elevation={0}
            sx={{ paddingLeft: 0.5, paddingTop: 0.5, position: "relative" }}
          >
            <ChartLegend />
            <GasChart initialData={initialData} />
          </Paper>
        </Stack>
      </LegendProvider>
    </BlockMapProvider>
  );
}
