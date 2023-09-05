import { AccountCircleRounded } from "@mui/icons-material";
import {
  Avatar,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useStore } from "@nanostores/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useBoolean } from "usehooks-ts";

import { checkLogin, logout } from "../../api/auth";
import { $user } from "../../stores/user";
import { noop } from "../../utils/client-utils";

export default function Profile() {
  const user = useStore($user);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { value: open, toggle: toggleOpen } = useBoolean(false);

  const handleLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  const handleLogout = useCallback(() => {
    logout().then();
    toggleOpen();
  }, [toggleOpen]);

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <Fade in>
        <IconButton
          // onMouseOver={toggleOpen}
          aria-label="Open Notifications"
          disableTouchRipple
          color="primary"
          ref={setAnchorEl}
          onClick={user ? toggleOpen : handleLogin}
          id="notifications-button"
          aria-controls={open ? "notifications-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {user ? (
            <Avatar sx={{ fontSize: "0.8rem", height: 24, width: 24 }}>
              {user.email[0].toUpperCase()}
            </Avatar>
          ) : (
            <AccountCircleRounded />
          )}
        </IconButton>
      </Fade>
      <Menu
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={toggleOpen}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          // onMouseLeave: toggleOpen,
        }}
      >
        <Typography variant="subtitle2" marginX={2} marginBottom={1}>
          Email: {user?.email}
        </Typography>
        <MenuItem onClick={noop} disabled>
          Profile
        </MenuItem>
        <MenuItem onClick={noop} disabled>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          {/* <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon> */}
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
