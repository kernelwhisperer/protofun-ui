import { Stack, SvgIcon } from "@mui/material"
import { ProtocolId } from "protofun"
import React from "react"

import { PROTOCOL_ICON_MAP } from "../stores/protocol-icons"

interface ProgressProps {
  loading: boolean
  protocolId: ProtocolId
}

export function ProtocolProgress(props: ProgressProps) {
  const { loading, protocolId } = props

  const { dashArray, icon: Icon, iconPadding } = PROTOCOL_ICON_MAP[protocolId]

  if (!loading) return null

  return (
    <Stack
      className="progress"
      sx={{
        "& path": loading
          ? {
              "--svg-dash-array": dashArray || "230%",
              animation: "svgStrokeAnim 2s infinite",
            }
          : {},
        left: 0,
        position: "absolute",
        right: 0,
      }}
      alignItems="center"
      justifyContent="center"
      height={"100%"}
    >
      <SvgIcon
        inheritViewBox
        component={Icon}
        sx={{
          height: "100px",
          marginTop: -2,
          padding: iconPadding,
          width: "100px",
        }}
      />
    </Stack>
  )
}
