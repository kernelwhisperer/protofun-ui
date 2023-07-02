import { motion } from "framer-motion";
import React from "react";

export function Underline() {
  return (
    <motion.div
      style={{
        background: "var(--mui-palette-secondary-main)",
        bottom: -2,
        content: '""',
        height: 8,
        left: 0,
        opacity: 1,
        position: "absolute",
        width: "100%",
        zIndex: -1,
      }}
      animate={{
        scaleX: [0, 1, 0],
        x: ["-50%", "0%", "50%"],
      }}
      transition={{
        delay: 0.2,
        duration: 0.75,
        ease: "easeInOut",
      }}
    ></motion.div>
  );
}
