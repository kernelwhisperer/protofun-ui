"use client";

import { Backdrop, Box } from "@mui/material";
import { m, useCycle } from "framer-motion";
import React, { useEffect, useState } from "react";

import { AppVerProps } from "../../stores/app";
import { MenuContents } from "./Menu/MenuContents";
import { MenuToggle } from "./Menu/MenuToggle";

const sidebar = {
  closed: {
    clipPath: "circle(24px at 392px 36px)",
    transition: {
      damping: 40,
      delay: 0.25,
      stiffness: 400,
      type: "spring",
    },
  },
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 24}px at 392px 36px)`,
    transition: {
      // restDelta: 2,
      stiffness: 20,
      type: "spring",
    },
  }),
};

export function HamburgerMenu({ appVer, gitHash }: AppVerProps) {
  const [open, toggleOpen] = useCycle(false, true);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    setScreenHeight(window.innerHeight);

    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <m.nav
      initial={false}
      animate={open ? "open" : "closed"}
      custom={screenHeight}
    >
      <MenuToggle toggle={toggleOpen} />
      <Backdrop
        open={open}
        className="blurred"
        sx={{
          zIndex: "var(--mui-zIndex-menu)",
        }}
        onClick={toggleOpen as any}
      />
      <Box
        component={m.div}
        sx={{
          backgroundColor: "var(--mui-palette-background-default)",
          bottom: "0",
          height: screenHeight,
          maxWidth: 425,
          position: "absolute",
          right: "0",
          top: "0",
          width: "100%",
          zIndex: "var(--mui-zIndex-menu)",
        }}
        variants={sidebar}
      >
        <MenuContents appVer={appVer} gitHash={gitHash} />
      </Box>
    </m.nav>
  );
}
