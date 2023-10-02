import { SvgIconComponent } from "@mui/icons-material"
import { Button, ButtonProps, Chip, Stack, SvgIcon, Typography } from "@mui/material"
import Link, { LinkProps } from "next/link"
import { METRICS_MAP, Protocol } from "protofun"
import React, { ForwardedRef, forwardRef, FunctionComponent, SVGProps } from "react"

import { PROTOCOL_ICON_MAP } from "../stores/protocol-icons"
import { RobotoMonoFF, RobotoSerifFF } from "./Theme/fonts"

interface LinkButtonProps extends LinkProps, Pick<ButtonProps, "disabled"> {
  fancyAnimation?: boolean
  icon: FunctionComponent<SVGProps<SVGElement>> | SvgIconComponent
  iconPadding?: string | number
  label: string
  protocol: Protocol
}

const LinkButtonProtocol = forwardRef(
  (props: LinkButtonProps, ref: ForwardedRef<typeof Button>) => {
    const { icon: Icon, label, iconPadding, fancyAnimation, protocol, ...rest } = props

    const metricsNumber = Object.keys(METRICS_MAP[protocol.id]).length

    return (
      <Button
        ref={ref}
        component={Link}
        variant="outlined"
        size="large"
        sx={{
          ...(fancyAnimation
            ? {
                "&:hover .link-button-protocol-icon path": {
                  "--svg-dash-array": PROTOCOL_ICON_MAP[protocol.id].dashArray || "230%",
                  animation: "svgStrokeAnim 2s infinite",
                },
              }
            : {}),
          justifyContent: "flex-start",
          paddingY: 2,
        }}
        {...(rest as any)}
      >
        <Stack>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Stack
              sx={{ height: "100%", marginRight: 2 }}
              // justifyContent="flex-start"
              alignItems="flex-start"
              gap={1}
            >
              <Typography variant="h6" fontFamily={RobotoSerifFF} component="div">
                {label}
              </Typography>
              <Stack direction="row" gap={1}>
                {(rest.disabled || protocol.wip) && (
                  <Chip
                    label="WIP"
                    size="small"
                    disabled={rest.disabled}
                    sx={{ fontFamily: RobotoMonoFF, letterSpacing: 1 }}
                  />
                )}
                <Chip
                  label={
                    metricsNumber === 1 ? `${metricsNumber} metric` : `${metricsNumber} metrics`
                  }
                  size="small"
                  disabled={rest.disabled}
                  sx={{ fontFamily: RobotoMonoFF, letterSpacing: 1 }}
                />
              </Stack>
            </Stack>
            <SvgIcon
              className="link-button-protocol-icon"
              inheritViewBox
              component={Icon}
              sx={{
                height: "100px",
                // marginRight: -2,
                marginTop: -2,
                padding: iconPadding,
                width: "100px",
              }}
            />
          </Stack>
          {/* {!rest.disabled && (
            <Stack direction="row" gap={1}>
              <BarChart
                width={120}
                height={40}
                data={[
                  { amt: 2400, name: "Page A", pv: 2400, uv: 400 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 300 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 200 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 300 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 400 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 200 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 200 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 200 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 200 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 300 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 400 },
                ]}
                margin={{
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                }}
              >
                <Bar isAnimationActive={false} type="monotone" dataKey="uv" fill="#8884d8" />
              </BarChart>
              <BarChart
                width={120}
                height={40}
                data={[
                  { amt: 2400, name: "Page A", pv: 2400, uv: 400 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 300 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 200 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 300 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 400 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 200 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 200 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 200 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 200 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 300 },
                  { amt: 2400, name: "Page A", pv: 2400, uv: 400 },
                ]}
                margin={{
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: 0,
                }}
              >
                <Bar isAnimationActive={false} type="monotone" dataKey="uv" fill="#8884d8" />
              </BarChart>
            </Stack>
          )} */}
        </Stack>
      </Button>
    )
  }
)
LinkButtonProtocol.displayName = "LinkButton"

export { LinkButtonProtocol }
