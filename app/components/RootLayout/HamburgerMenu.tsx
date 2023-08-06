"use client";

import { Box, Container, Modal } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import React, { forwardRef, useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";

import { AppVerProps } from "../../stores/app";
import { SPRING_CONFIGS } from "../../utils/client-utils";
import { MenuContents } from "./Menu/MenuContents";
import { MenuToggle } from "./Menu/MenuToggle";

const AnimatedBox = animated(Box);

interface MenuBackgroundProps {
  children: React.ReactElement;
  in?: boolean;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
}

const MenuBackground = forwardRef<HTMLDivElement, MenuBackgroundProps>(
  function MenuBackground(props, ref) {
    const { children, in: open, onEnter, onExited } = props;
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
      delay: open ? 0 : 100,
      from: { x: 0 },
      onRest: () => {
        if (!open && onExited) {
          onExited(null as any, true);
        }
      },
      onStart: () => {
        if (open && onEnter) {
          onEnter(null as any, true);
        }
      },
      to: !open ? { x: 0 } : { x: screenHeight },
    });

    return (
      <Container
        ref={ref}
        maxWidth="lg"
        sx={{ padding: { xs: 0 }, position: "relative" }}
      >
        <AnimatedBox
          sx={{
            backgroundColor: "var(--mui-palette-background-default)",
            bottom: "0",
            height: screenHeight,
            maxWidth: 425,
            overflow: "auto",
            position: "absolute",
            right: "0",
            top: "0",
            width: "100%",
          }}
          style={{
            clipPath: x.to(
              (value) => `circle(${value * 2 + 20}px at 390px 36px)`
            ),
          }}
        >
          {children}
        </AnimatedBox>
      </Container>
    );
  }
);

export function HamburgerMenu({ appVer, gitHash }: AppVerProps) {
  const { value: open, toggle: toggleOpen } = useBoolean(false);

  return (
    <nav>
      <MenuToggle open={open} toggle={toggleOpen} />
      <Modal
        closeAfterTransition
        keepMounted
        onClose={toggleOpen}
        open={open}
        slotProps={{
          backdrop: {
            className: "blurred",
            timeout: open ? undefined : 500,
          },
        }}
        sx={{
          zIndex: "var(--mui-zIndex-menu)",
        }}
      >
        <MenuBackground in={open}>
          <MenuContents open={open} appVer={appVer} gitHash={gitHash} />
        </MenuBackground>
      </Modal>
    </nav>
  );
}
