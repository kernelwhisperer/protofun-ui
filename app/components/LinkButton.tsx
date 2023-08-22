import { SvgIconComponent } from "@mui/icons-material";
import { Button, ButtonProps, Chip, SvgIcon, Typography } from "@mui/material";
import Link, { LinkProps } from "next/link";
import React, { FunctionComponent, SVGProps } from "react";

import { RobotoMonoFF, RobotoSerifFF } from "./Theme/fonts";

interface LinkButtonProps extends LinkProps, Pick<ButtonProps, "disabled"> {
  icon: FunctionComponent<SVGProps<SVGElement>> | SvgIconComponent;
  iconPadding?: string | number;
  label: string;
}

export function LinkButton({
  icon: Icon,
  label,
  iconPadding,
  ...rest
}: LinkButtonProps) {
  return (
    <Button
      component={Link}
      variant="outlined"
      size="large"
      sx={{
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
          // transform: "rotate(14deg) scale(1.5)",
          width: "100%",
        }}
      />
      <Typography variant="h6" fontFamily={RobotoSerifFF} component="div">
        {label}
      </Typography>
      {rest.disabled && (
        <Chip
          label="WIP"
          size="small"
          disabled
          sx={{ fontFamily: RobotoMonoFF, letterSpacing: 1, marginLeft: 1 }}
        />
      )}
    </Button>
  );
}
