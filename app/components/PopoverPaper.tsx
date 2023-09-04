import { Fade, PaperProps, Popover, PopoverProps } from "@mui/material";
import React from "react";

export type PopoverPaperProps = PaperProps & { popoverProps: PopoverProps };

export function PopoverPaper({
  popoverProps,
  children,
  ...paperProps
}: PopoverPaperProps) {
  return (
    <Popover
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      TransitionComponent={Fade}
      slotProps={{ paper: paperProps }}
      {...popoverProps}
    >
      {children}
      {/* <Draggable
        handle="#alert-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      > */}
      {/* {children} */}
      {/* </Draggable> */}
    </Popover>
  );
}
