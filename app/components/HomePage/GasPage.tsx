"use client";
import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

import { BlockMap, BlockMapProvider } from "../../hooks/useBlockMapContext";
import { LegendProvider } from "../../hooks/useLegendContext";
import { SimpleBlock } from "../../utils/client-utils";
import { ChartLegend } from "./ChartLegend";
import { GasChart } from "./GasChart";

interface GasPageProps {
  initialData: SimpleBlock[];
}

export function GasPage(props: GasPageProps) {
  const { initialData } = props;
  const blockMap = initialData.reduce((acc, curr) => {
    acc[curr.timestamp] = curr;
    return acc;
  }, {} as BlockMap);

  return (
    <BlockMapProvider initialValue={blockMap}>
      <LegendProvider>
        <Stack gap={1}>
          <Typography variant="subtitle1">Ethereum</Typography>
          <Typography variant="h4">Historical gas prices</Typography>
          <Paper
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
