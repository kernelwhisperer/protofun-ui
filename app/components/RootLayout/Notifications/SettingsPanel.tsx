import { NotificationsNoneRounded } from "@mui/icons-material"
import { Box, Button, FormControlLabel, FormGroup, Stack, Switch, Typography } from "@mui/material"
import { useStore } from "@nanostores/react"
import { useSnackbar } from "notistack"
import React, { useCallback } from "react"

import { createNotification } from "../../../api/notifications-api"
import { $user } from "../../../stores/user"
import {
  $pushSubscription,
  enableWebPush,
  logError,
  PopoverToggleProps,
} from "../../../utils/client-utils"

export function SettingsPanel({ toggleOpen }: Pick<PopoverToggleProps, "toggleOpen">) {
  const { enqueueSnackbar } = useSnackbar()
  const user = useStore($user)
  const pushSubscription = useStore($pushSubscription)

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

  const handlePushNotif = useCallback(() => {
    if (!user) {
      return
    }

    if (!pushSubscription) {
      enableWebPush().catch((error: Error) => {
        logError(error)
        enqueueSnackbar(`Error: ${error.message}`, {
          variant: "error",
        })
      })
    }
  }, [enqueueSnackbar, pushSubscription, user])

  return (
    <>
      {!user && (
        <Box marginY={3} marginX={2}>
          <Typography variant="caption">Log in to change your notification settings.</Typography>
        </Box>
      )}
      {user && (
        <Stack gap={2} padding={1} alignItems="flex-start">
          <FormGroup sx={{ width: "100%" }}>
            <FormControlLabel
              sx={{
                justifyContent: "space-between",
                margin: 0,
                paddingX: 1,
                width: "100%",
              }}
              onClick={handlePushNotif}
              labelPlacement="start"
              control={<Switch checked={!!pushSubscription} />}
              label="Push notifications"
              slotProps={{
                typography: {
                  variant: "body2",
                },
              }}
            />
          </FormGroup>
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
