import { Stack, Typography, TypographyProps } from "@mui/material";
import Decimal from "decimal.js";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { useBlockMap } from "../../hooks/useBlockMapContext";
import { useLegend } from "../../hooks/useLegendContext";
import { formatNumber } from "../../utils/client-utils";
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

export function ChartLegend() {
  const { timestamp } = useLegend();
  const { getItem } = useBlockMap();

  const block = getItem(timestamp);
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
            zIndex: 99999,
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <Stack direction="row">
            <LegendLabel>Block number </LegendLabel>
            <LegendValue>{block.number}</LegendValue>
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
            <LegendLabel>Max gas price </LegendLabel>
            <LegendValue>
              {formatNumber(new Decimal(block.maxGasPrice).div(1e9).toNumber())}{" "}
              Gwei
            </LegendValue>
          </Stack>
          <Stack direction="row">
            <LegendLabel>Min gas price </LegendLabel>
            <LegendValue>
              {formatNumber(new Decimal(block.minGasPrice).div(1e9).toNumber())}{" "}
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
