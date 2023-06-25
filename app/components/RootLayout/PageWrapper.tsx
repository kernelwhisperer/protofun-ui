"use client";
import { Box } from "@mui/material";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { ReactNode } from "react";

export function PageWrapper(
  props: HTMLMotionProps<"div"> & { children?: ReactNode }
) {
  return (
    <Box
      component={motion.div}
      sx={{ paddingBottom: 4, paddingTop: 1, paddingX: 2, width: "100%" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        // duration: 0.4,
        damping: 20,
        stiffness: 160,
        type: "spring",
      }}
      {...props}
    />
  );
}
