import { Box } from "@mui/material"
import { animated, easings, useSpring } from "@react-spring/web"
import React from "react"

const AnimatedBox = animated(Box)

export function Underline() {
  const styles = useSpring({
    config: {
      duration: 750,
      // https://easings.net/
      easing: easings.easeInOutQuad,
    },
    delay: 200,
    from: { x: 0 },
    to: { x: 1 },
  })

  return (
    <AnimatedBox
      sx={{
        background: "var(--mui-palette-accent-main)",
        bottom: -2,
        content: '""',
        height: 8,
        left: 0,
        opacity: 1,
        position: "absolute",
        width: "100%",
        zIndex: -1,
      }}
      style={{
        scaleX: styles.x.to([0, 0.5, 1], [0, 1, 0]),
        x: styles.x.to([0, 0.5, 1], ["-50%", "0%", "50%"]),
      }}
    ></AnimatedBox>
  )
}
