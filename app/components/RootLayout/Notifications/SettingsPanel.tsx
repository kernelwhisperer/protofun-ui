import { ClearOutlined, Devices, NotificationsNoneRounded } from "@mui/icons-material"
import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material"
import { useStore } from "@nanostores/react"
import { useSnackbar } from "notistack"
import React, { useCallback } from "react"

import { createNotification } from "../../../api/notifications-api"
import { patchPushSubscription } from "../../../api/users-api"
import { $user } from "../../../stores/app"
import {
  disableWebPushOnDevice,
  enableWebPush,
  getDeviceId,
  logError,
  PopoverToggleProps,
} from "../../../utils/client-utils"
import { RobotoMonoFF } from "../../Theme/fonts"

export function SettingsPanel({ toggleOpen: _toggleOpen }: Pick<PopoverToggleProps, "toggleOpen">) {
  const { enqueueSnackbar } = useSnackbar()
  const user = useStore($user)
  const deviceId = getDeviceId()

  const handleTestNotification = useCallback(() => {
    if (!user) {
      return
    }

    createNotification({
      text: "This is a test notification sent from protocol.fun",
      title: "Test notification",
      userId: user.id,
    })
  }, [user])

  const handleEnablePush = useCallback(() => {
    if (!user) {
      return
    }

    enableWebPush()
      .then(() => {
        enqueueSnackbar("Push notifications enabled.", { variant: "success" })
      })
      .catch((error: Error) => {
        logError(error)
        enqueueSnackbar(`Error: ${error.message}`, {
          variant: "error",
        })
      })
  }, [enqueueSnackbar, user])

  const handleRemove = useCallback(
    (deviceLabel: string) => {
      patchPushSubscription(deviceLabel, null)
        .then(() => {
          enqueueSnackbar("Push notifications disabled.")
          if (deviceId === deviceLabel) {
            return disableWebPushOnDevice()
          }
        })
        .catch((error: Error) => {
          logError(error)
          enqueueSnackbar(`Error: ${error.message}`, {
            variant: "error",
          })
        })
    },
    [deviceId, enqueueSnackbar]
  )

  return (
    <>
      {!user && (
        <Box marginY={3} marginX={2}>
          <Typography variant="caption">Log in to change your notification settings.</Typography>
        </Box>
      )}
      {user && (
        <Stack gap={1} padding={2} alignItems="flex-start">
          {!!user?.pushDevices?.length && (
            <>
              <Typography variant="body2" letterSpacing="0.05rem">
                Devices
              </Typography>
              <List sx={{ width: "100%" }}>
                {user?.pushDevices?.map((device) => (
                  <ListItem
                    key={device.label}
                    secondaryAction={
                      <IconButton
                        color="inherit"
                        tabIndex={2}
                        onClick={() => handleRemove(device.label)}
                      >
                        <ClearOutlined fontSize="small" />
                      </IconButton>
                    }
                    sx={{
                      backgroundColor: "var(--mui-palette-action-hover)",
                      borderRadius: 2,
                      marginBottom: 1,
                      minWidth: 280,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <Devices />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primaryTypographyProps={{
                        fontFamily: RobotoMonoFF,
                        variant: "caption",
                      }}
                      primary={device.label}
                      secondary={
                        deviceId === device.label ? (
                          <Chip
                            label="Current device"
                            size="small"
                            disabled
                            component="span"
                            sx={{
                              fontFamily: RobotoMonoFF,
                              fontSize: "0.75rem",
                              letterSpacing: 1,
                              marginLeft: 0,
                            }}
                          />
                        ) : null
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </>
          )}
          {!user?.pushDevices?.find((x) => x.label === deviceId) && (
            <Button
              size="small"
              sx={{ transform: "none !important" }}
              variant="outlined"
              onClick={handleEnablePush}
            >
              <span>Enable push on the current device</span>
            </Button>
          )}
          <Button
            size="small"
            sx={{ transform: "none !important" }}
            variant="outlined"
            onClick={handleTestNotification}
            endIcon={<NotificationsNoneRounded fontSize="small" />}
          >
            <span>Send a test notification</span>
          </Button>
        </Stack>
      )}
    </>
  )
}
