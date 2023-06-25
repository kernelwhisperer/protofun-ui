import { Stack, Typography, TypographyProps } from "@mui/material";
import { useStore } from "@nanostores/react";
import Decimal from "decimal.js";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { $blockMap } from "../../stores/block-data";
import { $legendTimestamp } from "../../stores/home-page";
import { formatBigInt, formatNumber } from "../../utils/client-utils";
import { RobotoMonoFF } from "../Theme/fonts";

const LegendLabel = ({ sx, ...rest }: TypographyProps) => (
  <Typography
    variant="caption"
    sx={{
      backgroundColor: "var(--mui-palette-background-glass)",
      paddingX: 1,
      ...sx,
    }}
    {...rest}
  />
);

const LegendValue = (props: TypographyProps) => (
  <LegendLabel fontFamily={RobotoMonoFF} sx={{ paddingLeft: 0 }} {...props} />
);

export function BlockChartLegend() {
  // console.log("📜 LOG > ChartLegend render");

  const timestamp = useStore($legendTimestamp);
  const block = $blockMap.get()[timestamp];

  // const blockDate = new Date(parseInt(timestamp || "0") * 1000);

  return (
    <AnimatePresence>
      {!!block && (
        <Stack
          sx={{
            alignItems: "flex-start",
            left: 0,
            paddingLeft: 1,
            paddingTop: 1,
            position: "absolute",
            top: 0,
            zIndex: 999,
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Stack direction="row" sx={{ paddingBottom: 0.5 }}>
            <LegendLabel variant="body2">Block number </LegendLabel>
            <LegendValue variant="body2">
              {formatBigInt(block.number)}
            </LegendValue>
          </Stack>
          {/* <LegendText>
        {new Intl.DateTimeFormat(window.navigator.language, {
          dateStyle: "long",
          hourCycle: "h23",
          timeStyle: "medium",
        }).format(blockDate)}
      </LegendText> */}
          <Stack direction="row">
            <LegendLabel>Base fee per gas </LegendLabel>
            <LegendValue>
              {formatNumber(
                new Decimal(block.baseFeePerGas).div(1e9).toNumber()
              )}{" "}
              Gwei
            </LegendValue>
          </Stack>
          <Stack direction="row">
            <LegendLabel>Gas used </LegendLabel>
            {/* {formatNumber(new Decimal(block.minGasPrice).div(1e9).toNumber())} Gwei */}
            <LegendValue>{formatNumber(block.gasUsed)}</LegendValue>
          </Stack>
          <Stack direction="row">
            <LegendLabel>Miner tips </LegendLabel>
            <LegendValue>
              {formatNumber(
                new Decimal(block.minerTips).div(1e18).toNumber(),
                3
              )}{" "}
              ETH
            </LegendValue>
          </Stack>
          <Stack direction="row">
            <LegendLabel>Burned fees </LegendLabel>
            <LegendValue>
              {formatNumber(
                new Decimal(block.burnedFees).div(1e18).toNumber(),
                3
              )}{" "}
              ETH
            </LegendValue>
          </Stack>
          {/* <Typography>{blockDate.getTime() - new Date().getTime()}</Typography> TODO: show delay */}
        </Stack>
      )}
    </AnimatePresence>
  );
}
