import { SvgIconComponent } from "@mui/icons-material";
import { Button, ButtonProps, SvgIcon, Typography } from "@mui/material";
import Link from "next/link";
import React, { FunctionComponent, SVGProps } from "react";

import { RobotoSerifFF } from "./Theme/fonts";

interface LinkButtonProps extends ButtonProps {
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
      disableRipple
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
    </Button>
  );
}
