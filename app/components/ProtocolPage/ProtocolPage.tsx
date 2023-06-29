"use client";

import { KeyboardBackspace, SvgIconComponent } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

import { METRIC_ICONS_MAP } from "../../stores/metric-icons";
import { METRICS_MAP } from "../../stores/metric-page";
import { PROTOCOL_MAP, ProtocolId } from "../../stores/protocol-page";
import { variants } from "../../utils/client-utils";
import { LinkButton } from "../LinkButton";
import { PageLayout } from "../RootLayout/PageLayout";
import { RobotoSerifFF } from "../Theme/fonts";
import { Underline } from "../Underline";

interface ProtocolProps {
  protocolId: ProtocolId;
}

export function ProtocolPage(props: ProtocolProps) {
  const { protocolId } = props;
  const protocol = PROTOCOL_MAP[protocolId];

  return (
    <PageLayout>
      <motion.div variants={variants}>
        <Button
          href="/"
          component={Link}
          size="small"
          sx={{ borderRadius: 16, height: 31, paddingLeft: 1, paddingRight: 2 }}
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
          {protocol.title} metrics
        </Typography>
        <Underline />
      </motion.div>
      <Stack
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
        {Object.values(METRICS_MAP[protocolId] || {}).map((metric) => (
          <motion.div variants={variants} key={metric.id}>
            <LinkButton
              iconPadding={metric.iconPadding}
              href={`/${protocolId}/${metric.id}`}
              label={metric.title}
              icon={
                METRIC_ICONS_MAP[protocolId]?.[metric.id] as SvgIconComponent
              }
            />
          </motion.div>
        ))}
      </Stack>
    </PageLayout>
  );
}
