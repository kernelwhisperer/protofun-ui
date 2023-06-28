import { Paper, Stack } from "@mui/material";
import { useStore } from "@nanostores/react";
import { motion } from "framer-motion";
import React from "react";

import { $loading, $timeframe } from "../../stores/metric-page";
import { Progress } from "../Progress";
import { BlockChart } from "./BlockChart";
import { CandleChart } from "./CandleChart";
import { ChartActionBar } from "./ChartActionBar";

export function ChartGroup() {
  console.log("📜 LOG > ChartGroup > render");

  const timeframe = useStore($timeframe);
  console.log("📜 LOG > ChartGroup > timeframe:", timeframe);
  const loading = useStore($loading);

  return (
    <Stack gap={1}>
      <ChartActionBar />
      <Paper
        elevation={0}
        sx={{
          height: "calc(100vh - 372px)",
          maxHeight: "1000px",
          minHeight: "400px",
          paddingLeft: 0.5,
          paddingTop: 0.5,
          position: "relative",
        }}
      >
        <Progress loading={loading} />
        <motion.div
          style={{
            height: "100%",
            width: "100%",
          }}
          animate={loading ? "loading" : "ready"}
          variants={{
            loading: {
              opacity: 0.5,
            },
            ready: {
              opacity: 1,
            },
          }}
        >
          {timeframe === "Block" && <BlockChart />}
          {timeframe !== "Block" && <CandleChart />}
        </motion.div>
      </Paper>
    </Stack>
  );
}
