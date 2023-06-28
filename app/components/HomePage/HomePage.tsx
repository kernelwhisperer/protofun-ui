"use client";

import { Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import { PROTOCOLS } from "../../stores/protocol-page";
import { variants } from "../../utils/client-utils";
import { LinkButton } from "../LinkButton";
import { PageLayout } from "../RootLayout/PageLayout";
import { RobotoSerifFF } from "../Theme/fonts";
import { Underline } from "../Underline";

export function HomePage() {
  return (
    <PageLayout
      sx={{
        marginTop: "31px",
      }}
    >
      <motion.div
        variants={variants}
        style={{
          marginBottom: 32,
          marginTop: 16,
          position: "relative",
        }}
      >
        <Typography variant="h4" fontWeight={500} fontFamily={RobotoSerifFF}>
          Protocols
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
        {PROTOCOLS.map((protocol) => (
          <motion.div key={protocol.id} variants={variants}>
            <LinkButton
              href={`/${protocol.id}`}
              label={protocol.title}
              icon={protocol.icon}
              disabled={!protocol.enabled}
              iconPadding={protocol.iconPadding}
            />
          </motion.div>
        ))}
      </Stack>
    </PageLayout>
  );
}
