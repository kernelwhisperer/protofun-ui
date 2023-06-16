"use client";

import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

import { BlockMeta, getBuiltGraphSDK } from "../../../.graphclient";
import { Chart } from "../Chart";

interface GasChartProps {
  data: BlockMeta[];
}

export function GasChart(props: GasChartProps) {
  const [data, setData] = useState(props.data);

  const sub = useCallback(async () => {
    console.log("📜 LOG > subscribing");
    const sdk = getBuiltGraphSDK();
    const result = await sdk.SubBlocks();
    for await (const update of result) {
      console.log("📜 LOG > sub result", update);
      setData(update.blockMetas.reverse());
    }
  }, [setData]);

  useEffect(() => {
    sub();
  }, [sub]);

  return (
    <Box>
      <Chart
        data={data.map((x) => {
          const datetime = new Date(x.timestamp);
          const unix =
            datetime.getTime() - datetime.getTimezoneOffset() * 60 * 1000;

          return {
            time: unix / 1000,
            value: parseInt(x.base_fee_per_gas) / 1e9,
          };
        })}
      />
    </Box>
  );
}
