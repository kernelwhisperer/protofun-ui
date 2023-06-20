import { Button, ButtonGroup, Paper, Stack } from "@mui/material";
import React from "react";

import { ChartLegend } from "./ChartLegend";
import { GasChart, GasChartProps } from "./GasChart";

export function ChartGroup(props: GasChartProps) {
  const { initialData } = props;

  return (
    <Stack gap={1}>
      <ButtonGroup variant="outlined" size="small">
        <Button>Block</Button>
        <Button>1m</Button>
        <Button>1h</Button>
        <Button>D</Button>
        <Button>W</Button>
        <Button>M</Button>
      </ButtonGroup>
      <Paper
        elevation={0}
        sx={{
          paddingLeft: 0.5,
          paddingTop: 0.5,
          position: "relative",
        }}
      >
        <ChartLegend />
        {/* <Skeleton variant="rectangular" width={"100%"} height={500} /> */}
        <GasChart initialData={initialData} />
      </Paper>
    </Stack>
  );
}
