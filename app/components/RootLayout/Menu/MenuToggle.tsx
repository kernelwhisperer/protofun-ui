import { IconButton } from "@mui/material";
import { animated, AnimatedProps, useSpring } from "@react-spring/web";
import React, { CSSProperties } from "react";

const Path = (props: AnimatedProps<{ d: string; style?: CSSProperties }>) => (
  <animated.path
    fill="transparent"
    strokeWidth="3"
    stroke="var(--mui-palette-primary-main)"
    strokeLinecap="round"
    {...props}
  />
);

const BURGER_SHAPE = {
  d1: "M 2 2.5 L 20 2.5",
  d3: "M 2 16.346 L 20 16.346",
  opacity: 1,
};
const X_SHAPE = {
  d1: "M 3 16.5 L 17 2.5",
  d3: "M 3 2.5 L 17 16.346",
  opacity: 0,
};

export const MenuToggle = ({
  toggle,
  open,
}: {
  open: boolean;
  toggle: () => void;
}) => {
  const { d1, opacity, d3 } = useSpring({
    from: BURGER_SHAPE,
    to: open ? X_SHAPE : BURGER_SHAPE,
  });

  return (
    <IconButton
      onClick={toggle}
      disableTouchRipple
      style={{
        zIndex: "var(--mui-zIndex-menuButton)", // open ? "var(--mui-zIndex-menuButton)" : undefined,
      }}
      aria-label="Open Menu"
    >
      <animated.svg
        width="24"
        height="24"
        viewBox="0 0 26 26"
        style={{ paddingLeft: 4, paddingTop: 4 }}
      >
        <Path d={d1} />
        <Path d="M 2 9.423 L 20 9.423" style={{ opacity }} />
        <Path d={d3} />
      </animated.svg>
    </IconButton>
  );
};
