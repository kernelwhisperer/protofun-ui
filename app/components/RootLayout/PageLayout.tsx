"use client";
import { Box, BoxProps } from "@mui/material";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { ReactNode } from "react";

export function PageLayout({
  sx,
  ...rest
}: BoxProps & HTMLMotionProps<"div"> & { children?: ReactNode }) {
  return (
    <Box
      sx={{
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        ...sx,
      }}
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
      {...rest}
    />
  );
}
