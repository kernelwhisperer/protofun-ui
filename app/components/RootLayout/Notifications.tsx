import { NotificationsNoneRounded } from "@mui/icons-material"
import { Badge, IconButton } from "@mui/material"
import { useStore } from "@nanostores/react"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import { useBoolean } from "usehooks-ts"

import { $unreadNotifications } from "../../api/notifications-api"
import { Tooltip } from "../Tooltip"

const NotificationsDialog = dynamic(() => import("./Notifications/NotificationsDialog"))

export default function Notifications() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { value: open, toggle: toggleOpen } = useBoolean(false)
  const unreadNotifications = useStore($unreadNotifications)

  return (
    <>
      <Tooltip title="Open Notifications">
        <IconButton
          aria-label="Open Notifications"
          disableTouchRipple
          color="primary"
          ref={setAnchorEl}
          onClick={toggleOpen}
          id="notifications-button"
          data-ph-capture-attribute-unread-notifications={unreadNotifications}
          aria-controls={open ? "notifications-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {/* Hack for posthog autocapture */}
          <span style={{ display: "none" }}>Open Notifications</span>
          <Badge
            badgeContent={unreadNotifications}
            color="accent"
            variant="standard"
            sx={{ pointerEvents: "none" }}
          >
            <NotificationsNoneRounded fontSize="medium" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsDialog anchorEl={anchorEl} open={open} toggleOpen={toggleOpen} />
    </>
  )
}
