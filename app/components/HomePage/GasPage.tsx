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
          alignItems={"flex-start"}
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
          <motion.div
            variants={variants}
            style={{
              position: "relative",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={500}
              fontFamily={RobotoSerifFF}
              sx={{}}
            >
              Historical gas prices
            </Typography>
            <motion.div
              style={{
                background: "var(--mui-palette-secondary-main)",
                bottom: 0,
                content: '""',
                height: 16,
                left: 0,
                opacity: 1,
                position: "absolute",
                transform: "skew(-12deg) translateX(12px)",
                zIndex: -1,
              }}
              animate={{
                marginLeft: [0, 0, 360],
                width: [0, 360, 0],
              }}
              transition={{
                delay: 0.25,
                duration: 1,
                ease: "easeInOut",
              }}
            ></motion.div>
          </motion.div>
          <Paper
            component={motion.div}
            variants={variants}
            elevation={0}
            sx={{
              marginTop: 3,
              paddingLeft: 0.5,
              paddingTop: 0.5,
              position: "relative",
              width: "100%",
            }}
          >
            <ChartLegend />
            <GasChart initialData={initialData} />
          </Paper>
        </Stack>
      </LegendProvider>
    </BlockMapProvider>
  );
}
