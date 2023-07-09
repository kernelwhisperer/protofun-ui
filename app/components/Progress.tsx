import { Stack } from "@mui/material";
import { useStore } from "@nanostores/react";
import { animated, easings, useSpring } from "@react-spring/web";
import React, { useEffect } from "react";

import { $loopsAllowed } from "../stores/app";

interface ProgressProps {
  loading: boolean;
}

const Line = () => {
  const loopsAllowed = useStore($loopsAllowed);

  const [{ x }, api] = useSpring(
    () => ({
      config: {
        duration: 2_000,
        // https://easings.net/
        easing: easings.easeInOutQuad,
      },
      from: { x: 0 },
      loop: loopsAllowed,
      to: { x: 1 },
    }),
    [loopsAllowed]
  );

  // TODO: Hack: investigate the loop: true and skipAnimation: true bug
  useEffect(() => {
    if (!loopsAllowed) {
      api.stop();
    }
  }, [loopsAllowed, api]);

  return (
    <animated.line
      strokeWidth={4}
      stroke="var(--mui-palette-primary-main)"
      fill="none"
      x1="0"
      x2="60"
      y1="2"
      y2="2"
      pathLength={1}
      strokeDashoffset={x.to([0, 0.33, 0.66, 1], [0, -6, -6, -6])}
      strokeDasharray={x
        .to([0, 0.33, 0.66, 1], [0, 1, 1, 1])
        .to((x) => `${x}px 1px`)}
      opacity={loopsAllowed ? x.to([0, 0.33, 0.66, 1], [1, 1, 1, 0]) : 1}
    />
  );
};

export function Progress(props: ProgressProps) {
  const { loading } = props;

  return (
    <Stack
      className="progress"
      sx={{
        left: 0,
        position: "absolute",
        right: 0,
      }}
      alignItems="center"
      justifyContent="center"
      height={"100%"}
    >
      <animated.svg
        width="60"
        height="4"
        viewBox="0 0 60 4"
        fill="var(--mui-palette-primary-main)"
        xmlns="http://www.w3.org/2000/svg"
      >
        {loading && <Line />}
      </animated.svg>
    </Stack>
  );
}
