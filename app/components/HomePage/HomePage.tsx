"use client";

import { Stack } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { variants } from "../../utils/client-utils";
import { LinkButton } from "../LinkButton";
import BitcoinIcon from "./assets/bitcoin.svg";
import EthereumIcon from "./assets/ethereum.svg";

export function HomePage() {
  return (
    <Stack
      sx={{ marginTop: 5 }}
      alignItems={"flex-start"}
      direction={"row"}
      flexWrap="wrap"
      gap={2}
      component={motion.div}
      initial={"closed"}
      animate={"open"}
      variants={{
        closed: {
          // transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
        open: {
          transition: { staggerChildren: 0.15 },
        },
      }}
      transition={{ duration: 5 }}
    >
      <motion.div variants={variants}>
        <LinkButton
          href={`/btc`}
          label="Bitcoin"
          icon={BitcoinIcon}
          disabled
          iconPadding="5px"
        />
      </motion.div>
      <motion.div variants={variants}>
        <LinkButton href={`/eth`} label="Ethereum" icon={EthereumIcon} />
      </motion.div>
    </Stack>
  );
}
