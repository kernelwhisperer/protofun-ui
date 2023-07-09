"use client";

import { Backdrop, Box } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import React, { useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";

import { AppVerProps } from "../../stores/app";
import { SPRING_CONFIGS } from "../../utils/client-utils";
import { MenuContents } from "./Menu/MenuContents";
import { MenuToggle } from "./Menu/MenuToggle";

const MenuBackground = animated(Box);

export function HamburgerMenu({ appVer, gitHash }: AppVerProps) {
  const { value: open, toggle: toggleOpen } = useBoolean(false);
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

  const { x } = useSpring({
    config: open ? SPRING_CONFIGS.molasses : SPRING_CONFIGS.quick,
    delay: open ? 0 : 200,
    from: { x: 0 },
    to: !open ? { x: 0 } : { x: screenHeight },
  });

  return (
    <nav>
      <MenuToggle open={open} toggle={toggleOpen} />
      <Backdrop
        open={open}
        className="blurred"
        sx={{
          zIndex: "var(--mui-zIndex-menu)",
        }}
        onClick={toggleOpen}
      />
      <MenuBackground
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
        style={{
          clipPath: x.to(
            (value) => `circle(${value * 2 + 20}px at 390px 36px)`
          ),
        }}
      >
        <MenuContents open={open} appVer={appVer} gitHash={gitHash} />
      </MenuBackground>
    </nav>
  );
}
