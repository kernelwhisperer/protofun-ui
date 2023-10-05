import { Stack, Typography } from "@mui/material"
import { animated, useSpring } from "@react-spring/web"
import React from "react"

import { SPRING_CONFIGS } from "../utils/client-utils"

export interface FetchError {
  attemptNumber: number
  finished?: boolean
  message: string
}

interface ProgressProps {
  error: string | FetchError
}

export function ErrorOverlay(props: ProgressProps) {
  const { error } = props

  const style = useSpring({
    config: SPRING_CONFIGS.quick,
    from: { opacity: 0 },
    to: error ? { opacity: 1 } : { opacity: 0 },
  })
  // TODO this should be using useTransition

  return (
    <Stack
      style={{ zIndex: error ? 999 : undefined }}
      sx={{
        left: 0,
        marginTop: 10,
        position: "absolute",
        right: 0,
      }}
      alignItems="center"
      justifyContent="center"
      height={"100%"}
    >
      <animated.div style={style}>
        {typeof error === "string" ? (
          <Typography>{error}</Typography>
        ) : (
          <>
            <Typography>{error.message}</Typography>
            {error.finished ? (
              <Typography variant="caption">Failed after {error.attemptNumber} retries.</Typography>
            ) : (
              <Typography variant="caption">Retrying #{error.attemptNumber}...</Typography>
            )}
          </>
        )}
      </animated.div>
    </Stack>
  )
}
