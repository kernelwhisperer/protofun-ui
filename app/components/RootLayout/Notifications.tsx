import { NotificationsNoneRounded } from "@mui/icons-material";
import { Badge, Dialog, Fade, IconButton } from "@mui/material";
import { useStore } from "@nanostores/react";
import React, { useState } from "react";
import { useBoolean } from "usehooks-ts";

import { $user } from "../../stores/user";
import { PopoverPaper, PopoverPaperProps } from "../PopoverPaper";
import { NotifContents } from "./Notifications/NotifContents";

const DIALOG_WIDTH = 380;
const DIALOG_HEIGHT = 500;

export default function Notifications() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { value: open, toggle: toggleOpen } = useBoolean(false);
  const user = useStore($user);

  if (!user) {
    return null;
  }

  return (
    <>
      <Fade in>
        <IconButton
          aria-label="Open Notifications"
          disableTouchRipple
          color="primary"
          ref={setAnchorEl}
          onClick={toggleOpen}
          id="notifications-button"
          aria-controls={open ? "notifications-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge badgeContent={4} color="accent" variant="standard">
            <NotificationsNoneRounded fontSize="medium" />
          </Badge>
        </IconButton>
      </Fade>
      <Dialog
        open={open}
        onClose={toggleOpen}
        aria-labelledby="notif-dialog-title"
        aria-describedby="notif-dialog-description"
        hideBackdrop
        sx={{
          zIndex: "var(--mui-zIndex-popover)",
        }}
        slotProps={{
          backdrop: {
            className: "blurred",
          },
        }}
        PaperProps={
          {
            popoverProps: {
              TransitionComponent: Fade,
              TransitionProps: {},
              anchorEl,
              anchorOrigin: {
                horizontal: "right",
                vertical: "bottom",
              },
              onClose: toggleOpen,
              open,
              sx: {
                zIndex: 2000,
              },
              transformOrigin: {
                horizontal: "right",
                vertical: "top",
              },
            },
            sx: {
              background: "var(--mui-palette-secondary-main)",
              border: "1px solid var(--mui-palette-primary-main)",
              height: DIALOG_HEIGHT,
              margin: 0,
              width: DIALOG_WIDTH,
            },
          } as PopoverPaperProps
        }
        PaperComponent={PopoverPaper as never}
      >
        <NotifContents toggleOpen={toggleOpen} />
      </Dialog>
    </>
  );
}
