"use client";
import { Stack, StackProps } from "@mui/material";
import { HTMLMotionProps, m } from "framer-motion";
import React, { Children, ReactNode } from "react";

import { revealVariants } from "../utils/client-utils";

export type StaggeredListProps = StackProps &
  HTMLMotionProps<"div"> & { children?: ReactNode } & {
    staggerChildren?: number;
  };

export function StaggeredList({
  children,
  staggerChildren = 0.15,
  ...rest
}: StaggeredListProps) {
  return (
    <Stack
      component={m.div}
      initial="hide"
      animate="show"
      variants={{
        hide: {
          transition: {
            staggerChildren: staggerChildren / 10,
            staggerDirection: -1,
          },
        },
        show: {
          transition: { staggerChildren },
        },
      }}
      {...rest}
    >
      {Children.map(children, (child) => (
        <m.div variants={revealVariants}>{child}</m.div>
      ))}
    </Stack>
  );
}
