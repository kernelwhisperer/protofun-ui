import { Box, BoxProps } from "@mui/material";
import { useStore } from "@nanostores/react";
import { animated, AnimatedProps, useSpring } from "@react-spring/web";
import React from "react";

import { $loopsAllowed } from "../../stores/app";

const AnimatedBox = animated(Box);

type BlobProps = AnimatedProps<{
  animate: { scale: number[]; x: number[]; y: number[] };
}> &
  Pick<BoxProps, "sx">;

const Blob = ({ sx, animate, ...rest }: BlobProps) => {
  const loopsAllowed = useStore($loopsAllowed);

  const { x } = useSpring({
    config: {
      duration: 10_000,
    },
    from: { x: 0 },
    loop: loopsAllowed,
    to: { x: 1 },
  });

  return (
    <AnimatedBox
      sx={{
        filter: "blur(40px)",
        // filter: "blur(40px) url(#noiseFilter) blur(5px)",
        opacity: 0.5,
        padding: "40px",
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: -1,
      }}
      style={{
        scale: x.to([0, 0.33, 0.66, 1], animate.scale),
        x: x.to([0, 0.33, 0.66, 1], animate.x),
        y: x.to([0, 0.33, 0.66, 1], animate.y),
      }}
      {...rest}
    >
      <Box sx={sx} />
    </AnimatedBox>
  );
};

export function Blobs() {
  return (
    <Box
      className="blobs"
      sx={{
        "html[data-mui-color-scheme='dark'] &": {
          opacity: 0.33,
        },
        margin: "auto",
        opacity: 1,
        pointerEvents: "none",
        position: "absolute",
        right: 50,
        top: -300,
        width: "300px",
      }}
    >
      <Blob
        sx={{
          backgroundColor: "#EDB74D",
          borderRadius: "100px",
          height: 200,
          opacity: 0.5,
          width: 200,
        }}
        animate={{
          scale: [1, 1, 1, 1],
          x: [-150, -200, -250, -150],
          y: [200, 300, 100, 200],
        }}
      />
      <Blob
        sx={{
          backgroundColor: "#6FB18A",
          borderRadius: "100px",
          height: 200,
          top: 80,
          width: 250,
        }}
        animate={{
          scale: [1.2, 1, 1, 1.2],
          x: [-20, -20, -140, -20],
          y: [80, 300, 200, 80],
        }}
      />
      <Blob
        sx={{
          backgroundColor: "#EB6666",
          borderRadius: "100px",
          height: 150,
          width: 200,
        }}
        animate={{
          scale: [1, 1.4, 1, 1],
          x: [0, -150, -100, 0],
          y: [300, 150, 250, 300],
        }}
      />
    </Box>
  );
}
