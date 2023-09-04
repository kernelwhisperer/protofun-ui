import {
  CloseRounded,
  HighlightOffRounded,
  LocalGasStationOutlined,
  NotificationsNoneRounded,
} from "@mui/icons-material";
import {
  Avatar,
  avatarClasses,
  Badge,
  Chip,
  Dialog,
  DialogTitle,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  listItemAvatarClasses,
  ListItemButton,
  ListItemText,
  listItemTextClasses,
} from "@mui/material";
import React from "react";
import { useBoolean } from "usehooks-ts";

import { PopoverPaper, PopoverPaperProps } from "../PopoverPaper";
import { RobotoMonoFF } from "../Theme/fonts";

const DIALOG_WIDTH = 360;
const DIALOG_HEIGHT = 500;

export default function Notifications() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { value: open, toggle: toggleOpen } = useBoolean(false);

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
        <Badge badgeContent={4} color="accent" variant="standard">
          <NotificationsNoneRounded fontSize="medium" />
        </Badge>
      </IconButton>
      <Dialog
        open={open}
        onClose={toggleOpen}
        aria-labelledby="notif-dialog-title"
        aria-describedby="notif-dialog-description"
        // hideBackdrop
        sx={{
          zIndex: 2000,
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
                vertical: "top",
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
              border: 0,
              height: DIALOG_HEIGHT,
              margin: 0,
              width: DIALOG_WIDTH,
            },
          } as PopoverPaperProps
        }
        PaperComponent={PopoverPaper as never}
      >
        <DialogTitle id="notif-dialog-title" fontFamily={RobotoMonoFF}>
          <span>
            Notifications{" "}
            <Chip
              label="WIP"
              size="small"
              disabled
              sx={{ fontFamily: RobotoMonoFF, letterSpacing: 1 }}
            />
          </span>

          <IconButton
            sx={{ marginRight: -1 }}
            onClick={toggleOpen}
            color="primary"
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>
        <List
          sx={{
            // width: "100%",
            [`& .${listItemTextClasses.secondary}`]: {
              color: "text.primary",
            },
            [`& .${listItemAvatarClasses.root} .${avatarClasses.root}`]: {
              bgcolor: "var(--mui-palette-primary-main)",
            },
          }}
        >
          <ListItem
            secondaryAction={
              <IconButton edge="end" color="inherit" tabIndex={2}>
                <HighlightOffRounded />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton dense>
              <ListItemAvatar>
                <Avatar>
                  <LocalGasStationOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span>
                    Base fee per gas <b>crossed</b> 29.22 Gwei
                  </span>
                }
                secondary="Jan 7, 16:50:32 "
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" color="inherit" tabIndex={2}>
                <HighlightOffRounded />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton dense>
              <ListItemAvatar>
                <Avatar>
                  <LocalGasStationOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span>
                    Base fee per gas <b>crossed</b> 29.22 Gwei
                  </span>
                }
                secondary="Jan 7, 16:50:32 "
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" color="inherit" tabIndex={2}>
                <HighlightOffRounded />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton dense>
              <ListItemAvatar>
                <Avatar>
                  <LocalGasStationOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span>
                    Base fee per gas <b>crossed</b> 29.22 Gwei
                  </span>
                }
                secondary="Jan 7, 16:50:32 "
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            secondaryAction={
              <IconButton edge="end" color="inherit" tabIndex={2}>
                <HighlightOffRounded />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton dense>
              <ListItemAvatar>
                <Avatar>
                  <LocalGasStationOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <span>
                    Base fee per gas <b>crossed</b> 29.22 Gwei
                  </span>
                }
                secondary="Jan 7, 16:50:32 "
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}
