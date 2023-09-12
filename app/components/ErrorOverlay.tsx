import { Stack, Typography } from "@mui/material"
import { animated, useSpring } from "@react-spring/web"
import React from "react"

import { SPRING_CONFIGS } from "../utils/client-utils"

interface ProgressProps {
  errorMessage: string
}

export function ErrorOverlay(props: ProgressProps) {
  const { errorMessage } = props

  const style = useSpring({
    config: SPRING_CONFIGS.quick,
    from: { opacity: 0 },
    to: errorMessage ? { opacity: 1 } : { opacity: 0 },
  })
  // TODO this should be using useTransition

  return (
    <Stack
      style={{ zIndex: errorMessage ? 999 : undefined }}
      sx={{
        left: 0,
        position: "absolute",
        right: 0,
      }}
      alignItems="center"
      justifyContent="center"
      height={"100%"}
    >
      <animated.div style={style}>
        <Typography>{errorMessage}</Typography>
      </animated.div>
    </Stack>
  )
}
