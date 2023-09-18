import { Dialog } from "@mui/material"
import { useSnackbar } from "notistack"
import { Notification } from "protofun-service"
import React, { useEffect } from "react"

import { app, socket } from "../../../api/feathers-app"
import { isMobile, PopoverToggleProps } from "../../../utils/client-utils"
import { PopoverPaper, PopoverPaperProps } from "../../PopoverPaper"
import { NotifContents } from "../Notifications/NotifContents"

const DIALOG_WIDTH = 380
const DIALOG_HEIGHT = 600

export default function NotificationsDialog({
  anchorEl,
  open,
  toggleOpen,
}: { anchorEl: any } & PopoverToggleProps) {
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    function handleCreated(notification: Notification) {
      enqueueSnackbar(notification.text)
    }

    function setup() {
      app.service("notifications").on("created", handleCreated)
    }

    function teardown() {
      app.service("notifications").removeListener("created", handleCreated)
    }

    app.on("login", setup)
    app.on("logout", teardown)
    socket.on("disconnect", teardown)

    return teardown
  }, [enqueueSnackbar])

  return (
    <>
      <Dialog
        keepMounted
        open={open}
        onClose={toggleOpen}
        aria-labelledby="notif-dialog-title"
        aria-describedby="notif-dialog-description"
        sx={{
          zIndex: "var(--mui-zIndex-popover)",
        }}
        // hideBackdrop={!isMobile}
        hideBackdrop
        slotProps={{
          backdrop: {
            className: "blurred",
          },
        }}
        PaperProps={
          {
            popoverProps: {
              anchorEl,
              anchorOrigin: {
                horizontal: "right",
                vertical: "bottom",
              },
              keepMounted: true,
              onClose: toggleOpen,
              open,
              sx: {
                zIndex: "var(--mui-zIndex-popover)",
              },
            },
            sx: {
              background: "var(--mui-palette-secondary-main)",
              border: "1px solid var(--mui-palette-TableCell-border)",
              height: DIALOG_HEIGHT,
              margin: 0,
              marginTop: isMobile ? 2 : 1,
              width: `min(calc(100vw - 32px), ${DIALOG_WIDTH}px) !important`,
            },
          } as PopoverPaperProps
        }
        PaperComponent={PopoverPaper as never}
      >
        <NotifContents toggleOpen={toggleOpen} />
      </Dialog>
    </>
  )
}
