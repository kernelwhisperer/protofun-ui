import { Box, BoxProps, useMediaQuery } from "@mui/material";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

const Blob = ({
  sx,
  ...rest
}: HTMLMotionProps<"div"> & Pick<BoxProps, "sx">) => (
  <motion.div
    style={{
      filter: "blur(40px)",
      // filter: "blur(40px) url(#noiseFilter) blur(5px)",
      opacity: 0.5,
      padding: "40px",
      position: "absolute",
      right: 0,
      top: 0,
      zIndex: -1,
    }}
    transition={{
      duration: 10,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    }}
    {...rest}
  >
    <Box sx={sx} />
  </motion.div>
);

export function Blobs() {
  const smallDevice = !useMediaQuery("(min-width:600px)");

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
        initial={{
          x: -150,
          y: 200,
        }}
        animate={
          smallDevice
            ? {
                x: -150,
                y: 200,
              }
            : {
                x: [-150, -200, -250, -150],
                y: [200, 300, 100, 200],
              }
        }
      />
      <Blob
        sx={{
          backgroundColor: "#6FB18A",
          borderRadius: "100px",
          height: 200,
          top: 80,
          width: 250,
        }}
        initial={{
          scale: 1.2,
          x: -20,
          y: 80,
        }}
        animate={
          smallDevice
            ? {
                scale: 1.2,
                x: -20,
                y: 80,
              }
            : {
                scale: [1.2, 1, 1, 1.2],
                x: [-20, -20, -140, -20],
                y: [80, 300, 200, 80],
              }
        }
      />
      <Blob
        sx={{
          backgroundColor: "#EB6666",
          borderRadius: "100px",
          height: 150,
          width: 200,
        }}
        initial={{
          x: 0,
          y: 300,
        }}
        animate={
          smallDevice
            ? {
                x: 0,
                y: 300,
              }
            : {
                scale: [1, 1.4, 1, 1],
                x: [0, -150, -100, 0],
                y: [300, 150, 250, 300],
              }
        }
      />
    </Box>
  );
}
