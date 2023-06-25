"use client";

import { Stack } from "@mui/material";
import { motion, Variants } from "framer-motion";
import React from "react";

import { LinkButton } from "../LinkButton";
import BitcoinIcon from "./assets/bitcoin.svg";
import EthereumIcon from "./assets/ethereum.svg";

const variants: Variants = {
  closed: {
    opacity: 0,
    transition: {
      // duration: 0.25,
      // ease: "easeInOut",
      damping: 40,
      stiffness: 240,
      type: "spring",
    },
    y: 50,
  },
  open: {
    opacity: 1,
    transition: {
      // duration: 0.25,
      // ease: "easeInOut",
      damping: 40,
      stiffness: 240,
      type: "spring",
    },
    y: 0,
  },
};

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
