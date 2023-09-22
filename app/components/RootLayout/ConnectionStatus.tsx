import { Slide, Stack, Typography } from "@mui/material"
import { useStore } from "@nanostores/react"
import React, { useEffect, useState } from "react"

import { $connectionLost } from "../../api/feathers-app"

export function ConnectionStatus() {
  const connectionLost = useStore($connectionLost)
  const [showing, setShowing] = useState(connectionLost)

  useEffect(() => {
    if (connectionLost && !showing) {
      setShowing(true)
    }

    if (!connectionLost && showing) {
      setTimeout(() => {
        setShowing(false)
      }, 3_000)
    }
  }, [connectionLost, showing])

  return (
    <Slide in={showing} direction="up">
      <Stack
        sx={{
          background: connectionLost
            ? "var(--mui-palette-error-main)"
            : "var(--mui-palette-success-main)",
          bottom: 0,
          maxWidth: 1200,
          position: "fixed",
          width: "100%",
          // marginX: 2
        }}
        alignItems="center"
      >
        <Typography paddingY={0.25} variant="caption" color="#fff">
          {connectionLost ? "Connection lost" : "Reconnected"}
        </Typography>
      </Stack>
    </Slide>
  )
}
