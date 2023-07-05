import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="var(--mui-palette-primary-main)"
    strokeLinecap="round"
    {...props}
  />
);

export const MenuToggle = ({ toggle }: { toggle: () => void }) => {
  return (
    <IconButton
      onClick={toggle}
      disableTouchRipple
      style={{
        zIndex: "var(--mui-zIndex-menuButton)", // open ? "var(--mui-zIndex-menuButton)" : undefined,
      }}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 26 26"
        style={{ paddingLeft: 4, paddingTop: 4 }}
      >
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: {
              d: "M 3 16.5 L 17 2.5",
              zIndex: "var(--mui-zIndex-menuButton)",
            },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </motion.svg>
    </IconButton>
  );
};
