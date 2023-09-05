import {
  HighlightOffRounded,
  LocalGasStationOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  avatarClasses,
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

export function AlertsPanel() {
  return (
    <>
      <List
        sx={{
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
      </List>
    </>
  );
}
