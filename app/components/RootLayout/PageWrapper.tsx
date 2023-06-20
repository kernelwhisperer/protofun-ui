"use client";
import { Box } from "@mui/material";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

export function PageWrapper(props: Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <Box
      component={motion.div}
      sx={{ paddingX: 2, paddingY: 1, width: "100%" }}
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
