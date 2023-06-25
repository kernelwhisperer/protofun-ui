import { CandlestickChart, ShowChart } from "@mui/icons-material";
import { alpha, Button, ButtonGroup, Stack } from "@mui/material";
import { useStore } from "@nanostores/react";
import React from "react";

import {
  $liveMode,
  $scaleMode,
  $seriesType,
  $timeframe,
  TIME_FRAMES,
  Timeframe,
} from "../../stores/home-page";

export function ChartActionBar() {
  const timeframe = useStore($timeframe);
  const seriesType = useStore($seriesType);
  const scaleMode = useStore($scaleMode);
  const liveMode = useStore($liveMode);

  return (
    <Stack
      direction="row"
      gap={1}
      justifyContent="space-between"
      flexWrap="wrap"
    >
      <ButtonGroup
        variant="outlined"
        size="small"
        sx={(theme) => ({
          "& .selected": {
            background: alpha(theme.palette.primary.main, 1),
            color: theme.palette.getContrastText(theme.palette.primary.main),
          },
        })}
      >
        {Object.keys(TIME_FRAMES).map((x) => (
          <Button
            key={x}
            disabled={x === "Day" || x === "Week"}
            className={timeframe === x ? "active" : undefined}
            onClick={() => {
              if (x === "Block" && seriesType !== "Line") {
                $seriesType.set("Line");
              }
              $timeframe.set(x as Timeframe);
            }}
          >
            {TIME_FRAMES[x as Timeframe]}
          </Button>
        ))}
      </ButtonGroup>
      <Stack direction="row" gap={1}>
        <ButtonGroup size="small">
          <Button
            className={seriesType === "Line" ? "active" : undefined}
            onClick={() => {
              $seriesType.set("Line");
            }}
          >
            <ShowChart />
          </Button>
          <Button
            disabled={timeframe === "Block"}
            className={seriesType === "Candlestick" ? "active" : undefined}
            onClick={() => {
              $seriesType.set("Candlestick");
            }}
          >
            <CandlestickChart />
          </Button>
        </ButtonGroup>
        <Button
          size="small"
          className={scaleMode === 1 ? "active" : undefined}
          variant="outlined"
          onClick={() => {
            const nextMode = scaleMode === 1 ? 0 : 1;
            $scaleMode.set(nextMode);
          }}
        >
          Log scale
        </Button>
        <Button
          size="small"
          className={liveMode ? "active" : undefined}
          variant="outlined"
          onClick={() => {
            $liveMode.set(!liveMode);
          }}
        >
          Live data
        </Button>
      </Stack>
    </Stack>
  );
}
