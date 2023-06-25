"use client";

import {
  KeyboardBackspace,
  LocalGasStationOutlined,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { variants } from "../../utils/client-utils";
import { LinkButton } from "../LinkButton";
import { RobotoSerifFF } from "../Theme/fonts";

const UNDERLINE_WIDTH = 185;
const UNDERLINE_OFFSET = 12;

interface ProtocolProps {
  protocol: string;
}

export function ProtocolPage(props: ProtocolProps) {
  const { protocol } = props;
  return (
    <Stack
      alignItems={"flex-start"}
      gap={0}
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
        <Button
          href="/"
          component={Link}
          size="small"
          sx={{ borderRadius: 16, paddingLeft: 1, paddingRight: 2 }}
          startIcon={<KeyboardBackspace />}
        >
          Home
        </Button>
      </motion.div>
      <motion.div
        variants={variants}
        style={{
          marginBottom: 32,
          marginTop: 16,
          position: "relative",
        }}
      >
        <Typography variant="h4" fontWeight={500} fontFamily={RobotoSerifFF}>
          Ethereum
        </Typography>
        <motion.div
          style={{
            background: "var(--mui-palette-secondary-main)",
            bottom: 2,
            content: '""',
            height: 12,
            left: 0,
            opacity: 1,
            position: "absolute",
            width: UNDERLINE_WIDTH,
            zIndex: -1,
          }}
          animate={{
            scaleX: [0, 1, 0],
            x: [
              -UNDERLINE_WIDTH / 2 + UNDERLINE_OFFSET,
              UNDERLINE_OFFSET,
              UNDERLINE_WIDTH / 2 + UNDERLINE_OFFSET,
            ],
          }}
          transition={{
            delay: 0.2,
            duration: 1,
            ease: "easeInOut",
          }}
        ></motion.div>
      </motion.div>
      <motion.div variants={variants}>
        <LinkButton
          iconPadding="5px"
          href={`/${protocol}/base_fee`}
          label="Base fee per gas"
          icon={LocalGasStationOutlined}
        />
      </motion.div>
    </Stack>
  );
}
