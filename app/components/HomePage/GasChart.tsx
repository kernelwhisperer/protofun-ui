"use client";

import { Box } from "@mui/material";
import React, { useCallback, useState } from "react";

import { Block, getBuiltGraphSDK } from "../../../.graphclient";
import { Chart } from "../Chart";

const timezoneOffset = new Date().getTimezoneOffset() * 60;

interface GasChartProps {
  data: Omit<Block, "txns">[];
}

export function GasChart(props: GasChartProps) {
  const [data, setData] = useState(props.data);
  console.log("📜 LOG > GasChart > data:", data);

  const sub = useCallback(async () => {
    console.log("📜 LOG > subscribing");
    const sdk = getBuiltGraphSDK();
    const result = await sdk.SubBlocks();
    for await (const update of result) {
      console.log("📜 LOG > sub result", update);
      setData(update.blocks.reverse());
    }
  }, [setData]);

  // useEffect(() => {
  //   sub();
  // }, [sub]);

  return (
    <Box>
      <Chart
        data={data.map((x) => {
          return {
            time: parseInt(x.timestamp) - timezoneOffset,
            value: parseInt(x.baseFeePerGas) / 1e9,
          };
        })}
      />
    </Box>
  );
}
