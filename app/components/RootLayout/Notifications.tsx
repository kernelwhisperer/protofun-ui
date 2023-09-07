import { NotificationsNoneRounded } from "@mui/icons-material";
import { Badge, IconButton } from "@mui/material";
import { useStore } from "@nanostores/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useBoolean } from "usehooks-ts";

import { $user } from "../../stores/user";

const NotificationsDialog = dynamic(
  () => import("./Notifications/NotificationsDialog")
);

export default function Notifications() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { value: open, toggle: toggleOpen } = useBoolean(false);
  const user = useStore($user);

  return (
    <>
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
        <Badge badgeContent={user ? 3 : 0} color="accent" variant="standard">
          <NotificationsNoneRounded fontSize="medium" />
        </Badge>
      </IconButton>
      <NotificationsDialog
        anchorEl={anchorEl}
        open={open}
        toggleOpen={toggleOpen}
      />
    </>
  );
}
