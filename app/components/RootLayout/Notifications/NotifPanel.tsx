import { NotificationsNoneRounded } from "@mui/icons-material"
import {
  avatarClasses,
  Box,
  Button,
  List,
  ListItem,
  listItemAvatarClasses,
  ListItemButton,
  ListItemText,
  listItemTextClasses,
  Typography,
} from "@mui/material"
import { useStore } from "@nanostores/react"
import { formatDistance } from "date-fns"
import Decimal from "decimal.js"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useSnackbar } from "notistack"
import { Notification as NotificationShape } from "protofun-service"
import React, { useCallback, useEffect } from "react"

import { $alerts, Alert } from "../../../api/alerts-api"
import { app, socket } from "../../../api/feathers-app"
import {
  $notifications,
  archiveNotification,
  createNotification,
} from "../../../api/notifications-api"
import { METRICS_MAP } from "../../../stores/metrics"
import { PROTOCOL_MAP } from "../../../stores/protocols"
import { $user } from "../../../stores/user"
import { formatNumber, logError, PopoverToggleProps } from "../../../utils/client-utils"
import { RobotoMonoFF } from "../../Theme/fonts"

function formatValue(alert: Alert) {
  const metric = METRICS_MAP[alert.protocolId][alert.metricId]
  if (!metric) {
    throw new Error("Metric should not be undefined")
  }

  const { precision, significantDigits, priceUnits } = metric
  const unitLabel = priceUnits[0]

  const value = formatNumber(
    new Decimal(alert.triggerValue).div(precision).toNumber(),
    significantDigits[0],
    "compact"
  )

  return { metric, unitLabel, value }
}

export function NotifPanel({ toggleOpen }: Pick<PopoverToggleProps, "toggleOpen">) {
  const { enqueueSnackbar } = useSnackbar()
  const notifications = useStore($notifications)
  const searchParams = useSearchParams()
  const user = useStore($user)

  const handleClick = useCallback(
    (notification: NotificationShape) => {
      toggleOpen()
      archiveNotification(notification).catch((error: Error) => {
        logError(error)
        enqueueSnackbar(`Error: ${error.message}`, {
          variant: "error",
        })
      })
    },
    [enqueueSnackbar, toggleOpen]
  )
  const handleTestNotification = useCallback(() => {
    if (!user) {
      return
    }

    const alerts = $alerts.get()
    if (!alerts || alerts.length === 0) {
      enqueueSnackbar("Set up an alert before testing notifications.", { variant: "error" })
    }

    createNotification({
      alertId: alerts[0].id,
      text: "This is a test notification sent from protocol.fun.",
      userId: user.id,
    })

    Notification.requestPermission().then((result) => {
      if (result === "denied") {
        enqueueSnackbar("Push notifications not permitted.", { variant: "error" })
      } else {
        const _pushNotification = new Notification("Test notification", {
          body: "This is a test notification sent from protocol.fun.",
          // icon: notifImg,
        })
      }
    })
  }, [enqueueSnackbar, user])

  useEffect(() => {
    function handleCreated(notification: NotificationShape) {
      enqueueSnackbar(notification.text)
      const _pushNotification = new Notification(notification.text, {
        body: notification.text,
        // icon: notifImg,
      })
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
      {notifications.length === 0 && (
        <Box marginY={3} marginX={2}>
          <Typography variant="caption">
            Nothing to see here.
            <br />
            None of your alerts went off.
          </Typography>
        </Box>
      )}
      <List
        disablePadding
        sx={(theme) => ({
          [`& .${listItemTextClasses.primary}`]: {
            // fontSize: theme.typography.body2.fontSize,
          },
          [`& .${listItemTextClasses.secondary}`]: {
            color: "var(--mui-palette-text-disabled)",
            fontSize: theme.typography.caption.fontSize,
          },
          [`& .${listItemAvatarClasses.root} .${avatarClasses.root}`]: {
            bgcolor: "var(--mui-palette-primary-main)",
          },
        })}
      >
        {notifications.map((notification) => {
          const { alert } = notification
          const { value, unitLabel, metric } = formatValue(alert)
          const protocol = PROTOCOL_MAP[metric.protocol]

          const notifDatetime = new Date(notification.createdAt * 1000)
          const notifDateLabel = formatDistance(notifDatetime, new Date(), {
            addSuffix: true,
          })

          return (
            <ListItem
              dense
              key={notification.id}
              disablePadding
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                minWidth: 280,
              }}
            >
              <ListItemButton
                disabled={notification.archived}
                dense
                component={Link}
                href={`/${metric.protocol}/${metric.id}?${searchParams?.toString()}`}
                onClick={() => handleClick(notification)}
              >
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "0.825rem",
                    // lineHeight: "1.4",
                    variant: "body2",
                  }}
                  primary={
                    <>
                      {protocol.title}&apos;s {metric.title}{" "}
                      {alert.increase ? "increased" : "decreased"} to{" "}
                      <Typography
                        fontWeight={500}
                        fontFamily={RobotoMonoFF}
                        variant="body2"
                        component="span"
                        fontSize="0.825rem"
                      >
                        {value} {unitLabel}
                      </Typography>{" "}
                    </>
                  }
                  secondary={notifDateLabel}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      {user && (
        <Button
          sx={{
            "&:not(:hover)": {
              opacity: 0.5,
            },
            background: "var(--mui-palette-secondary-main)",
            bottom: 0,
            position: "absolute",
            width: "100%",
          }}
          size="small"
          fullWidth
          endIcon={<NotificationsNoneRounded fontSize="small" />}
          onClick={handleTestNotification}
        >
          Send a test notification
        </Button>
      )}
    </>
  )
}
