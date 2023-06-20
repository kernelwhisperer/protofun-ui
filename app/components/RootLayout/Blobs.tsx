import { Box } from "@mui/material";
import { HTMLMotionProps, motion, Target } from "framer-motion";
import React from "react";

const Blob = ({ sx, initial, ...rest }: HTMLMotionProps<"div">) => (
  <motion.div
    initial={{
      filter: "blur(40px) url(#noiseFilter) blur(5px)",
      // opacity: 0.33,
      opacity: 0.2,
      padding: "40px",
      position: "absolute",
      zIndex: -1,
      ...(initial as Target),
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
  return (
    <Box
      sx={{
        margin: "auto",
        opacity: 0.5,
        position: "absolute",
        right: -100,
        top: -200,
        width: "300px",
      }}
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
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
          right: 150,
          top: 200,
        }}
        animate={{
          opacity: [1, 1],
          right: [150, 200, 250, 150],
          top: [200, 300, 100, 200],
        }}
      />
      <Blob
        sx={{
          backgroundColor: "#6FB18A",
          borderRadius: "100px",
          height: 200,
          top: 80,
        }}
        initial={{
          right: 20,
          scale: 1.2,
          width: 250,
        }}
        animate={{
          right: [20, 20, 140, 20],
          scale: [1.2, 1, 1, 1.2],
          top: [80, 300, 200, 80],
        }}
      />
      <Blob
        sx={{
          backgroundColor: "#EB6666",
          borderRadius: "100px",
          height: 250,
          width: 200,
        }}
        initial={{
          right: 0,
          top: 300,
        }}
        animate={{
          right: [0, 150, 100, 0],
          scale: [1, 1.4, 1, 1],
          top: [300, 150, 250, 300],
        }}
      />
    </Box>
  );
}
