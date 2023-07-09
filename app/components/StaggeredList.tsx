"use client";
import { Stack, StackProps } from "@mui/material";
import { animated, useTrail } from "@react-spring/web";
import React, { Children } from "react";

import { isServerSide, SPRING_CONFIGS } from "../utils/client-utils";

export type StaggeredListProps = StackProps & {
  show?: boolean;
};

const SHOW_STATE = { opacity: 1, y: 0 };
const HIDE_STATE = { opacity: 0, y: 60 };

export function StaggeredList({
  children,
  show = true,
  ...rest
}: StaggeredListProps) {
  const items = Children.toArray(children);
  const trails = useTrail(items.length, {
    config: SPRING_CONFIGS.quick,
    from: isServerSide ? SHOW_STATE : HIDE_STATE,
    reverse: !show,
    to: show ? SHOW_STATE : HIDE_STATE,
  });

  return (
    <Stack {...rest}>
      {trails.map((props, index) => (
        <animated.div key={index} style={props}>
          {items[index]}
        </animated.div>
      ))}
    </Stack>
  );
}
