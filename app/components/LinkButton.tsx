import { SvgIconComponent } from "@mui/icons-material"
import { Button, ButtonProps, Chip, SvgIcon, Typography } from "@mui/material"
import Link, { LinkProps } from "next/link"
import React, { ForwardedRef, forwardRef, FunctionComponent, SVGProps } from "react"

import { RobotoMonoFF, RobotoSerifFF } from "./Theme/fonts"

interface LinkButtonProps extends LinkProps, Pick<ButtonProps, "disabled"> {
  fancyAnimation?: boolean
  icon: FunctionComponent<SVGProps<SVGElement>> | SvgIconComponent
  iconPadding?: string | number
  label: string
}

const LinkButton = forwardRef((props: LinkButtonProps, ref: ForwardedRef<typeof Button>) => {
  const { icon: Icon, label, iconPadding, fancyAnimation, ...rest } = props

  return (
    <Button
      ref={ref}
      component={Link}
      variant="outlined"
      size="large"
      sx={{
        ...(fancyAnimation
          ? {
              "&:hover svg path": {
                animation: "svgStrokeAnim 2s infinite",
                // fillOpacity: "0.5 !important",
                // strokeDasharray: "200%",
                // strokeDashoffset: "0%",
              },
            }
          : {}),
        // background: "#c00", /* fallback */
        // background: `
        // -webkit-linear-gradient(45deg,  transparent 10px, gray 10px),
        // -webkit-linear-gradient(135deg, transparent 10px, gray 10px),
        // -webkit-linear-gradient(225deg, transparent 10px, gray 10px),
        // -webkit-linear-gradient(315deg, transparent 10px, gray 10px)`,
        // backgroundPosition: "bottom left, bottom right, top right, top left",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "50% 50%",
        // border: "0px !important",
        justifyContent: "flex-start",
        overflow: "hidden",
        // width: 240,
        paddingRight: 12,
        paddingY: 2,
      }}
      {...(rest as any)}
    >
      <SvgIcon
        inheritViewBox
        component={Icon}
        width="100%"
        height="100%"
        sx={{
          fontSize: "50px",
          height: "100%",
          padding: iconPadding,
          position: "absolute",
          right: "-33%",
          width: "100%",
        }}
      />
      <Typography variant="h6" fontFamily={RobotoSerifFF} component="div">
        {label}
      </Typography>
      {(rest.disabled || label === "Compound" || label === "Total value locked") && (
        <Chip
          label="WIP"
          size="small"
          disabled={rest.disabled}
          sx={{ fontFamily: RobotoMonoFF, letterSpacing: 1, marginLeft: 1 }}
        />
      )}
    </Button>
  )
})
LinkButton.displayName = "LinkButton"

export { LinkButton }
